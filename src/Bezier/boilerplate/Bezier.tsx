import { Dimensions, StyleSheet, View } from "react-native";
import Svg, { Line, Path, Circle } from "react-native-svg";

import { ControlPoint, CONTROL_POINT_RADIUS } from "./ControlPoint";

const { width } = Dimensions.get("window");
const PADDING = 24;
const SIZE = width;
const STROKE_WIDTH = 4;
const min = PADDING;
const max = SIZE - PADDING;
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
    width: SIZE + STROKE_WIDTH,
    height: SIZE + STROKE_WIDTH,
  },
});

export const BezierCurves = () => {
  const c1x = min;
  const c1y = min;
  const c2x = max;
  const c2y = max;
  const d = `M ${start.x} ${start.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${end.x} ${end.y}`;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Svg style={StyleSheet.absoluteFill}>
          <Path
            fill="transparent"
            stroke="black"
            strokeWidth={STROKE_WIDTH}
            d={d}
          />
          <Line
            x1={start.x}
            y1={start.y}
            x2={c1x}
            y2={c1y}
            stroke="black"
            strokeWidth={STROKE_WIDTH / 2}
          />
          <Line
            x1={end.x}
            y1={end.y}
            x2={c2x}
            y2={c2y}
            stroke="black"
            strokeWidth={STROKE_WIDTH / 2}
          />
          <Circle
            cx={c1x}
            cy={c1y}
            fill="#38ffb3"
            stroke="black"
            strokeWidth={STROKE_WIDTH}
            r={CONTROL_POINT_RADIUS}
          />
          <Circle
            cx={c2x}
            cy={c2y}
            fill="#FF6584"
            stroke="black"
            strokeWidth={STROKE_WIDTH}
            r={CONTROL_POINT_RADIUS}
          />
        </Svg>
        <ControlPoint x={c1x} y={c1y} min={min} max={max} />
        <ControlPoint x={c2x} y={c2y} min={min} max={max} />
      </View>
    </View>
  );
};
