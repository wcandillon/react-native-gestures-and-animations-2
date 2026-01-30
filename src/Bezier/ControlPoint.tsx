import Animated, {
  useAnimatedStyle,
  useSharedValue,
  type SharedValue,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { clamp } from "react-native-redash";

export const CONTROL_POINT_RADIUS = 20;

interface ControlPointProps {
  x: SharedValue<number>;
  y: SharedValue<number>;
  min: number;
  max: number;
}

export const ControlPoint = ({ x, y, min, max }: ControlPointProps) => {
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  const pan = Gesture.Pan()
    .onStart(() => {
      offsetX.value = x.value;
      offsetY.value = y.value;
    })
    .onUpdate((event) => {
      x.value = clamp(offsetX.value + event.translationX, min, max);
      y.value = clamp(offsetY.value + event.translationY, min, max);
    });

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: x.value - CONTROL_POINT_RADIUS },
      { translateY: y.value - CONTROL_POINT_RADIUS },
    ],
  }));
  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[
          {
            position: "absolute",
            width: CONTROL_POINT_RADIUS * 2,
            height: CONTROL_POINT_RADIUS * 2,
          },
          style,
        ]}
      />
    </GestureDetector>
  );
};
