import { useState,useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function PressureContainer({ data }) {
  const Pressure = data.main.pressure;
  const [P, setP] = useState(0);

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

  // Ustawienia skali
  const minPressure = 980;
  const maxPressure = 1050;
  const normalPressure = 1013;

  const size = 120;
  const radius = size / 2 - 10;
  const center = size / 2;

  // Obliczenia
  const range = maxPressure - minPressure;
  const clampedPressure = Math.max(
    Math.min(Pressure, maxPressure),
    minPressure
  );

  const offset = clampedPressure - normalPressure;

  const angle = -90 + (offset / (range / 2)) * 90;
  const rad = (angle * Math.PI) / 180;

  const dotX = center + radius * Math.cos(rad) - 7;
  const dotY = center + radius * Math.sin(rad) - 14;

  const color = offset > 0 ? "#c40404" : "#4b8dca";

  return (
    <View style={styles.container}>
      <View style={[styles.circle]}>
        <View
          style={[
            styles.dot,
            { left: dotX, top: dotY, backgroundColor: color },
          ]}
        />
        <Text style={styles.text}>{P} hPa</Text>
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
    borderWidth: 4,
    borderColor: "white",
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
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    position: "absolute",
  },
});
