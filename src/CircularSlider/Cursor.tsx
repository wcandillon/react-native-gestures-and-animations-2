import * as React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { canvas2Polar, polar2Canvas, clamp } from "react-native-redash";

const THRESHOLD = 0.001;

type Value<T> = {
  value: T;
};

interface CursorProps {
  r: number;
  strokeWidth: number;
  theta: Value<number>;
  backgroundColor: Value<string | number>;
}

export const Cursor = ({
  r,
  strokeWidth,
  theta,
  backgroundColor,
}: CursorProps) => {
  const center = { x: r, y: r };
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  const pan = Gesture.Pan()
    .onStart(() => {
      const offset = polar2Canvas(
        {
          theta: theta.value,
          radius: r,
        },
        center
      );
      offsetX.value = offset.x;
      offsetY.value = offset.y;
    })
    .onUpdate((event) => {
      const x = offsetX.value + event.translationX;
      const y1 = offsetY.value + event.translationY;
      let y: number;
      if (x < r) {
        y = y1;
      } else if (theta.value < Math.PI) {
        y = clamp(y1, 0, r - THRESHOLD);
      } else {
        y = clamp(y1, r, 2 * r);
      }
      const value = canvas2Polar({ x, y }, center).theta;
      theta.value = value > 0 ? value : 2 * Math.PI + value;
    });

  const style = useAnimatedStyle(() => {
    const translation = polar2Canvas(
      {
        theta: theta.value,
        radius: r,
      },
      center
    );
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      backgroundColor: backgroundColor.value as any,
      transform: [{ translateX: translation.x }, { translateY: translation.y }],
    };
  });
  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            width: strokeWidth,
            height: strokeWidth,
            borderRadius: strokeWidth / 2,
            borderColor: "white",
            borderWidth: 5,
          },
          style,
        ]}
      />
    </GestureDetector>
  );
};
