import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import {
  useSharedValue,
  withTiming,
  Easing,
  loop,
  useDerivedValue,
  cancelAnimation,
  runOnUI,
} from "react-native-reanimated";

import { Button, StyleGuide } from "../components";
import { bin } from "../components/AnimatedHelpers";

import ChatBubble from "./ChatBubble";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: StyleGuide.palette.background,
  },
});

const Timing = () => {
  const [play, setPlay] = useState(false);
  const isPlaying = useSharedValue(false);
  const progress = useSharedValue(0);
  const runAnimation = () => {
    "worklet";
    if (isPlaying.value) {
      cancelAnimation(progress);
    } else {
      progress.value = loop(
        withTiming(1, { duration: 1000, easing: Easing.linear }),
        -1
      );
    }
  };
  return (
    <View style={styles.container}>
      <ChatBubble {...{ progress }} />
      <Button
        label={play ? "Pause" : "Play"}
        primary
        onPress={() => {
          setPlay((prev) => !prev);
          isPlaying.value = !isPlaying.value;
          runOnUI(runAnimation)();
        }}
      />
    </View>
  );
};

export default Timing;
