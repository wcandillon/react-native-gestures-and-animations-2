import React from "react";
import { View, StyleSheet } from "react-native";
import { runOnJS, runOnUI } from "react-native-reanimated";

import { Button } from "../../components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});

const sayHello = (cb: () => void) => {
  "worklet";
  console.log("Hello from the UI thread");
  runOnJS(cb)();
};

const Worklets = () => {
  return (
    <View style={styles.container}>
      <Button
        label="Say Hello"
        primary
        onPress={() =>
          runOnUI(sayHello)(() => console.log("We called back to JS thread"))
        }
      />
    </View>
  );
};

export default Worklets;
