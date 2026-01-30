import { useAnimatedStyle, type SharedValue } from "react-native-reanimated";
import type { Vector } from "react-native-redash";

export const useTranslate = (vector: Vector<SharedValue<number>>) =>
  useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: vector.x.value },
        { translateY: vector.y.value },
      ],
    };
  });
