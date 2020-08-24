import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  withTiming,
  repeat,
  useSharedValue,
  Easing,
} from "react-native-reanimated";

import { Button, StyleGuide } from "../components";
import { withPause } from "../components/AnimatedHelpers";

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
  const paused = useSharedValue(!play);
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
            progress.value = withPause(
              repeat(withTiming(1, { duration: 1000, easing }), -1, true),
              paused
            );
          }
        }}
      />
    </View>
  );
};

export default Timing;
