import { StyleSheet, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";

import { Eye } from "./Eye";
import { Mouth } from "./Mouth";
import { Slider, SLIDER_WIDTH } from "./Slider";

const styles = StyleSheet.create({
  face: {
    width: 150,
    height: 150,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 32,
  },
  eyes: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

const bad = "#FDBEEB";
const normal = "#FDEEBE";
const good = "#BEFDE5";

export const ShapeMorphing = () => {
  const translateX = useSharedValue(0);
  const progress = useDerivedValue(() => translateX.value / SLIDER_WIDTH);
  const style = useAnimatedStyle(() => ({
    flex: 1,
    justifyContent: "center",
    backgroundColor: interpolateColor(
      progress.value,
      [0, 0.5, 1],
      [bad, normal, good]
    ),
  }));
  return (
    <Animated.View style={style}>
      <View style={styles.face}>
        <View style={styles.eyes}>
          <Eye progress={progress} />
          <Eye flip progress={progress} />
        </View>
        <Mouth progress={progress} />
      </View>
      <Slider translateX={translateX} />
    </Animated.View>
  );
};
