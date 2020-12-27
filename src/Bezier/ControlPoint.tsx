import React from "react";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import {
  diffClamp,
  panGestureHandler,
  vec,
  withOffset,
} from "react-native-redash/lib/module/v1";

const { useCode, set, sub } = Animated;
export const CONTROL_POINT_RADIUS = 20;

interface AnimatedPoint {
  x: Animated.Value<number>;
  y: Animated.Value<number>;
}

interface Point {
  x: number;
  y: number;
}

interface ControlPointProps {
  point: AnimatedPoint;
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
  const { translation, gestureHandler, state } = panGestureHandler();
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
  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          width: CONTROL_POINT_RADIUS * 2,
          height: CONTROL_POINT_RADIUS * 2,
          borderRadius: CONTROL_POINT_RADIUS,
          borderWidth: 4,
          backgroundColor,
          transform: [
            { translateX: sub(x, CONTROL_POINT_RADIUS) },
            { translateY: sub(y, CONTROL_POINT_RADIUS) },
          ],
        }}
      />
    </PanGestureHandler>
  );
};

export default ControlPoint;
