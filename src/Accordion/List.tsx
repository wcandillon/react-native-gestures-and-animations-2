import React, { useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

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
  const [open, setOpen] = useState(false);
  const height = open ? LIST_ITEM_HEIGHT * list.items.length : 0;

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setOpen((prev) => !prev)}>
        <View style={[styles.container]}>
          <Text style={styles.title}>Total Points</Text>
          <Chevron {...{ open }} />
        </View>
      </TouchableWithoutFeedback>
      <View style={[styles.items, { height }]}>
        {list.items.map((item, key) => (
          <Item
            key={key}
            isLast={key === list.items.length - 1}
            {...{ item }}
          />
        ))}
      </View>
    </>
  );
};

export default List;
