const IN_STYLE_UPDATER = false;

function defineAnimation(starting, factory) {
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
  _nextAnimation,
  numberOfReps = 2,
  reverse = false,
  callback
) {
  "worklet";
  return defineAnimation(_nextAnimation, () => {
    "worklet";

    const nextAnimation =
      typeof _nextAnimation === "function" ? _nextAnimation() : _nextAnimation;

    function repeat(animation, now) {
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

    function start(animation, value, now, previousAnimation) {
      animation.startValue = value;
      animation.reps = 0;
      nextAnimation.start(nextAnimation, value, now, previousAnimation);
    }

    return {
      animation: repeat,
      start,
      reps: 0,
      current: nextAnimation.current,
    };
  });
}
