import React from "react";
import useFetch from "../../../hooks/useFetch";
import { useState } from "react";
import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SkeletonLoader from "./SkeletonLoader";
import ComponentLevel from "./ComponentLevel";

export default function AirPolution({ data }) {
  const { lat, lon } = data;

  const {
    data: AirPolutionData,
    isPending,
    error,
  } = useFetch(
    `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=4b697ed7a09995dacb97f44eb9978af3`
  );
  const AQI_LEVELS = {
    1: { label: "Excellent", color: "green" },
    2: { label: "Fair", color: "lightgreen" },
    3: { label: "Moderate", color: "yellow" },
    4: { label: "Unhealthy", color: "orange" },
    5: { label: "Very Unhealthy", color: "red" },
  };

  const currentAQI =
    AirPolutionData && AQI_LEVELS[AirPolutionData.list[0].main.aqi];

  if (error) {
    return (
      <View>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <>
      {isPending ? (
        <SkeletonLoader />
      ) : (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={[styles.aqiText, { color: currentAQI.color }]}>
              {currentAQI.label} air condition
            </Text>
          </View>
          {AirPolutionData && (
            <View style={styles.infos}>
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
                  value={AirPolutionData.list[0]?.components[key]}
                  component={key}
                >
                  {label + ` (${key.toUpperCase()})`}
                </ComponentLevel>
              ))}
            </View>
          )}
        </View>
      )}
    </>
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
    alignItems:"center",
  },
  aqiText: {
    textAlign: "center",
    fontWeight: "700",
    paddingVertical: "auto",
  },
  infos:{
    height: "80%",
    gap:5
  }
});
