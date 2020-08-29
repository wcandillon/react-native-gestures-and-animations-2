import Animated from "react-native-reanimated";

declare let _WORKLET: boolean;

interface AnimationState {
  current: number;
}

interface PhysicsAnimationState extends AnimationState {
  velocity: number;
}

type Animation<
  State extends AnimationState = AnimationState,
  PrevState = State
> = {
  animation: (animation: State, now: number) => boolean;
  current: number;
  start: (
    animation: State,
    value: number,
    now: number,
    lastAnimation: PrevState
  ) => void;
} & State;

interface PausableAnimation extends AnimationState {
  lastTimestamp: number;
  elapsed: number;
}

const defineAnimation = <
  S extends AnimationState = AnimationState,
  Prev extends AnimationState = AnimationState
>(
  factory: () => Animation<S, Prev>
) => {
  "worklet";
  if (_WORKLET) {
    return (factory() as unknown) as number;
  }
  return (factory as unknown) as number;
};

export const withPause = (
  _nextAnimation: Animation | (() => Animation) | number,
  paused: Animated.SharedValue<boolean>
) => {
  "worklet";
  return defineAnimation<PausableAnimation>(() => {
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
      previousAnimation: AnimationState
    ) => {
      animation.lastTimestamp = now;
      animation.elapsed = 0;
      nextAnimation.start(nextAnimation, value, now, previousAnimation);
    };
    return {
      current: 0,
      lastTimestamp: 0,
      elapsed: 0,
      animation: pausable,
      start,
    };
  });
};

export const withBouncing = (
  _nextAnimation:
    | Animation<PhysicsAnimationState>
    | (() => Animation<PhysicsAnimationState>)
    | number,
  lowerBound: number,
  upperBound: number
): number => {
  "worklet";

  if (typeof _nextAnimation === "number") {
    throw new Error("Expected Animation as parameter");
  }

  const nextAnimation =
    typeof _nextAnimation === "function" ? _nextAnimation() : _nextAnimation;

  const bouncing = (animation: PhysicsAnimationState, now: number) => {
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
    _animation: PhysicsAnimationState,
    value: number,
    now: number,
    previousAnimation: Animation<PhysicsAnimationState>
  ) => {
    nextAnimation.start(nextAnimation, value, now, previousAnimation);
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return {
    animation: bouncing,
    start,
  };
};
