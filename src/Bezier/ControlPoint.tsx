import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { clamp, Vector } from "react-native-redash";

const { useCode, set, sub } = Animated;
export const CONTROL_POINT_RADIUS = 20;

type Offset = { x: number; y: number };

interface Point {
  x: number;
  y: number;
}

interface ControlPointProps {
  point: Vector<Animated.SharedValue<number>>;
  defaultPoint: Point;
  backgroundColor: string;
  min: number;
  max: number;
}

const ControlPoint = ({
  point: { x, y },
  defaultPoint,
  min,
  max,
  backgroundColor,
}: ControlPointProps) => {
  /*
  const offset = vec.createValue(defaultPoint.x, defaultPoint.y);
  const translateX = diffClamp(
    withOffset(translation.x, state, offset.x),
    min,
    max
  );
  const translateY = diffClamp(
    withOffset(translation.y, state, offset.y),
    min,
    max
  );
  useCode(() => [set(x, translateX), set(y, translateY)], [
    translateX,
    translateY,
    x,
    y,
  ]);
  */
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    Offset
  >({
    onStart: (_, ctx) => {
      ctx.x = x.value;
      ctx.y = y.value;
    },
    onActive: ({ translationX, translationY }, ctx) => {
      x.value = clamp(ctx.x + translationX, min, max);
      y.value = clamp(ctx.y + translationY, min, max);
    },
  });
  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: x.value - CONTROL_POINT_RADIUS },
      { translateY: y.value - CONTROL_POINT_RADIUS },
    ],
  }));
  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            width: CONTROL_POINT_RADIUS * 2,
            height: CONTROL_POINT_RADIUS * 2,
            borderRadius: CONTROL_POINT_RADIUS,
            borderWidth: 4,
            backgroundColor,
          },
          style,
        ]}
      />
    </PanGestureHandler>
  );
};

export default ControlPoint;
