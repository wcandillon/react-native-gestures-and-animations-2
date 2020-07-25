import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import {
  useSharedValue,
  withTiming,
  Easing,
  repeat,
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
  const dest = useSharedValue(0);
  const progress = useDerivedValue(() => {
    return repeat(
      withTiming(dest.value, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1
    );
  });
  useEffect(() => {
    if (play) {
      dest.value = 1;
    } else {
      dest.value = 0;
      cancelAnimation(progress);
    }
  }, [dest, play, progress]);
  return (
    <View style={styles.container}>
      <ChatBubble {...{ progress }} />
      <Button
        label={play ? "Pause" : "Play"}
        primary
        onPress={() => setPlay((prev) => !prev)}
      />
    </View>
  );
};

export default Timing;
