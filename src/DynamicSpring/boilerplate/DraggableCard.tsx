import React from "react";
import Animated, {
  useAnimatedGestureHandler,
  withDecay,
  useSharedValue,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

import { Card, Cards, CARD_WIDTH, CARD_HEIGHT } from "../../components";
import { clamp, useTranslate } from "../../components/AnimatedHelpers";

interface DraggableCardProps {
  width: number;
  height: number;
}

const DraggableCard = ({ width, height }: DraggableCardProps) => {
  const translate = {
    x: useSharedValue(0),
    y: useSharedValue(0),
  };
  const boundX = width - CARD_WIDTH;
  const boundY = height - CARD_HEIGHT;
  const onGestureEvent = useAnimatedGestureHandler<{
    offsetX: number;
    offsetY: number;
  }>({
    onStart: (_, ctx) => {
      ctx.offsetX = translate.x.value;
      ctx.offsetY = translate.y.value;
    },
    onActive: (event, ctx) => {
      translate.x.value = clamp(ctx.offsetX + event.translationX, 0, boundX);
      translate.y.value = clamp(ctx.offsetY + event.translationY, 0, boundY);
    },
    onEnd: ({ velocityX, velocityY }) => {
      translate.x.value = withDecay({
        velocity: velocityX,
        clamp: [0, boundX],
      });
      translate.y.value = withDecay({
        velocity: velocityY,
        clamp: [0, boundY],
      });
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
