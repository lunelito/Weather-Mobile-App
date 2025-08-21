import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ComponentLevel from "./ComponentLevel";
import { useSettingsDataContext } from "../../../data/SettingsContext";

export default function SkeletonLoader() {
  const { themeColors } = useSettingsDataContext();
  const components = {
    co: 203.609,
    no: 0.0,
    no2: 0.396,
    o3: 75.102,
    so2: 0.648,
    pm2_5: 23.253,
    pm10: 92.214,
    nh3: 0.117,
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={[
            styles.aqiText,
            styles.laodingSquare,
            { backgroundColor: themeColors.SkeletonLoaderText },
            styles.text,
          ]}
        >
          ................
        </Text>
      </View>
      <View style={styles.components}>
        {[
          { key: "co", label: "Carbon monoxide" },
          { key: "no", label: "Nitric oxide" },
          { key: "no2", label: "Nitrogen dioxide" },
          { key: "o3", label: "Ozone" },
          { key: "so2", label: "Sulfur dioxide" },
          { key: "pm2_5", label: "Particulate Matter" },
          { key: "pm10", label: "Particulate Matter" },
          { key: "nh3", label: "Ammonia" },
        ].map(({ key, label }) => (
          <ComponentLevel
            key={key}
            value={components[key]}
            component={key}
            style={[
              styles.laodingSquare,
              styles.text,
              { backgroundColor: themeColors.SkeletonLoaderText },
            ]}
          >
            {label + ` (${key.toUpperCase()})`}
          </ComponentLevel>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    height: "20%",
    justifyContent: "center",
  },
  aqiText: {
    textAlign: "center",
    fontWeight: "700",
    letterSpacing: 2,
  },
  laodingSquare: {
    borderRadius: 5,
    margin: 1,
    height: 20,
  },
  text: {
    color: "transparent",
  },
  components: {
    gap: 5,
  },
});
