import React, { useLayoutEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker, UrlTile, PROVIDER_GOOGLE } from "react-native-maps";
import { useSettingsDataContext } from "../../data/SettingsContext";
import IconButton from "../UI/IconButton";
import ListOfLayers from "./ListOfLayers";

const { width, height } = Dimensions.get("window");

export default function WeatherMap({ route, navigation,name }) {
  const data = route.params.data;
  const { lat, lon } = data;

  const { themeColors } = useSettingsDataContext();
  const API_KEY = "4b697ed7a09995dacb97f44eb9978af3";
  const [op, setOp] = useState("pressure_new");

  const darkMapStyle = [
    {
      elementType: "geometry",
      stylers: [{ color: themeColors.backgroundColor }],
    },
    {
      elementType: "labels.text.fill",
      stylers: [{ color: themeColors.textColor }],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [{ color: themeColors.backgroundColor }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: themeColors.secondaryBackgroundColor }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: themeColors.SkeletonLoaderContainer }],
    },
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "map",
      headerStyle: { backgroundColor: themeColors.backgroundColor },
      contentStyle: { backgroundColor: themeColors.secondaryBackgroundColor },
      headerTintColor: themeColors.textColor,
      headerLeft: () => (
        <IconButton
          size={24}
          icon={"arrow-back"}
          color={themeColors.textColor}
          onPress={() => navigation.goBack()}
        />
      ),
    });
  }, [navigation, themeColors]);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: lat,
          longitude: lon,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        customMapStyle={darkMapStyle}
        maxZoomLevel={10}
       
      >
        <Marker
          coordinate={{ latitude: lat, longitude: lon }}
          title="Tu jesteś"
        />

        <UrlTile
          key={op}
          urlTemplate={`https://tile.openweathermap.org/map/${op}/{z}/{x}/{y}.png?appid=${API_KEY}`}
          maximumZ={19}
          flipY={false}
        />
      </MapView>

      {/* nakładka UI - lista warstw */}
      <View style={styles.overlay}>
        <ListOfLayers onSelectLayer={setOp} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width, height },
  overlay: {
    position: "absolute",
    top: 20,
    left: 10,
    zIndex: 1000,
  },
});
