import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";

import { ReText } from "../components/AnimatedHelpers";

import Row from "./Row";
import { CANDLES, STEP, formatDatetime } from "./ChartHelpers";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  table: {
    flexDirection: "row",
    padding: 16,
  },
  date: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
  },
  column: {
    flex: 1,
  },
  separator: {
    width: 16,
  },
});

interface ValuesProps {
  translateX: Animated.SharedValue<number>;
}

const Values = ({ translateX }: ValuesProps) => {
  const values = useDerivedValue(() => {
    const { open, close, low, high, date } = CANDLES[
      Math.floor(translateX.value / STEP)
    ];
    const diff = `${((close - open) * 100) / open}`;
    return {
      date,
      open,
      close,
      low,
      high,
      diff,
      change: `${
        close - open < 0 ? diff.substring(0, 5) : diff.substring(0, 4)
      }%`,
    };
  });
  const white = useSharedValue("#ffffff");
  const color = useDerivedValue(() =>
    values.value.close - values.value.open > 0 ? "#4AFA9A" : "#E33F64"
  );
  const date = useDerivedValue(() => formatDatetime(values.value.date));
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.table}>
        <View style={styles.column}>
          <Row label="Open" value="open" color={white} {...{ values }} />
          <Row label="Close" value="close" color={white} {...{ values }} />
        </View>
        <View style={styles.separator} />
        <View style={styles.column}>
          <Row label="High" value="high" color={white} {...{ values }} />
          <Row label="Low" value="low" color={white} {...{ values }} />
          <Row label="Change" value="change" {...{ values, color }} />
        </View>
      </View>
      <ReText style={styles.date} text={date} />
    </SafeAreaView>
  );
};

export default Values;

/*

      */
