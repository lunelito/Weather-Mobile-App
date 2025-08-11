import { View, Text, StyleSheet } from "react-native";

export default function ComponentLevel({ component, value, children }) {
  const COMPONENT_LEVELS = {
    pm2_5: [
      { max: 10, label: "Very Good", color: "green" },
      { max: 20, label: "Good", color: "lightgreen" },
      { max: 25, label: "Moderate", color: "yellow" },
      { max: 50, label: "Poor", color: "orange" },
      { max: Infinity, label: "Very Poor", color: "red" },
    ],
    pm10: [
      { max: 20, label: "Very Good", color: "green" },
      { max: 35, label: "Good", color: "lightgreen" },
      { max: 50, label: "Moderate", color: "yellow" },
      { max: 100, label: "Poor", color: "orange" },
      { max: Infinity, label: "Very Poor", color: "red" },
    ],
    o3: [
      { max: 60, label: "Very Good", color: "green" },
      { max: 100, label: "Good", color: "lightgreen" },
      { max: 120, label: "Moderate", color: "yellow" },
      { max: 180, label: "Poor", color: "orange" },
      { max: Infinity, label: "Very Poor", color: "red" },
    ],
    no2: [
      { max: 40, label: "Very Good", color: "green" },
      { max: 90, label: "Good", color: "lightgreen" },
      { max: 120, label: "Moderate", color: "yellow" },
      { max: 200, label: "Poor", color: "orange" },
      { max: Infinity, label: "Very Poor", color: "red" },
    ],
    so2: [
      { max: 20, label: "Very Good", color: "green" },
      { max: 80, label: "Good", color: "lightgreen" },
      { max: 250, label: "Moderate", color: "yellow" },
      { max: 350, label: "Poor", color: "orange" },
      { max: Infinity, label: "Very Poor", color: "red" },
    ],
    co: [
      { max: 4400, label: "Very Good", color: "green" },
      { max: 9400, label: "Good", color: "lightgreen" },
      { max: 12400, label: "Moderate", color: "yellow" },
      { max: 15400, label: "Poor", color: "orange" },
      { max: Infinity, label: "Very Poor", color: "red" },
    ],
    nh3: [
      { max: 200, label: "Very Good", color: "green" },
      { max: 400, label: "Good", color: "lightgreen" },
      { max: 800, label: "Moderate", color: "yellow" },
      { max: 1200, label: "Poor", color: "orange" },
      { max: Infinity, label: "Very Poor", color: "red" },
    ],
  };
  const getComponentLevel = (component, value) => {
    const levels = COMPONENT_LEVELS[component];
    if (!levels || value == null) {
      return { label: "Unknown", color: "grey" };
    }
    return levels.find((level) => value <= level.max);
  };

  const level = getComponentLevel(component, value);

  return (
    <View style={styles.container}>
      <Text style={[styles.level, { color: level.color }]}>{children}</Text>
      <Text style={[styles.level, { color: level.color }]}>{value} μg/m³</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  level: {
    fontSize: 14,
  },
});
