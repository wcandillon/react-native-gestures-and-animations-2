import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useDerivedValue,
} from "react-native-reanimated";

import { Card, Cards, CARD_WIDTH, CARD_HEIGHT } from "../components";

import DraggableCard from "./DraggableCard";

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
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

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
      <Animated.View style={style3}>
        <Card card={Cards.Card3} />
      </Animated.View>
      <Animated.View style={style2}>
        <Card card={Cards.Card2} />
      </Animated.View>
      <DraggableCard {...{ translateX, translateY, width, height }} />
    </View>
  );
};

export default DynamicSpring;
