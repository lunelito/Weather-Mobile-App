import React from "react";
import { View, Text, StyleSheet } from "react-native";
import WeatherIcon from "../UI/WeatherIcon";

export default function SkeletonLoader() {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.laodingSquare}>
          <Text style={[styles.text, { fontSize: 24 }]}>-----</Text>
        </View>
        <View style={styles.laodingSquare}>
          <Text style={[styles.text, { fontSize: 14 }]}>-------</Text>
        </View>
      </View>
      <View style={styles.textContainer}>
        <View style={styles.lodaingCirle}></View>
        <View style={styles.laodingSquare}>
          <Text style={[styles.text, { fontSize: 14 }]}>---</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: 70,
    marginRight: 8,
    justifyContent: "center",
    gap: 20,
    alignItems: "center",
  },
  textContainer: {
    alignItems: "center",
    gap: 15,
  },
  text: {
    color: "transparent",
  },
  lodaingCirle: {
    height: 68,
    width:68,
    backgroundColor: "#4d4d4d",
    borderRadius: 100,
  },
  laodingSquare: {
    backgroundColor: "#4d4d4d",
  },
});
