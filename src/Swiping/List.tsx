import React from "react";
import { FlatList, FlatListProps, View } from "react-native";
import Animated from "react-native-reanimated";

const AnimatedList = Animated.createAnimatedComponent<FlatListProps<Item>>(
  FlatList
);

interface Item {
  name: string;
}

interface ListProps {
  items: Item[];
}

const List = ({ items }: ListProps) => {
  return <AnimatedList data={items} renderItem={renderItem} />;
};

export default List;

const renderItem = (_: { item: Item }) => <View />;
