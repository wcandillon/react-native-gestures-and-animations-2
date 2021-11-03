import { Dimensions, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("window");
const CURSOR_SIZE = 40;
const CONTAINER_WIDTH = width - 64;
export const SLIDER_WIDTH = CONTAINER_WIDTH - CURSOR_SIZE;
const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: CONTAINER_WIDTH,
  },
  dividerContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    borderColor: "rgba(50, 50, 50, 0.5)",
    width: SLIDER_WIDTH,
    borderWidth: StyleSheet.hairlineWidth,
  },
  cursor: {
    width: CURSOR_SIZE,
    height: CURSOR_SIZE,
    borderRadius: CURSOR_SIZE * 0.3,
    borderWidth: 3,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  cursorPoint: {
    borderRadius: 5,
    width: 10,
    height: 10,
    backgroundColor: "black",
  },
});

export const Slider = () => {
  return (
    <View style={styles.container}>
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
      </View>
      <View style={[styles.cursor]}>
        <View style={styles.cursorPoint} />
      </View>
    </View>
  );
};
