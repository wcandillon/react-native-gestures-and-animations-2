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
