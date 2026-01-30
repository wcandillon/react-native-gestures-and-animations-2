import { View, StyleSheet, Dimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  withDecay,
  useSharedValue,
  type SharedValue,
} from "react-native-reanimated";

import type { Path } from "../components/AnimatedHelpers";

import type { DataPoint } from "./Label";

const { width } = Dimensions.get("window");
const CURSOR = 100;
const styles = StyleSheet.create({
  cursorContainer: {
    width: CURSOR,
    height: CURSOR,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "rgba(100, 200, 300, 0.4)",
  },
  cursor: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: "#367be2",
    borderWidth: 4,
    backgroundColor: "white",
  },
});

interface CursorProps {
  path: Path;
  length: SharedValue<number>;
  point: SharedValue<DataPoint>;
}

export const Cursor = ({ path, length, point }: CursorProps) => {
  const offsetX = useSharedValue(0);

  const pan = Gesture.Pan()
    .onStart(() => {
      offsetX.value = interpolate(
        length.value,
        [0, path.length],
        [0, width],
        Extrapolate.CLAMP
      );
    })
    .onUpdate((event) => {
      length.value = interpolate(
        offsetX.value + event.translationX,
        [0, width],
        [0, path.length],
        Extrapolate.CLAMP
      );
    })
    .onEnd((event) => {
      length.value = withDecay({
        velocity: event.velocityX,
        clamp: [0, path.length],
      });
    });

  const style = useAnimatedStyle(() => {
    const { coord } = point.value;
    const translateX = coord.x - CURSOR / 2;
    const translateY = coord.y - CURSOR / 2;
    return {
      transform: [{ translateX }, { translateY }],
    };
  });

  return (
    <View style={StyleSheet.absoluteFill}>
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.cursorContainer, style]}>
          <View style={styles.cursor} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};
