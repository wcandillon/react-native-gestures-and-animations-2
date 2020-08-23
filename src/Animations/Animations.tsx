import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  withTiming,
  cancelAnimation,
  sequence,
  useSharedValue,
  Easing,
} from "react-native-reanimated";

import { Button, StyleGuide } from "../components";
import { repeat } from "../components/AnimatedHelpers";

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
  const progress = useSharedValue(0);
  const dest = useSharedValue(1);
  return (
    <View style={styles.container}>
      <ChatBubble progress={progress} />
      <Button
        label={play ? "Pause" : "Play"}
        primary
        onPress={() => {
          setPlay((prev) => !prev);
          if (play) {
            cancelAnimation(progress);
            dest.value = 1 - dest.value;
          } else {
            progress.value = sequence(
              withTiming(dest.value, {
                duration:
                  dest.value === 1
                    ? 1000 - progress.value * 1000
                    : progress.value * 1000,
                easing,
              }),
              repeat(
                withTiming(1 - dest.value, {
                  duration: 1000,
                  easing,
                }),
                -1,
                true,
                () => (dest.value = 1 - dest.value)
              )
            );
          }
        }}
      />
    </View>
  );
};

export default Timing;
