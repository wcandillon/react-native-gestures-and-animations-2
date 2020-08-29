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

type AnimationParameter<State extends AnimationState = AnimationState> =
  | Animation<State>
  | (() => Animation<State>)
  | number;

const animationParameter = <State extends AnimationState = AnimationState>(
  animationParam: AnimationParameter<State>
) => {
  "worklet";
  if (typeof animationParam === "number") {
    throw new Error("Expected Animation as parameter");
  }
  return typeof animationParam === "function"
    ? animationParam()
    : animationParam;
};

interface PausableAnimation extends AnimationState {
  lastTimestamp: number;
  elapsed: number;
}

const defineAnimation = <
  S extends AnimationState = AnimationState,
  Prev extends AnimationState = AnimationState
>(
  factory: () => Omit<Animation<S, Prev>, keyof S>
) => {
  "worklet";
  if (_WORKLET) {
    return (factory() as unknown) as number;
  }
  return (factory as unknown) as number;
};

export const withPause = (
  animationParam: AnimationParameter,
  paused: Animated.SharedValue<boolean>
) =>
  defineAnimation<PausableAnimation>(() => {
    "worklet";
    const nextAnimation = animationParameter(animationParam);
    const pausable = (state: PausableAnimation, now: number) => {
      const { lastTimestamp, elapsed } = state;
      if (paused.value) {
        state.elapsed = now - lastTimestamp;
        return false;
      }
      const dt = now - elapsed;
      const finished = nextAnimation.animation(nextAnimation, dt);
      state.current = nextAnimation.current;
      state.lastTimestamp = dt;
      return finished;
    };
    const start = (
      state: PausableAnimation,
      value: number,
      now: number,
      previousState: AnimationState
    ) => {
      state.lastTimestamp = now;
      state.elapsed = 0;
      nextAnimation.start(nextAnimation, value, now, previousState);
    };
    return {
      animation: pausable,
      start,
    };
  });

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
