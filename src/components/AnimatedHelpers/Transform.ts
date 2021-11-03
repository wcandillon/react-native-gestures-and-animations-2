import type Animated from "react-native-reanimated";
import { useAnimatedStyle } from "react-native-reanimated";
import type { Vector } from "react-native-redash";

export const useTranslate = (vector: Vector<Animated.SharedValue<number>>) =>
  useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: vector.x.value },
        { translateY: vector.y.value },
      ],
    };
  });
