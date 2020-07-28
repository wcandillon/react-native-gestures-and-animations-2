import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";

import { ReText } from "../components/AnimatedHelpers";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 20,
    color: "grey",
  },
  value: {
    fontSize: 20,
    fontVariant: ["tabular-nums"],
    color: "white",
  },
});

interface Value {
  open: number;
  close: number;
  low: number;
  high: number;
  diff: string;
  change: string;
}

interface RowProps {
  label: string;
  color: Animated.SharedValue<string>;
  value: Animated.SharedValue<string>;
}

const Row = ({ label, value, color }: RowProps) => {
  // const style = useAnimatedStyle(() => ({ color: color.value }));
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <ReText style={styles.value} text={value} />
    </View>
  );
};

export default Row;
