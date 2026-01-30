import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { StyleGuide } from "../components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ball: {
    backgroundColor: StyleGuide.palette.primary,
    height: 100,
    width: 100,
    borderRadius: 50,
  },
});

export const Reanimated = () => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  const pan = Gesture.Pan()
    .onStart(() => {
      offsetX.value = x.value;
      offsetY.value = y.value;
    })
    .onUpdate((event) => {
      x.value = offsetX.value + event.translationX;
      y.value = offsetY.value + event.translationY;
    });

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }, { translateY: y.value }],
  }));
  //useMakeJsThreadBusy();
  return (
    <View style={styles.container}>
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.ball, style]} />
      </GestureDetector>
    </View>
  );
};
