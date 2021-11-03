import { StyleSheet, View } from "react-native";

import { Eye } from "./Eye";
import { Mouth } from "./Mouth";
import { Slider } from "./Slider";

const bad = "#FDBEEB";
//const normal = "#FDEEBE";
//const good = "#BEFDE5";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: bad,
  },
  face: {
    width: 150,
    height: 150,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 32,
  },
  eyes: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export const ShapeMorphing = () => {
  const progress = 0.5;
  return (
    <View style={styles.container}>
      <View style={styles.face}>
        <View style={styles.eyes}>
          <Eye progress={progress} />
          <Eye flip progress={progress} />
        </View>
        <Mouth progress={progress} />
      </View>
      <Slider />
    </View>
  );
};
