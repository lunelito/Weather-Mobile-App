import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import RadioButton from "../../UI/RadioButton";
import { useSettingsDataContext } from "../../../data/SettingsContext";

export default function ThemeContainer() {
  const {theme,setTheme} = useSettingsDataContext()
  return (
    <View style={styles.container}>
      <RadioButton
        label="dark"
        selected={"dark" === theme}
        onPress={() => setTheme("dark")}
      />
      <RadioButton
        label="auto"
        selected={"auto" === theme}
        onPress={() => setTheme("auto")}
      />
      <RadioButton
        label="light"
        selected={"light" === theme}
        onPress={() => setTheme("light")}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent:"center"
  },
});
