import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSettingsDataContext } from "../../../data/SettingsContext";

export default function PressureContainer({ data }) {
  const Pressure = data.main.pressure;
  const [P, setP] = useState(0);

  const { themeColors } = useSettingsDataContext();

  useEffect(() => {
    let interval = null;

    if (P < Pressure) {
      interval = setInterval(() => {
        setP((prev) => {
          if (prev < Pressure) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 30);
    }
    return () => clearInterval();
  }, [P, Pressure]);

  const minPressure = 980;
  const maxPressure = 1050;
  const normalPressure = 1013;

  const size = 120;
  const radius = size / 2 - 10;
  const center = size / 2;

  const range = maxPressure - minPressure;
  const clampedPressure = Math.max(
    Math.min(Pressure, maxPressure),
    minPressure
  );

  const offset = clampedPressure - normalPressure;

  const angle = -90 + (offset / (range / 2)) * 90;
  const rad = (angle * Math.PI) / 180;

  const dotX = center + radius * Math.cos(rad) - 9;
  const dotY = center + radius * Math.sin(rad) - 16;

  const color = offset > 0 ? "#c40404" : "#4b8dca";

  return (
    <View style={styles.container}>
      <View style={[styles.circle, {borderColor:themeColors.textColor}]}>
        <View
          style={[
            styles.dot,
            { left: dotX, top: dotY, backgroundColor: color },
          ]}
        />
        <Text style={[styles.text, {color:themeColors.textColor}]}>{P} hPa</Text>
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
    width: "110",
    height: "110",
    borderRadius: 100,
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
