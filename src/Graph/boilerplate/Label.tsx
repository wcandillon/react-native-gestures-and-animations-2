/* eslint-disable react-native/no-unused-styles */

import { View, StyleSheet } from "react-native";

import { StyleGuide } from "../../components";

const styles = StyleSheet.create({
  date: {
    ...StyleGuide.typography.title3,
    textAlign: "center",
  },
  price: {
    ...StyleGuide.typography.title2,
    textAlign: "center",
  },
});

console.log({ styles });

export interface DataPoint {
  coord: {
    x: number;
    y: number;
  };
  data: {
    x: number;
    y: number;
  };
}

interface LabelProps {
  point: DataPoint;
}

export const Label = ({}: LabelProps) => {
  return <View />;
};
