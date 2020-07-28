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
  value: keyof Value;
  color: Animated.SharedValue<string>;
  values: Animated.SharedValue<Value>;
}

const Row = ({ label, value, values, color }: RowProps) => {
  const text = useDerivedValue(() => `${values.value[value]}`);
  // const style = useAnimatedStyle(() => ({ color: color.value }));
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <ReText style={styles.value} {...{ text }} />
    </View>
  );
};

export default Row;
