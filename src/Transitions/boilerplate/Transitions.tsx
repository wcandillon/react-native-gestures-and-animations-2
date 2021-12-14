import React, { useDebugValue, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { Button, StyleGuide, cards } from "../../components";

import AnimatedCard from "./AnimatedCard";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
    justifyContent: "flex-end",
  },
});

const useSpring = (state, config) => {
  const value = useSharedValue(0);
  useEffect(() => {
    // eslint-disable-next-line no-nested-ternary
    value.value = typeof state === "number" ? state : state ? 1 : 0;
  }, [state, value]);

  return useDerivedValue(() => {
    return withSpring(value.value, config);
  });
};

const useTiming = (state, config) => {
  const value = useSharedValue(0);
  useEffect(() => {
    // eslint-disable-next-line no-nested-ternary
    value.value = typeof state === "number" ? state : state ? 1 : 0;
  }, [state, value]);

  return useDerivedValue(() => {
    return withTiming(value.value, config);
  });
};

const UseTransition = () => {
  // const toggled = useSharedValue(false);
  const [toggled, setToggle] = useState(false);

  const transition = useSpring(toggled);
  // const transition = useTiming(toggled, { duration: 600 });
  // const transition = useDerivedValue(() => {
  //   return withSpring(toggled.value);
  // });

  return (
    <View style={styles.container}>
      {cards.slice(0, 3).map((card, index) => (
        <AnimatedCard key={card} {...{ index, card, transition }} />
      ))}
      <Button
        label={toggled ? "Reset" : "Start"}
        primary
        onPress={() => setToggle((prev) => !prev)}
      />
      {/* <Button
        label={toggled ? "Reset" : "Start"}
        primary
        onPress={() => (toggled.value = !toggled.value)}
      /> */}
    </View>
  );
};

export default UseTransition;
