import React, { useState } from "react";
import type { LayoutRectangle } from "react-native";
import { StyleSheet, View } from "react-native";

import { DynamicSpring as Spring } from "./DynamicSpring";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const DynamicSpring = () => {
  const [container, setContainer] = useState<null | LayoutRectangle>(null);
  return (
    <View
      style={styles.container}
      onLayout={({ nativeEvent: { layout } }) => setContainer(layout)}
    >
      {container && <Spring {...container} />}
    </View>
  );
};
