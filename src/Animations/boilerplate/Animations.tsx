import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Button, StyleGuide } from "../../components";

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
  return (
    <View style={styles.container}>
      <ChatBubble progress={0.5} />
      <Button
        label={play ? "Pause" : "Play"}
        primary
        onPress={() => {
          setPlay((prev) => !prev);
        }}
      />
    </View>
  );
};

export default Timing;
