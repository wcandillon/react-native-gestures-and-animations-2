import { useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import Animated, { FadeInUp, FadeOutUp, Layout } from "react-native-reanimated";

import { Chevron } from "./Chevron";
import { ListItem } from "./ListItem";

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

export const List = ({ list }: ListProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setOpen((o) => !o)}>
        <Animated.View layout={Layout} style={styles.container}>
          <Text style={styles.title}>Total Points</Text>
          <Chevron open={open} />
        </Animated.View>
      </TouchableWithoutFeedback>
      {open && (
        <Animated.View
          style={styles.items}
          entering={FadeInUp}
          exiting={FadeOutUp}
          layout={Layout}
        >
          <View collapsable={false}>
            {list.items.map((item, key) => (
              <ListItem
                key={key}
                isLast={key === list.items.length - 1}
                {...{ item }}
              />
            ))}
          </View>
        </Animated.View>
      )}
    </>
  );
};
