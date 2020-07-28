import React from "react";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-end",
    backgroundColor: "#FEFFFF",
    borderRadius: 4,
    padding: 4,
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

interface LabelProps {
  domain: [number, number];
  size: number;
}

const Label = ({ domain: [min, max], size }: LabelProps) => {
  return <View style={[styles.container]} />;
};

export default Label;
