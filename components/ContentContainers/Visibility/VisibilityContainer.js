import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import GradientCircle from "../../UI/GradientCircle";

export default function VisibilityContainer({ data }) {
  const visibilityMax = Number((data.visibility / 1000).toFixed(2));
  const [v, setV] = useState(0);

  useEffect(() => {
    let interval = null;

    if (v < visibilityMax) {
      interval = setInterval(() => {
        setV((prev) => {
          if (prev < visibilityMax) return Number((prev + 0.1).toFixed(2));
          clearInterval(interval);
          return prev;
        });
      }, 0.1);
    }

    return () => clearInterval(interval);
  }, [v, visibilityMax]);
  
  return (
    <View style={styles.container}>
      <View style={styles.Circle}>
        <GradientCircle />
      </View>
      <View style={styles.dataCircle}>
        <Text style={{ color: "white", fontSize: 16 }}>{v}km</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  Circle: {
    height: 80,
    width: 80,
    left: -20,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  WhiteCircle: {
    backgroundColor: "#ffffff",
    height: 60,
    width: 60,
    borderRadius: 100,
  },
  dataCircle: {
    backgroundColor: "rgba(0,0,0,0.9)",
    height: 80,
    width: 80,
    position: "absolute",
    borderRadius: 100,
    right: -5,
    justifyContent: "center",
    alignItems: "center",
  },
});
