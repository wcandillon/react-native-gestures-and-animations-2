import * as React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from "react-native-reanimated";
import type { PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import { PanGestureHandler } from "react-native-gesture-handler";
import { canvas2Polar, polar2Canvas, clamp } from "react-native-redash";

const THRESHOLD = 0.001;

interface CursorProps {
  r: number;
  strokeWidth: number;
  theta: Animated.SharedValue<number>;
  backgroundColor: Animated.SharedValue<string | number>;
}

export const Cursor = ({
  r,
  strokeWidth,
  theta,
  backgroundColor,
}: CursorProps) => {
  const center = { x: r, y: r };
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      offset: { x: number; y: number };
    }
  >({
    onStart: (_event, ctx) => {
      ctx.offset = polar2Canvas(
        {
          theta: theta.value,
          radius: r,
        },
        center
      );
    },
    onActive: (event, ctx) => {
      const x = ctx.offset.x + event.translationX;
      const y1 = ctx.offset.y + event.translationY;
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
    },
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
      backgroundColor: backgroundColor.value,
      transform: [{ translateX: translation.x }, { translateY: translation.y }],
    };
  });
  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
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
    </PanGestureHandler>
  );
};
