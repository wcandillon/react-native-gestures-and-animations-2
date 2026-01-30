import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  type SharedValue,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { clamp } from "react-native-redash";

const { width } = Dimensions.get("window");
const CURSOR_SIZE = 40;
const CONTAINER_WIDTH = width - 64;
export const SLIDER_WIDTH = CONTAINER_WIDTH - CURSOR_SIZE;
const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: CONTAINER_WIDTH,
  },
  dividerContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    borderColor: "rgba(50, 50, 50, 0.5)",
    width: SLIDER_WIDTH,
    borderWidth: StyleSheet.hairlineWidth,
  },
  cursor: {
    width: CURSOR_SIZE,
    height: CURSOR_SIZE,
    borderRadius: CURSOR_SIZE * 0.3,
    borderWidth: 3,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  cursorPoint: {
    borderRadius: 5,
    width: 10,
    height: 10,
    backgroundColor: "black",
  },
});

interface SliderProps {
  translateX: SharedValue<number>;
}

export const Slider = ({ translateX }: SliderProps) => {
  const offsetX = useSharedValue(0);

  const pan = Gesture.Pan()
    .minDistance(0)
    .onStart(() => {
      offsetX.value = translateX.value;
    })
    .onUpdate((event) => {
      translateX.value = clamp(offsetX.value + event.translationX, 0, SLIDER_WIDTH);
    });

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
  return (
    <View style={styles.container}>
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
      </View>
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.cursor, style]}>
          <View style={styles.cursorPoint} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};
