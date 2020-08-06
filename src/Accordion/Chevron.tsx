import React from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Path } from "react-native-svg";

const size = 30;
const styles = StyleSheet.create({
  container: {
    height: size,
    width: size,
    borderRadius: size / 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

interface ChevronProps {
  open: boolean;
}

const Chevron = ({ open }: ChevronProps) => {
  const rotateZ = open ? "0rad" : `${Math.PI}rad`;
  return (
    <View
      style={[
        styles.container,
        {
          transform: [{ rotateZ }],
          backgroundColor: open ? "#e45645" : "#525251",
        },
      ]}
    >
      <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M6 9l6 6 6-6" />
      </Svg>
    </View>
  );
};

export default Chevron;
