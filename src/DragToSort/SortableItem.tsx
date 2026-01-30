import type { ReactElement } from "react";
import React from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
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

const clamp = (value: number, min: number, max: number) => {
  "worklet";
  return Math.min(Math.max(value, min), max);
};

export const SortableItem = ({
  index,
  offsets,
  children,
  item: { height, width },
}: SortableItemProps) => {
  const gestureActive = useSharedValue(false);
  const gestureFinishing = useSharedValue(false);
  const offset = offsets[index];
  const startY = useSharedValue(0);
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const currentIndex = useSharedValue(index);

  const pan = Gesture.Pan()
    .onStart(() => {
      "worklet";
      gestureActive.value = true;
      startY.value = offset.y.value;
      y.value = offset.y.value;
      currentIndex.value = Math.round(offset.y.value / height);
    })
    .onUpdate((event) => {
      "worklet";
      x.value = event.translationX;
      const newY = startY.value + event.translationY;
      y.value = newY;

      // Calculate the target slot index based on the center of the dragged item
      const maxIndex = offsets.length - 1;
      const targetIndex = clamp(
        Math.round(newY / height),
        0,
        maxIndex
      );

      // Only swap if we moved to a different slot
      if (targetIndex !== currentIndex.value) {
        // Find the item currently at the target position
        for (let i = 0; i < offsets.length; i++) {
          if (i !== index) {
            const otherIndex = Math.round(offsets[i].y.value / height);
            if (otherIndex === targetIndex) {
              // Swap: move the other item to our current position
              offsets[i].y.value = currentIndex.value * height;
              break;
            }
          }
        }
        // Update our logical position
        offset.y.value = targetIndex * height;
        currentIndex.value = targetIndex;
      }
    })
    .onEnd((event) => {
      "worklet";
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
        () => {
          "worklet";
          gestureFinishing.value = false;
        }
      );
    });

  const style = useAnimatedStyle(() => {
    const translateY = gestureActive.value
      ? y.value
      : withSpring(offset.y.value);

    return {
      zIndex: gestureActive.value || gestureFinishing.value ? 100 : 0,
      transform: [
        { translateX: x.value },
        { translateY },
        { scale: withSpring(gestureActive.value ? 1.1 : 1) },
      ],
    };
  });

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
