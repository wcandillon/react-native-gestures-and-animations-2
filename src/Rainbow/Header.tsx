import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { round } from "react-native-redash";

import ETH from "./components/ETH";
import { SIZE } from "./Model";

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  values: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  value: {
    fontWeight: "500",
    fontSize: 24,
  },
  label: {
    fontSize: 18,
  },
});

interface HeaderProps {
  data: {
    minPrice: number;
    maxPrice: number;
    percentChange: number;
    label: string;
  };
}

const Header = ({ data }: HeaderProps) => {
  const price = `$ ${round(data.maxPrice, 2).toLocaleString("en-US", {
    currency: "USD",
  })}`;
  const percentChange = `${round(data.percentChange, 3)}%`;
  const { label } = data;
  const style = {
    fontWeight: "500",
    fontSize: 24,
    color: data.percentChange > 0 ? "green" : "red",
  } as const;
  return (
    <View style={styles.container}>
      <ETH />
      <View style={styles.values}>
        <View>
          <Text style={styles.value}>{price}</Text>
          <Text style={styles.label}>Etherum</Text>
        </View>
        <View>
          <Text style={style}>{percentChange}</Text>
          <Text style={styles.label}>{label}</Text>
        </View>
      </View>
    </View>
  );
};

export default Header;
