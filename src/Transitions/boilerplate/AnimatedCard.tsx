import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { mix } from "../../components/AnimatedHelpers";
import { Card, Cards, StyleGuide } from "../../components";

const { width } = Dimensions.get("window");
const origin = -(width / 2 - StyleGuide.spacing * 2);
const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    padding: StyleGuide.spacing * 4,
  },
});

interface AnimatedCardProps {
  transition: Animated.SharedValue<number>;
  index: number;
  card: Cards;
}

const AnimatedCard = ({ card, transition, index }: AnimatedCardProps) => {
  const style = useAnimatedStyle(() => {
    const rotate = mix(transition.value, 0, ((index - 1) * Math.PI) / 6);
    return {
      transform: [{ translateX: origin }, { rotate }, { translateX: -origin }],
    };
  });
  return (
    <Animated.View style={[styles.overlay, style]}>
      <Card {...{ card }} />
    </Animated.View>
  );
};

export default AnimatedCard;
