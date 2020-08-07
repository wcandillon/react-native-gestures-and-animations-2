import React, { ReactElement } from "react";
import { ScrollView } from "react-native";
import { useSharedValue } from "react-native-reanimated";

import SortableItem from "./SortableItem";

interface SortableListProps {
  children: ReactElement[];
  item: { width: number; height: number };
}

const SortableList = ({
  children,
  item: { height, width },
}: SortableListProps) => {
  const offsets = children.map((_, index) => ({
    // eslint-disable-next-line react-hooks/rules-of-hooks
    y: useSharedValue(index * height),
  }));
  return (
    <ScrollView contentContainerStyle={{ height: height * children.length }}>
      {children.map((child, index) => (
        <SortableItem
          key={index}
          {...{ offsets, index, item: { height, width } }}
        >
          {child}
        </SortableItem>
      ))}
    </ScrollView>
  );
};

export default SortableList;
