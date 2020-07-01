import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, { useDerivedValue } from "react-native-reanimated";

import { ReText, round } from "../components/AnimatedHelpers";
import { StyleGuide } from "../components";

const styles = StyleSheet.create({
  date: {
    ...StyleGuide.typography.title3,
    textAlign: "center",
  },
  price: {
    ...StyleGuide.typography.title2,
    textAlign: "center",
  },
});

export interface DataPoint {
  coord: {
    x: number;
    y: number;
  };
  data: {
    x: number;
    y: number;
  };
}

interface LabelProps {
  point: Animated.SharedValue<DataPoint>;
}

const Label = ({ point }: LabelProps) => {
  const date = useDerivedValue(() => {
    const d = new Date(point.value.data.x);
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });
  const price = useDerivedValue(() => {
    const p = point.value.data.y;
    return `$ ${round(p, 2).toLocaleString("en-US", { currency: "USD" })}`;
  });
  return (
    <View>
      <ReText style={styles.date} text={date} />
      <ReText style={styles.price} text={price} />
    </View>
  );
};

export default Label;
