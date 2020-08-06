import React from "react";
import { StyleSheet, processColor } from "react-native";
import Svg, { Path } from "react-native-svg";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useDerivedValue,
} from "react-native-reanimated";

import { bin, mix, mixColor } from "../components/AnimatedHelpers";

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
  open: Animated.SharedValue<boolean>;
}

const Chevron = ({ open }: ChevronProps) => {
  const progress = useDerivedValue(() => withSpring(bin(open.value)));
  const style = useAnimatedStyle(() => ({
    backgroundColor: "#525251",
    transform: [{ rotateZ: mix(progress.value, 0, Math.PI) }],
  }));
  return (
    <Animated.View style={[styles.container, style]}>
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
    </Animated.View>
  );
};

export default Chevron;
