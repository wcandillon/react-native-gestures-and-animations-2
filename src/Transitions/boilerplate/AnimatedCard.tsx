import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { StyleSheet, Dimensions } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
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

interface AnimatedCardProps {
  transition: any;
  index: number;
  card: Cards;
}

interface AnimatedTextProps {
  transition: any;
}

export const AnimatedText = ({ transition }: AnimatedTextProps) => {
  const style = useAnimatedStyle(() => {
    const value = mix(transition.value, 1, 800);
    return {
      fontWeight: `${Math.round(value)}`,
      fontSize: Math.round(value / 10),
    };
  });
  return (
    <Animated.Text style={[style]}>Hey this will get bolder</Animated.Text>
  );
};

const AnimatedCard = ({ card, transition, index }: AnimatedCardProps) => {
  const style = useAnimatedStyle(() => {
    const rotate = mix(transition.value, 0.5 * Math.PI, 0);
    return {};
  });

  return (
    <Animated.View key={card} style={[styles.overlay, style]}>
      <Card {...{ card }} />
    </Animated.View>
  );
};

export default AnimatedCard;
