import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";

import { ReText } from "../components/AnimatedHelpers";

import { formatUSD, scaleYInvert } from "./ChartHelpers";

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-end",
    backgroundColor: "#FEFFFF",
    borderRadius: 4,
    padding: 4,
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

interface LabelProps {
  translateY: Animated.SharedValue<number>;
  opacity: Animated.SharedValue<number>;
}

const Label = ({ opacity, translateY }: LabelProps) => {
  const vertical = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));
  const value = useDerivedValue(() => {
    return formatUSD(scaleYInvert(translateY.value));
  });
  return (
    <Animated.View style={[styles.container, vertical]}>
      <ReText
        text={value}
        style={{ color: "black", fontVariant: ["tabular-nums"] }}
      />
    </Animated.View>
  );
};

export default Label;
