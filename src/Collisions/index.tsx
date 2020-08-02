import React, { useState } from "react";
import { StyleSheet, View, LayoutRectangle } from "react-native";

import Collisions from "./Collisions";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Container = () => {
  const [container, setContainer] = useState<null | LayoutRectangle>(null);
  return (
    <View
      style={styles.container}
      onLayout={({ nativeEvent: { layout } }) => setContainer(layout)}
    >
      {container && <Collisions {...container} />}
    </View>
  );
};

export default Container;
