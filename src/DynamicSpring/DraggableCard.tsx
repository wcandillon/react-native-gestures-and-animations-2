import React from "react";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

import { Card, Cards, CARD_WIDTH, CARD_HEIGHT } from "../components";
import {
  withDecay,
  clamp,
  useTranslate,
  vec,
  VectorValue,
} from "../components/AnimatedHelpers";

interface DraggableCardProps {
  translate: VectorValue;
  width: number;
  height: number;
}

const DraggableCard = ({ translate, width, height }: DraggableCardProps) => {
  const lowerBound = { x: 0, y: 0 };
  const upperBound = { x: width - CARD_WIDTH, y: height - CARD_HEIGHT };
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.offset = vec.project(translate);
    },
    onActive: ({ translationX: x, translationY: y }, ctx) => {
      vec.set(
        translate,
        vec.clamp(vec.add(ctx.offset, { x, y }), lowerBound, upperBound)
      );
    },
    onEnd: ({ velocityX: x, velocityY: y }) => {
      vec.withDecay(translate, { x, y }, lowerBound, upperBound);
    },
  });
  const style = useTranslate(translate);
  return (
    <PanGestureHandler {...{ onGestureEvent }}>
      <Animated.View {...{ style }}>
        <Card card={Cards.Card1} />
      </Animated.View>
    </PanGestureHandler>
  );
};

export default DraggableCard;
