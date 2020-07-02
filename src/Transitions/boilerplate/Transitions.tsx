import React from "react";
import { StyleSheet, View } from "react-native";
import {
  useSharedValue,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";

import { Button, StyleGuide, cards } from "../../components";
import { bin } from "../../components/AnimatedHelpers";

import AnimatedCard from "./AnimatedCard";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
    justifyContent: "flex-end",
  },
});

const UseTransition = () => {
  const toggled = useSharedValue(false);
  const transition = useDerivedValue(() => {
    return withSpring(bin(toggled.value));
  });
  return (
    <View style={styles.container}>
      {cards.slice(0, 3).map((card, index) => (
        <AnimatedCard key={card} {...{ index, card, transition }} />
      ))}
      <Button
        label={toggled.value ? "Reset" : "Start"}
        primary
        onPress={() => (toggled.value = !toggled.value)}
      />
    </View>
  );
};

export default UseTransition;
