import React from "react";
import { StyleSheet, View } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

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
      <Icon name="chevron-down" color="white" size={24} />
    </View>
  );
};

export default Chevron;
