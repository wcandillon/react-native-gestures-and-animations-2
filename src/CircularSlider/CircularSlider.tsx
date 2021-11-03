import { Dimensions, PixelRatio, StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  useDerivedValue,
  interpolateColor,
} from "react-native-reanimated";
import { canvas2Polar } from "react-native-redash";

import { StyleGuide } from "../components";

import { Cursor } from "./Cursor";
import { CircularProgress } from "./CircularProgress";

const { width } = Dimensions.get("window");
const size = width - 32;
const STROKE_WIDTH = 40;
const r = PixelRatio.roundToNearestPixel(size / 2);
const defaultTheta = canvas2Polar({ x: 0, y: 0 }, { x: r, y: r }).theta;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: r * 2,
    height: r * 2,
  },
});

export const CircularSlider = () => {
  const theta = useSharedValue(defaultTheta);
  const backgroundColor = useDerivedValue(() => {
    return interpolateColor(
      theta.value,
      [0, Math.PI, Math.PI * 2],
      ["#ff3884", StyleGuide.palette.primary, "#38ffb3"]
    );
  });
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <CircularProgress
            backgroundColor={backgroundColor}
            strokeWidth={STROKE_WIDTH}
            {...{ r }}
            {...{ theta }}
          />
        </Animated.View>
        <Cursor
          strokeWidth={STROKE_WIDTH}
          r={r - STROKE_WIDTH / 2}
          backgroundColor={backgroundColor}
          {...{ theta }}
        />
      </View>
    </View>
  );
};
