import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import RadioButton from "../../UI/RadioButton";
import { useSettingsDataContext } from "../../../data/SettingsContext";

export default function UnitsContainer() {
  const { units, SetUnits } = useSettingsDataContext();

  return (
    <View style={styles.container}>
      <RadioButton
        label="Celsius (°C)"
        selected={units === "metric"}
        onPress={() => SetUnits("metric")}
      />
      <RadioButton
        label="Fahrenheit (°F)"
        selected={units === "imperial"}
        onPress={() => SetUnits("imperial")}
      />
      <RadioButton
        label="Kelvin (°K)"
        selected={units === "standard"}
        onPress={() => SetUnits("standard")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
});
