import React, { ReactElement } from "react";
import { ScrollView } from "react-native";

interface SortableListProps {
  children: ReactElement[];
  item: { width: number; height: number };
}

const SortableList = ({ children }: SortableListProps) => {
  return <ScrollView>{children}</ScrollView>;
};

export default SortableList;
