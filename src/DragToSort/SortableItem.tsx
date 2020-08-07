import React, { ReactElement } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { StyleSheet, View } from "react-native";

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
  item: { height: number; width: number };
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
    onStart: () => {
      console.log("Start");
    },
    onActive: (event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    },
  });
  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));
  return (
    <PanGestureHandler {...{ onGestureEvent }}>
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height,
            width,
          },
          style,
        ]}
      >
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default SortableItem;
