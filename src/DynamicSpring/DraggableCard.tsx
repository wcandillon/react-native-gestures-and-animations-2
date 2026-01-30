import Animated, {
  withDecay,
  useSharedValue,
  type SharedValue,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { clamp } from "react-native-redash";

import { Card, Cards, CARD_WIDTH, CARD_HEIGHT } from "../components";
import { useTranslate } from "../components/AnimatedHelpers";

interface ValueVector {
  x: SharedValue<number>;
  y: SharedValue<number>;
}

interface DraggableCardProps {
  translate: ValueVector;
  width: number;
  height: number;
}

export const DraggableCard = ({
  translate,
  width,
  height,
}: DraggableCardProps) => {
  const boundX = width - CARD_WIDTH;
  const boundY = height - CARD_HEIGHT;
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  const pan = Gesture.Pan()
    .onStart(() => {
      offsetX.value = translate.x.value;
      offsetY.value = translate.y.value;
    })
    .onUpdate((event) => {
      translate.x.value = clamp(offsetX.value + event.translationX, 0, boundX);
      translate.y.value = clamp(offsetY.value + event.translationY, 0, boundY);
    })
    .onEnd((event) => {
      translate.x.value = withDecay({
        velocity: event.velocityX,
        clamp: [0, boundX],
      });
      translate.y.value = withDecay({
        velocity: event.velocityY,
        clamp: [0, boundY],
      });
    });

  const style = useTranslate(translate);
  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={style}>
        <Card card={Cards.Card1} />
      </Animated.View>
    </GestureDetector>
  );
};
