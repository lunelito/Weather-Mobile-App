import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSettingsDataContext } from "../../../data/SettingsContext";

export default function PressureContainer({ data }) {
  let Pressure = 0;
  const [P, setP] = useState(0);

  if (data?.hourly) {
    const now = new Date();
    const isoHour = now.toISOString().slice(0, 13); 

    const index = data.hourly.time.findIndex((t) => t.startsWith(isoHour));
    if (index !== -1) {
      Pressure = data.hourly.surface_pressure[index];
    }
  }

  const { themeColors } = useSettingsDataContext();

  useEffect(() => {
    let interval = null;
    
    if (P < Pressure) {
      interval = setInterval(() => {
        setP((prev) => {
          if (prev < Pressure) return prev + 10;
          clearInterval(interval);
          return prev;
        });
      }, 3);
    }

    return () => clearInterval(interval);
  }, [P, Pressure]);

  const minPressure = 950;
  const maxPressure = 1050;
  const normalPressure = 1013;

  const size = 110;       
  const radius = size / 2 - 10;
  const center = size / 2;

  const range = maxPressure - minPressure;
  const clampedPressure = Math.max(Math.min(Pressure, maxPressure), minPressure);
  const offset = clampedPressure - normalPressure;

  const angle = -90 + (offset / (range / 2)) * 90;
  const rad = (angle * Math.PI) / 180;

  const dotSize = 14; 
  const dotX = center + radius * Math.cos(rad) - dotSize / 2 - 7;
  const dotY = center + radius * Math.sin(rad) - dotSize / 2 - 7;

  const color = offset > 0 ? "#c40404" : "#4b8dca";

  return (
    <View style={styles.container}>
      <View style={[styles.circle, { borderColor: themeColors.textColor }]}>
        <View
          style={[
            styles.dot,
            { left: dotX, top: dotY, backgroundColor: color },
          ]}
        />
        <Text style={[styles.text, { color: themeColors.textColor }]}>{P} hPa</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    borderWidth: 2,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    width: 110,
    height: 110,
    borderRadius: 55, // połowa szerokości i wysokości
  },
  dot: {
    position: "absolute",
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    position: "absolute",
  },
});
