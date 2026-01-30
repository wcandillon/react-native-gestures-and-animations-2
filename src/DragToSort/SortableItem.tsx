import type { ReactElement } from "react";
import React from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useDerivedValue,
  type SharedValue,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export interface Offset {
  y: SharedValue<number>;
}

interface SortableItemProps {
  children: ReactElement;
  index: number;
  offsets: Offset[];
  item: { height: number; width: number };
}

export const SortableItem = ({
  index,
  offsets,
  children,
  item: { height, width },
}: SortableItemProps) => {
  const gestureActive = useSharedValue(false);
  const gestureFinishing = useSharedValue(false);
  const offset = offsets[index];
  const safeOffsetY = useSharedValue(0);
  const x = useSharedValue(0);
  const y = useSharedValue(offset.y.value);

  const pan = Gesture.Pan()
    .onStart(() => {
      gestureActive.value = true;
      safeOffsetY.value = offset.y.value;
    })
    .onUpdate((event) => {
      x.value = event.translationX;
      y.value = safeOffsetY.value + event.translationY;
      const offsetY = Math.round(y.value / height) * height;
      offsets.forEach((o, i) => {
        if (o.y.value === offsetY && i !== index) {
          const tmp = o.y.value;
          o.y.value = offset.y.value;
          offset.y.value = tmp;
        }
      });
    })
    .onEnd((event) => {
      gestureActive.value = false;
      gestureFinishing.value = true;
      x.value = withSpring(0, {
        stiffness: 100,
        mass: 1,
        damping: 10,
        overshootClamping: false,
        velocity: event.velocityX,
      });
      y.value = withSpring(
        offset.y.value,
        {
          stiffness: 100,
          mass: 1,
          damping: 10,
          overshootClamping: false,
          velocity: event.velocityY,
        },
        () => (gestureFinishing.value = false)
      );
    });

  const translateX = useDerivedValue(() => x.value);
  const translateY = useDerivedValue(() => {
    if (gestureActive.value) {
      return y.value;
    } else {
      return withSpring(offset.y.value);
    }
  });
  const style = useAnimatedStyle(() => ({
    zIndex: gestureActive.value || gestureFinishing.value ? 100 : 0,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: withSpring(gestureActive.value ? 1.1 : 1) },
    ],
  }));
  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height,
            width,
          },
          style,
        ]}
      >
        {children}
      </Animated.View>
    </GestureDetector>
  );
};
