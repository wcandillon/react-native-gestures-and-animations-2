import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import { Cards, Card } from "../components";
import { CARD_HEIGHT } from "../components/Card";

import SortableList from "./SortableList";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  card: {
    height: CARD_HEIGHT,
    width: "100%",
    alignItems: "center",
    marginTop: 32,
  },
});
const cards = [Cards.Card1, Cards.Card2, Cards.Card3];

const DragToSort = () => {
  return (
    <SortableList item={{ width, height: CARD_HEIGHT + 32 }}>
      {cards.map((card, index) => (
        <View style={styles.card} key={index}>
          <Card card={card} />
        </View>
      ))}
    </SortableList>
  );
};

export default DragToSort;
