import React, { ReactElement } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export interface Offset {
  y: number;
}

interface SortableItemProps {
  children: ReactElement;
  index: number;
  offsets: Offset[];
  item: { height: number };
}

const SortableItem = ({
  index,
  offsets,
  children,
  item: { height, width },
}: SortableItemProps) => {
  const offset = offsets[index];
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(offset.y);
  const onGestureEvent = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    },
  });
  const style = useAnimatedStyle(() => ({
    height,
    width,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));
  return (
    <PanGestureHandler {...{ onGestureEvent }}>
      <Animated.View style={[styles.container, style]}>
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default SortableItem;
