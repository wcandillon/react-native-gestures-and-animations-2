import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useDerivedValue,
} from "react-native-reanimated";

import { Card, Cards, CARD_WIDTH, CARD_HEIGHT } from "../components";
import { useVector } from "../components/AnimatedHelpers/Vector";

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
  const translate = useVector(0);
  const t2X = useDerivedValue(() => withSpring(translate.x.value));
  const t2Y = useDerivedValue(() => withSpring(translate.y.value));
  const style2 = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: t2X.value }, { translateY: t2Y.value }],
    };
  });
  const style3 = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withSpring(t2X.value) },
        { translateY: withSpring(t2Y.value) },
      ],
    };
  });
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.card, style3]}>
        <Card card={Cards.Card3} />
      </Animated.View>
      <Animated.View style={[styles.card, style2]}>
        <Card card={Cards.Card2} />
      </Animated.View>
      <DraggableCard {...{ translate, width, height }} />
    </View>
  );
};

export default DynamicSpring;
