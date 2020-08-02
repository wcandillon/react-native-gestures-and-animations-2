import React from "react";
import { View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { SharedVector } from "../components/AnimatedHelpers";

const SIZE = 50;

interface BallProps {
  translation: SharedVector;
  backgroundColor: string;
}

const Ball = ({ translation, backgroundColor }: BallProps) => {
  const style = useAnimatedStyle(() => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor,
    transform: [
      { translateX: translation.x.value },
      { translateY: translation.y.value },
    ],
  }));
  return <Animated.View {...{ style }} />;
};

export default Ball;
