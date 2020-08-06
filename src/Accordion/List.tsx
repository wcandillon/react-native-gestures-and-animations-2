import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import Animated, {
  useAnimatedRef,
  measure,
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
  runOnUI,
} from "react-native-reanimated";

import Chevron from "./Chevron";
import Item, { LIST_ITEM_HEIGHT, ListItem } from "./ListItem";

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  items: {
    overflow: "hidden",
  },
});

export interface List {
  name: string;
  items: ListItem[];
}

interface ListProps {
  list: List;
}

const List = ({ list }: ListProps) => {
  const aref = useAnimatedRef();
  const open = useSharedValue(true);
  const height = useDerivedValue(() => {
    return 270;
  });
  const style = useAnimatedStyle(() => {
    return {
      height: withTiming(open.value ? height.value : 0),
    };
  });
  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          open.value = !open.value;
        }}
      >
        <View style={[styles.container]}>
          <Text style={styles.title}>Total Points</Text>
          <Chevron {...{ open }} />
        </View>
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.items, style]}>
        <View ref={aref}>
          {list.items.map((item, key) => (
            <Item
              key={key}
              isLast={key === list.items.length - 1}
              {...{ item }}
            />
          ))}
        </View>
      </Animated.View>
    </>
  );
};

export default List;
