import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Svg, { Line, Path } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
} from "react-native-reanimated";

import ControlPoint from "./ControlPoint";

const { width } = Dimensions.get("window");
const size = width - 48;
const STROKE_WIDTH = 4;
const min = STROKE_WIDTH / 2;
const max = min + size;
const start = {
  x: min,
  y: max,
};
const end = {
  x: max,
  y: min,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: size + STROKE_WIDTH,
    height: size + STROKE_WIDTH,
  },
});
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedLine = Animated.createAnimatedComponent(Line);
const BezierCurves = () => {
  const c1x = useSharedValue(min);
  const c1y = useSharedValue(min);
  const c2x = useSharedValue(max);
  const c2y = useSharedValue(max);
  const path = useAnimatedProps(() => ({
    d: `M ${start.x} ${start.y} C ${c1x.value} ${c1y.value}, ${c2x.value} ${c2y.value}, ${end.x} ${end.y}`,
  }));
  const line1 = useAnimatedProps(() => ({
    x2: c1x.value,
    y2: c1y.value,
  }));
  const line2 = useAnimatedProps(() => ({
    x2: c2x.value,
    y2: c2y.value,
  }));
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Svg style={StyleSheet.absoluteFill}>
          <AnimatedPath
            fill="transparent"
            stroke="black"
            strokeWidth={STROKE_WIDTH}
            animatedProps={path}
          />
          <AnimatedLine
            x1={start.x}
            y1={start.y}
            animatedProps={line1}
            stroke="black"
            strokeWidth={STROKE_WIDTH / 2}
          />
          <AnimatedLine
            x1={end.x}
            y1={end.y}
            animatedProps={line2}
            stroke="black"
            strokeWidth={STROKE_WIDTH / 2}
          />
        </Svg>
        <ControlPoint
          point={{ x: c1x, y: c1y }}
          backgroundColor="#38ffb3"
          min={min}
          max={max}
        />
        <ControlPoint
          point={{ x: c2x, y: c2y }}
          backgroundColor="#FF6584"
          min={min}
          max={max}
        />
      </View>
    </View>
  );
};

export default BezierCurves;
