interface AnimatedCardProps {
  transition: any;
  index: number;
  card: Cards;
}

import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import Animated, {
  interpolate,
  interpolateNode,
  useAnimatedStyle,
} from "react-native-reanimated";
import { mix } from "react-native-redash";

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

const AnimatedCard = ({ card, transition, index }: AnimatedCardProps) => {
  // const alpha = transition ? ((index - 1) * Math.PI) / 6 : 0;
  const style = useAnimatedStyle(() => {
    const rotate = interpolate(
      transition.value,
      [0, 1],
      [0, ((index - 1) * Math.PI) / 6]
    );
    // যদি interpolation সব সময় 0 এবং 1 এর মধ্যে হয় তাহলে mix from reedash use করা যাবে
    // if it's [0,1] then use mix frmo react-native-redash
    // const rotate = mix(transition.value, 0, [0, ((index - 1) * Math.PI) / 6]);
    return {
      transform: [{ translateX: origin }, { rotate }, { translateX: -origin }],
    };
  });
  return (
    <Animated.View key={card} style={[styles.overlay, style]}>
      <Card {...{ card }} />
    </Animated.View>
  );
};

export default AnimatedCard;
