import React, { useState } from "react";
import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { Button, StyleGuide, cards } from "../../components";

import AnimatedCard, { AnimatedText } from "./AnimatedCard";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
    justifyContent: "flex-end",
  },
});

const useSpring = (state, config = {}) => {
  const value = useSharedValue(0);

  useEffect(() => {
    value.value = typeof state === "number" ? state : state ? 1 : 0;
  }, [state, value]);

  return useDerivedValue(() => {
    return withSpring(value.value, config);
  });
};

const useTiming = (state, config = {}) => {
  const value = useSharedValue(0);

  useEffect(() => {
    value.value = typeof state === "number" ? state : state ? 1 : 0;
  }, [state, value]);

  return useDerivedValue(() => {
    return withSpring(value.value, config);
  });
};

const UseTransition = () => {
  // const toggled = useSharedValue(false);
  const [toggled, setToggle] = useState(false);
  // const transition = useDerivedValue(() => {
  //   return withSpring(toggled.value);
  // });
  const transition = useSpring(toggled, { transition: 6000 });
  return (
    <View style={styles.container}>
      <Text>Hey there</Text>
      {cards.slice(0, 3).map((card, index) => (
        <AnimatedCard key={card} {...{ index, card, transition }} />
      ))}
      <AnimatedText transition={transition} />
      <Button
        label={toggled ? "Reset" : "Start"}
        primary
        onPress={() => setToggle((prev) => !prev)}
      />
    </View>
  );
};

export default UseTransition;
