import { View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";

import { Card, Cards, CARD_WIDTH, CARD_HEIGHT } from "../components";

import { DraggableCard } from "./DraggableCard";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    position: "absolute",
    top: 0,
    left: 0,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
});

interface DynamicSpringProps {
  width: number;
  height: number;
}

export const DynamicSpring = ({ width, height }: DynamicSpringProps) => {
  const t1 = { x: useSharedValue(0), y: useSharedValue(0) };
  const t2 = {
    x: useDerivedValue(() => withSpring(t1.x.value)),
    y: useDerivedValue(() => withSpring(t1.y.value)),
  };
  const t3 = {
    x: useDerivedValue(() => withSpring(t2.x.value)),
    y: useDerivedValue(() => withSpring(t2.y.value)),
  };
  const style2 = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: t2.x.value }, { translateY: t2.y.value }],
    };
  });
  const style3 = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: t3.x.value }, { translateY: t3.y.value }],
    };
  });
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.card, style3]}>
        <Card card={Cards.Card3} />
      </Animated.View>
      <Animated.View style={[styles.card, style2]}>
        <Card card={Cards.Card2} />
      </Animated.View>
      <DraggableCard translate={t1} width={width} height={height} />
    </View>
  );
};
