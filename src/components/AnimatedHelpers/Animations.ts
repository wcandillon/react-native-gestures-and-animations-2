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

interface Animation<State> {
  animation: (animation: Animation<State>, now: number) => boolean;
  current: number;
  start: (
    animation: State,
    value: number,
    now: number,
    lastAnimation: Animation<State>
  ) => void;
}

interface DecayAnimation extends Animation<DecayAnimation> {
  lastTimestamp: number;
  direction: number;
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
}: WithBouncingDecayParams) => {
  "worklet";
  const deceleration = userDeceleration ?? 0.998;
  const VELOCITY_EPS = 5;
  const decay = (animation: DecayAnimation, now: number) => {
    const { lastTimestamp, current, direction, velocity } = animation;
    const dt = Math.min(now - lastTimestamp, 64);
    animation.lastTimestamp = now;

    const kv = Math.pow(deceleration, dt);
    const kx = (deceleration * (1 - kv)) / (1 - deceleration);

    const v0 = velocity / 1000;
    const v = v0 * kv * 1000;
    const x = current + v0 * kx;

    animation.current = x;
    animation.velocity = v;

    const toValueIsReached = null;

    if (
      (direction < 0 && animation.current <= clamp[0]) ||
      (direction > 0 && animation.current >= clamp[1])
    ) {
      animation.current = clamp[direction < 0 ? 0 : 1];
      animation.velocity *= -0.5;
      animation.direction *= -1;
    }

    if (Math.abs(v) < VELOCITY_EPS || toValueIsReached !== null) {
      if (toValueIsReached !== null) {
        animation.current = toValueIsReached;
      }
      return true;
    }
    return false;
  };
  const start = (animation: DecayAnimation, value: number, now: number) => {
    animation.current = value;
    animation.lastTimestamp = now;
    animation.velocity = initialVelocity;
    animation.direction = Math.sign(initialVelocity);
  };
  return {
    animation: decay,
    start,
  };
};
