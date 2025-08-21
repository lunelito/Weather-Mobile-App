import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useSettingsDataContext } from "../../data/SettingsContext";

export default function Setting({ title, children }) {
  const {themeColors} = useSettingsDataContext()

  return (
    <View style={styles.container}>
      <Text style={[styles.title,{color: themeColors.textColor}]}>{title}</Text>
      <View style={styles.contentContainer}>{children}</View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
    margin: 20,
    height: 150,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
  },
  contentContainer: {
    height: "100%",
  },
});
