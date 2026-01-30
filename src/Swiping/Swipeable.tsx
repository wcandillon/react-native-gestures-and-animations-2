import type { Ref } from "react";
import React, { forwardRef, useImperativeHandle } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useSharedValue,
  withSpring,
  type SharedValue,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";

import type { ProfileModel } from "./Profile";
import { Profile, α } from "./Profile";

const { width, height } = Dimensions.get("window");

const A = Math.round(width * Math.cos(α) + height * Math.sin(α));
const snapPoints = [-A, 0, A];

export interface SwipeHandler {
  swipeLeft: () => void;
  swipeRight: () => void;
}

interface SwiperProps {
  onSwipe: () => void;
  profile: ProfileModel;
  scale: SharedValue<number>;
  onTop: boolean;
}

const swipe = (
  translateX: SharedValue<number>,
  dest: number,
  velocity: number,
  cb: () => void
) => {
  "worklet";
  translateX.value = withSpring(
    dest,
    {
      velocity,
      overshootClamping: dest === 0 ? false : true,
    },
    () => {
      if (dest !== 0) {
        runOnJS(cb)();
      }
    }
  );
};

export const Swipeable = forwardRef(
  ({ onSwipe, profile, scale, onTop }: SwiperProps, ref: Ref<SwipeHandler>) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const offsetX = useSharedValue(0);
    const offsetY = useSharedValue(0);

    useImperativeHandle(ref, () => ({
      swipeLeft: () => {
        swipe(translateX, -A, 5, onSwipe);
      },
      swipeRight: () => {
        swipe(translateX, A, 5, onSwipe);
      },
    }));

    const pan = Gesture.Pan()
      .onStart(() => {
        offsetX.value = translateX.value;
        offsetY.value = translateY.value;
      })
      .onUpdate((event) => {
        translateX.value = offsetX.value + event.translationX;
        translateY.value = offsetY.value + event.translationY;
        scale.value = interpolate(
          translateX.value,
          [-width / 4, 0, width / 4],
          [1, 0.95, 1],
          Extrapolate.CLAMP
        );
      })
      .onEnd((event) => {
        const dest = snapPoint(translateX.value, event.velocityX, snapPoints);
        swipe(translateX, dest, 5, onSwipe);
        translateY.value = withSpring(0, { velocity: event.velocityY });
      });

    return (
      <GestureDetector gesture={pan}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <Profile
            profile={profile}
            translateX={translateX}
            translateY={translateY}
            scale={scale}
            onTop={onTop}
          />
        </Animated.View>
      </GestureDetector>
    );
  }
);
