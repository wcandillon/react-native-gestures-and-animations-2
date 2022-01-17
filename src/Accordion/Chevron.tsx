import { StyleSheet, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import Animated from "react-native-reanimated";

const size = 30;
const styles = StyleSheet.create({
  container: {
    height: size,
    width: size,
    borderRadius: size / 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#525251",
  },
});

interface ChevronProps {}

export const Chevron = ({}: ChevronProps) => {
  // const style = useAnimatedStyle(() => ({
  //   backgroundColor: mixColor(progress.value, "#525251", "#e45645") as string,
  //   transform: [{ rotateZ: `${mix(progress.value, 0, Math.PI)}rad` }],
  // }));
  return (
    <View style={[styles.container, { backgroundColor: "#525251" }]}>
      <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M6 9l6 6 6-6" />
      </Svg>
    </View>
  );
};
