import * as React from "react";
import { StyleSheet, View } from "react-native";

import { StyleGuide } from "../../components";

interface CursorProps {
  r: number;
  strokeWidth: number;
}

const Cursor = ({ strokeWidth }: CursorProps) => {
  return (
    <View
      style={[
        {
          ...StyleSheet.absoluteFillObject,
          width: strokeWidth,
          height: strokeWidth,
          borderRadius: strokeWidth / 2,
          borderColor: "white",
          borderWidth: 5,
          backgroundColor: StyleGuide.palette.primary,
        },
      ]}
    />
  );
};

export default Cursor;
