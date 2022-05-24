/* eslint-disable reanimated/js-function-in-worklet, @typescript-eslint/consistent-type-imports */
import type { AnimatableValue, Animation } from "react-native-reanimated";
import Animated, { defineAnimation } from "react-native-reanimated";

interface PausableAnimation extends Animation<PausableAnimation> {
  lastTimestamp: number;
  elapsed: number;
}

export const withPause = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _nextAnimation: any,
  paused: Animated.SharedValue<boolean>
) => {
  "worklet";
  return defineAnimation<PausableAnimation>(_nextAnimation, () => {
    "worklet";
    const nextAnimation: PausableAnimation =
      typeof _nextAnimation === "function" ? _nextAnimation() : _nextAnimation;
    const onFrame = (state: PausableAnimation, now: number) => {
      const { lastTimestamp, elapsed } = state;
      if (paused.value) {
        state.elapsed = now - lastTimestamp;
        return false;
      }
      const dt = now - elapsed;
      const finished = nextAnimation.onFrame(nextAnimation, dt);
      state.current = nextAnimation.current;
      state.lastTimestamp = dt;
      return finished;
    };
    const onStart = (
      state: PausableAnimation,
      value: AnimatableValue,
      now: number,
      previousState: PausableAnimation
    ) => {
      state.lastTimestamp = now;
      state.elapsed = 0;
      state.current = 0;
      nextAnimation.onStart(nextAnimation, value, now, previousState);
    };
    const callback = (finished?: boolean): void => {
      if (nextAnimation.callback) {
        nextAnimation.callback(finished);
      }
    };
    return {
      onFrame,
      onStart,
      isHigherOrder: true,
      current: nextAnimation.current,
      callback,
      previousAnimation: null,
      startTime: 0,
      started: false,
      lastTimestamp: 0,
      elapsed: 0,
    };
  });
};
