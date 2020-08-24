import Animated from "react-native-reanimated";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare let _WORKLET: boolean;

const IN_STYLE_UPDATER = false;

function defineAnimation(starting: any, factory: any) {
  "worklet";
  if (IN_STYLE_UPDATER) {
    return starting;
  }
  if (_WORKLET) {
    return factory();
  }
  return factory;
}

interface Animation<State = Record<string, unknown>, PrevState = State> {
  animation: (animation: Animation<State>, now: number) => boolean;
  current: number;
  start: (
    animation: Animation<State>,
    value: number,
    now: number,
    lastAnimation: Animation<PrevState>
  ) => void;
}

interface DecayAnimation extends Animation<DecayAnimation> {
  lastTimestamp: number;
  velocity: number;
}

interface WithBouncingDecayParams {
  velocity: number;
  deceleration?: number;
  clamp: [number, number];
}

export const withBouncingDecay = ({
  velocity: initialVelocity,
  deceleration: userDeceleration,
  clamp,
}: WithBouncingDecayParams): number => {
  "worklet";

  const deceleration = userDeceleration ?? 0.998;
  const VELOCITY_EPS = 5;
  const decay = (animation: DecayAnimation, now: number) => {
    const { lastTimestamp, current, velocity } = animation;
    const dt = Math.min(now - lastTimestamp, 1000 / 60);

    const kv = Math.pow(deceleration, dt);
    const kx = (deceleration * (1 - kv)) / (1 - deceleration);

    const v0 = velocity / 1000;
    const v = v0 * kv * 1000;
    const x = current + v0 * kx;

    animation.lastTimestamp = now;
    animation.current = x;
    animation.velocity = v;

    if (
      (velocity < 0 && animation.current <= clamp[0]) ||
      (velocity > 0 && animation.current >= clamp[1])
    ) {
      animation.current = clamp[velocity < 0 ? 0 : 1];
      animation.velocity *= -0.5;
    }

    if (Math.abs(v) < VELOCITY_EPS) {
      return true;
    }
    return false;
  };

  const start = (animation: DecayAnimation, value: number, now: number) => {
    animation.current = value;
    animation.lastTimestamp = now;
    animation.velocity = initialVelocity;
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return {
    animation: decay,
    start,
  };
};

interface PausableAnimation extends Animation<PausableAnimation> {
  lastTimestamp: number;
  elapsed: number;
}

export const withPause = (
  _nextAnimation: Animation | (() => Animation) | number,
  paused: Animated.SharedValue<boolean>
) => {
  "worklet";
  return defineAnimation(_nextAnimation, () => {
    "worklet";

    if (typeof _nextAnimation === "number") {
      throw new Error("Expected Animation as parameter");
    }
    const nextAnimation =
      typeof _nextAnimation === "function" ? _nextAnimation() : _nextAnimation;

    const pausable = (animation: PausableAnimation, now: number) => {
      const { lastTimestamp, elapsed } = animation;
      if (paused.value) {
        animation.elapsed = now - lastTimestamp;
        return false;
      }
      const dt = now - elapsed;
      const finished = nextAnimation.animation(nextAnimation, dt);
      animation.current = nextAnimation.current;
      animation.lastTimestamp = dt;
      return finished;
    };
    const start = (
      animation: PausableAnimation,
      value: number,
      now: number,
      previousAnimation: Animation<Record<string, unknown>>
    ) => {
      animation.lastTimestamp = now;
      animation.elapsed = 0;
      nextAnimation.start(nextAnimation, value, now, previousAnimation);
    };
    return {
      animation: pausable,
      start,
    };
  });
};

interface PhysicAnimation extends Animation<PhysicAnimation> {
  velocity: number;
}

type BouncingAnimation = Animation<BouncingAnimation>;

export const withBouncing = (
  _nextAnimation: PhysicAnimation | (() => PhysicAnimation) | number,
  lowerBound: number,
  upperBound: number
) => {
  "worklet";
  return defineAnimation(_nextAnimation, () => {
    "worklet";

    if (typeof _nextAnimation === "number") {
      throw new Error("Expected Animation as parameter");
    }
    const nextAnimation =
      typeof _nextAnimation === "function" ? _nextAnimation() : _nextAnimation;

    const bouncing = (animation: BouncingAnimation, now: number) => {
      const finished = nextAnimation.animation(nextAnimation, now);
      const { velocity, current } = nextAnimation;
      animation.current = current;
      if (
        (velocity < 0 && animation.current <= lowerBound) ||
        (velocity > 0 && animation.current >= upperBound)
      ) {
        animation.current = velocity < 0 ? lowerBound : upperBound;
        nextAnimation.velocity *= -0.5;
      }
      return finished;
    };
    const start = (
      _animation: BouncingAnimation,
      value: number,
      now: number,
      previousAnimation: Animation<PhysicAnimation>
    ) => {
      nextAnimation.start(nextAnimation, value, now, previousAnimation);
    };
    return {
      animation: bouncing,
      start,
    };
  });
};
