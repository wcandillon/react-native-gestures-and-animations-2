import React from "react";
import { View, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

import { Card, Cards, CARD_WIDTH, CARD_HEIGHT } from "../../components";

import DraggableCard from "./DraggableCard";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    position: "absolute",
    top: 0,
    left: 0,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
});

interface DynamicSpringProps {
  width: number;
  height: number;
}

const DynamicSpring = ({ width, height }: DynamicSpringProps) => {
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.card]}>
        <Card card={Cards.Card3} />
      </Animated.View>
      <Animated.View style={[styles.card]}>
        <Card card={Cards.Card2} />
      </Animated.View>
      <DraggableCard {...{ width, height }} />
    </View>
  );
};

export default DynamicSpring;
