import React from "react";
import { View, StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from "react-native-reanimated";
import { clamp, withBouncing } from "react-native-redash";

import { Card, Cards, CARD_HEIGHT, CARD_WIDTH } from "../../components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

interface GestureProps {
  width: number;
  height: number;
}

const Gesture = ({ width, height }: GestureProps) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const boundX = width - CARD_WIDTH;
  const boundY = height - CARD_HEIGHT;
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.offsetX = translateX.value;
      ctx.offsetY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = clamp(ctx.offsetX + event.translationX, 0, boundX);
      translateY.value = clamp(ctx.offsetY + event.translationY, 0, boundY);
    },
    onEnd: (event, ctx) => {
      translateX.value = withBouncing(
        withDecay({
          velocity: event.velocityX,
          clamp: [0, boundX],
        }),
        0,
        boundX
      );
      translateY.value = withBouncing(
        withDecay({
          velocity: event.velocityY,
          clamp: [0, boundY],
        }),
        0,
        boundY
      );
    },
  });

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler {...{ onGestureEvent }}>
        <Animated.View {...{ style }}>
          <Card card={Cards.Card1} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default Gesture;
