import type { ReactElement } from "react";
import React from "react";
import { ScrollView } from "react-native";

interface SortableListProps {
  children: ReactElement[];
  item: { width: number; height: number };
}

export const SortableList = ({ children }: SortableListProps) => {
  return <ScrollView>{children}</ScrollView>;
};
