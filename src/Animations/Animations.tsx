import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import {
  withTiming,
  Easing,
  repeat,
  cancelAnimation,
  runOnUI,
  useDerivedValue,
  sequence,
  useSharedValue,
  interpolate,
} from "react-native-reanimated";

import { Button, StyleGuide } from "../components";

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
          } else {
            progress.value = sequence(
              withTiming(1, {
                duration: 1000 - progress.value * 1000,
                easing,
              }),
              repeat(
                withTiming(0, {
                  duration: 1000,
                  easing,
                }),
                -1,
                true
              )
            );
          }
        }}
      />
    </View>
  );
};

export default Timing;
