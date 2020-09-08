import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import Animated from "react-native-reanimated";

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
  toggled: boolean;
  index: number;
  card: Cards;
}

const AnimatedCard = ({ card, toggled }: AnimatedCardProps) => {
  const rotate = toggled ? Math.PI / 6 : 0;
  const style = {
    transform: [{ translateX: origin }, { rotate }, { translateX: -origin }],
  };
  return (
    <Animated.View key={card} style={[styles.overlay, style]}>
      <Card {...{ card }} />
    </Animated.View>
  );
};

export default AnimatedCard;
