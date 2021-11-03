import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedProps } from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import {
  addCurve,
  close,
  createPath,
  interpolatePath,
} from "react-native-redash";

interface EyeProps {
  progress: Animated.SharedValue<number>;
  flip?: boolean;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

const angryPath = createPath({ x: 16, y: 25 });
addCurve(angryPath, {
  to: { x: 48.51, y: 28.34 },
  c1: { x: 32.2, y: 27.09 },
  c2: { x: 43.04, y: 28.2 },
});
addCurve(angryPath, {
  to: { x: 73, y: 26.25 },
  c1: { x: 53.99, y: 28.48 },
  c2: { x: 62.15, y: 27.78 },
});
addCurve(angryPath, {
  to: { x: 54.74, y: 73.88 },
  c1: { x: 66.28, y: 53.93 },
  c2: { x: 60.19, y: 69.81 },
});
addCurve(angryPath, {
  to: { x: 27.48, y: 54.51 },
  c1: { x: 50.63, y: 76.96 },
  c2: { x: 40.4, y: 74.65 },
});
addCurve(angryPath, {
  to: { x: 16, y: 25 },
  c1: { x: 24.68, y: 50.15 },
  c2: { x: 20.85, y: 40.32 },
});
close(angryPath);

const normalPath = createPath({ x: 20.9, y: 30.94 });
addCurve(normalPath, {
  to: { x: 42.96, y: 32.56 },
  c1: { x: 31.26, y: 31.66 },
  c2: { x: 38.61, y: 32.2 },
});
addCurve(normalPath, {
  to: { x: 81.11, y: 38.32 },
  c1: { x: 66.94, y: 34.53 },
  c2: { x: 79.65, y: 36.45 },
});
addCurve(normalPath, {
  to: { x: 65.83, y: 59.52 },
  c1: { x: 83.9, y: 41.9 },
  c2: { x: 73.77, y: 56.6 },
});
addCurve(normalPath, {
  to: { x: 32.42, y: 49.7 },
  c1: { x: 61.95, y: 60.95 },
  c2: { x: 45.72, y: 58.91 },
});
addCurve(normalPath, {
  to: { x: 20.9, y: 30.94 },
  c1: { x: 23.56, y: 43.56 },
  c2: { x: 19.71, y: 37.3 },
});
close(normalPath);

const goodPath = createPath({ x: 21, y: 45 });
addCurve(goodPath, {
  to: { x: 29.41, y: 24.47 },
  c1: { x: 21, y: 36.78 },
  c2: { x: 24.26, y: 29.42 },
});
addCurve(goodPath, {
  to: { x: 45, y: 18 },
  c1: { x: 33.61, y: 20.43 },
  c2: { x: 38.05, y: 18 },
});
addCurve(goodPath, {
  to: { x: 69, y: 45 },
  c1: { x: 58.25, y: 18 },
  c2: { x: 69, y: 30.09 },
});
addCurve(goodPath, {
  to: { x: 45, y: 72 },
  c1: { x: 69, y: 59.91 },
  c2: { x: 58.25, y: 72 },
});
addCurve(goodPath, {
  to: { x: 21, y: 45 },
  c1: { x: 31.75, y: 72 },
  c2: { x: 21, y: 59.91 },
});
close(goodPath);

export const Eye = ({ progress, flip }: EyeProps) => {
  const animatedProps = useAnimatedProps(() => ({
    d: interpolatePath(
      progress.value,
      [0, 0.5, 1],
      [angryPath, normalPath, goodPath]
    ),
  }));
  const rotateY = flip ? "180deg" : "0deg";
  return (
    <View style={{ transform: [{ rotateY }] }}>
      <Svg width={90} height={70} viewBox="0 0 98 78">
        <AnimatedPath
          fill="white"
          stroke="black"
          strokeWidth="4"
          animatedProps={animatedProps}
        />
      </Svg>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Animated.View
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: "black",
          }}
        />
      </View>
    </View>
  );
};
