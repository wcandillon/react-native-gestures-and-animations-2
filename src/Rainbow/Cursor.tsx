import React from "react";
import { View, StyleSheet } from "react-native";

const CURSOR = 50;
const styles = StyleSheet.create({
  cursor: {
    width: CURSOR,
    height: CURSOR,
    borderRadius: CURSOR / 2,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  cursorBody: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: "black",
  },
});

interface CursorProps {
  data: { path: string };
}

const Cursor = ({ data }: CursorProps) => {
  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={[styles.cursor]}>
        <View style={styles.cursorBody} />
      </View>
    </View>
  );
};

export default Cursor;
