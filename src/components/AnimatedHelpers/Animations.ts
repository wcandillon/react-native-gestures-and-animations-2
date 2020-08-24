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

export function repeat(
  _nextAnimation: any,
  numberOfReps = 2,
  reverse = false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  callback = () => {}
) {
  "worklet";
  return defineAnimation(_nextAnimation, () => {
    "worklet";

    const nextAnimation =
      typeof _nextAnimation === "function" ? _nextAnimation() : _nextAnimation;

    function anim(animation: any, now: any) {
      const finished = nextAnimation.animation(nextAnimation, now);
      animation.current = nextAnimation.current;
      if (finished) {
        animation.reps += 1;
        callback();
        if (numberOfReps > 0 && animation.reps >= numberOfReps) {
          return true;
        }

        const startValue = reverse
          ? nextAnimation.current
          : animation.startValue;
        if (reverse) {
          nextAnimation.toValue = animation.startValue;
          animation.startValue = startValue;
        }
        nextAnimation.start(nextAnimation, startValue, now, nextAnimation);
        return false;
      }
      return false;
    }

    function start(
      animation: any,
      value: any,
      now: any,
      previousAnimation: any
    ) {
      animation.startValue = value;
      animation.reps = 0;
      nextAnimation.start(nextAnimation, value, now, previousAnimation);
    }

    return {
      animation: anim,
      start,
      reps: 0,
      current: nextAnimation.current,
    };
  });
}

interface Animation<State, PrevState = State> {
  animation: (animation: State, now: number) => boolean;
  current: number;
  start: (
    animation: State,
    value: number,
    now: number,
    lastAnimation: PrevState
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
    const dt = Math.min(now - lastTimestamp, 1000 / 16);

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
