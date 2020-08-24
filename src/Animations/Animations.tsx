import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  withTiming,
  useSharedValue,
  Easing,
  useDerivedValue,
} from "react-native-reanimated";

import { Button, StyleGuide } from "../components";
import { repeat, withPause } from "../components/AnimatedHelpers";

import ChatBubble from "./ChatBubble";

const easing = Easing.inOut(Easing.ease);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: StyleGuide.palette.background,
  },
});

const Timing = () => {
  const [play, setPlay] = useState(false);
  const paused = useSharedValue(false);
  const progress = useSharedValue<number | null>(null);
  return (
    <View style={styles.container}>
      <ChatBubble progress={progress} />
      <Button
        label={play ? "Pause" : "Play"}
        primary
        onPress={() => {
          setPlay((prev) => !prev);
          paused.value = !paused.value;
          if (progress.value === null) {
            progress.value = withPause(repeat(withTiming(1), -1, true), paused);
          }
        }}
      />
    </View>
  );
};

export default Timing;
