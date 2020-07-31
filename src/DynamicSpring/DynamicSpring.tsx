import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useDerivedValue,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

import { Card, Cards, CARD_WIDTH, CARD_HEIGHT } from "../components";
import { withDecay, clamp } from "../components/AnimatedHelpers";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

interface DynamicSpringProps {
  width: number;
  height: number;
}

const DynamicSpring = ({ width, height }: DynamicSpringProps) => {
  const boundX = width - CARD_WIDTH;
  const boundY = height - CARD_HEIGHT;
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.offsetX = translateX.value;
      ctx.offsetY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = clamp(ctx.offsetX + event.translationX, 0, boundX);
      translateY.value = clamp(ctx.offsetY + event.translationY, 0, boundY);
    },
    onEnd: ({ velocityX, velocityY }) => {
      translateX.value = withDecay({
        velocity: velocityX,
        clamp: [0, boundX],
      });
      translateY.value = withDecay({
        velocity: velocityY,
        clamp: [0, boundY],
      });
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
  const t2X = useDerivedValue(() => withSpring(translateX.value));
  const t2Y = useDerivedValue(() => withSpring(translateY.value));
  const style2 = useAnimatedStyle(() => {
    return {
      position: "absolute",
      top: 0,
      left: 0,
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      transform: [{ translateX: t2X.value }, { translateY: t2Y.value }],
    };
  });
  const style3 = useAnimatedStyle(() => {
    return {
      position: "absolute",
      top: 0,
      left: 0,
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      transform: [
        { translateX: withSpring(t2X.value) },
        { translateY: withSpring(t2Y.value) },
      ],
    };
  });
  return (
    <View style={styles.container}>
      <PanGestureHandler {...{ onGestureEvent }}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <Animated.View style={style3}>
            <Card card={Cards.Card3} />
          </Animated.View>
          <Animated.View style={style2}>
            <Card card={Cards.Card2} />
          </Animated.View>
          <Animated.View {...{ style }}>
            <Card card={Cards.Card1} />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default DynamicSpring;
