import React from "react";
import { View } from "react-native";

import { useVector } from "../components/AnimatedHelpers";

import Ball from "./Ball";

const balls = [
  "#2D4CD2",
  "#36B6D9",
  "#3CF2B5",
  "#37FF5E",
  "#59FB2D",
  "#AFF12D",
  "#DABC2D",
  "#D35127",
  "#D01252",
  "#CF0CAA",
  "#A80DD8",
  "#5819D7",
];

const useVectorValues = (size: number) =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  new Array(size).fill(0).map(() => useVector(0));

interface CollisionsProps {
  width: number;
  height: number;
}

const Collisions = ({ width, height }: CollisionsProps) => {
  const translations = useVectorValues(balls.length);
  return (
    <View style={{ width, height }}>
      {balls.map((backgroundColor, i) => (
        <Ball key={i} translation={translations[i]} {...{ backgroundColor }} />
      ))}
    </View>
  );
};

export default Collisions;
