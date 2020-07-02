import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Button, StyleGuide, cards } from "../components";
import { useSpring } from "../components/AnimatedHelpers";

import AnimatedCard from "./AnimatedCard";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
    justifyContent: "flex-end",
  },
});

const UseTransition = () => {
  const [toggled, setToggle] = useState(false);
  const transition = useSpring(toggled);
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
    </View>
  );
};

export default UseTransition;
