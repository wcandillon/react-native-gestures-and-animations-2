import { View } from "react-native";

export const CONTROL_POINT_RADIUS = 20;

interface ControlPointProps {
  x: number;
  y: number;
  min: number;
  max: number;
}

export const ControlPoint = ({}: ControlPointProps) => {
  return (
    <View
      style={[
        {
          position: "absolute",
          width: CONTROL_POINT_RADIUS * 2,
          height: CONTROL_POINT_RADIUS * 2,
        },
      ]}
    />
  );
};
