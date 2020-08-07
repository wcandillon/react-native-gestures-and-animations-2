import React, { ReactElement } from "react";
import { ScrollView, View } from "react-native";

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
    y: index * height,
  }));
  return (
    <ScrollView>
      {children.map((child, index) => (
        <SortableItem
          key={index}
          {...{ offsets, index, item: { height, width } }}
        >
          {child}
        </SortableItem>
      ))}
      <View style={{ height: height * children.length }} />
    </ScrollView>
  );
};

export default SortableList;
