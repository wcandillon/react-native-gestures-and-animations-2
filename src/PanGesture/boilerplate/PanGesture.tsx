import React from "react";
import { View, StyleSheet } from "react-native";

import { Card, Cards } from "../../components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

interface GestureProps {
  width: number;
  height: number;
}

const Gesture = ({ width, height }: GestureProps) => {
  console.log({ width, height });
  return (
    <View style={styles.container}>
      <Card card={Cards.Card1} />
    </View>
  );
};

export default Gesture;
