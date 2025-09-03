import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useDeviceDataContext } from "../../data/DeviceDataContext";
import { useSettingsDataContext } from "../../data/SettingsContext";
import IconButton from "../UI/IconButton";
import SingleLayer from "./SingleLayer";

export default function ListOfLayers({ onSelectLayer }) {
  const { screenWidth, screenHeight } = useDeviceDataContext();
  const { themeColors } = useSettingsDataContext();

  // lista dostępnych overlayów
  const layers = [
    { icon: "clouds", type: "clouds_new" },
    { icon: "temp", type: "temp_new" },
    { icon: "precipitation", type: "precipitation_new" },
    { icon: "pressure", type: "pressure_new" },
    { icon: "wind", type: "wind_new" },
  ];

  return (
    <ScrollView
      style={[
        styles.container,
        {
          width: screenWidth * 0.2,
          height: screenHeight * 0.25,
          backgroundColor: themeColors.backgroundColor,
        },
      ]}
    >
      {layers.map((layer, index) => (
        <SingleLayer
          key={index}
          type={layer.type}
          onPress={() => onSelectLayer(layer.type)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 10,
  },
});
