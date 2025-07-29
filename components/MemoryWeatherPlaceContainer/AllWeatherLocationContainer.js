import { FlatList, StyleSheet, Text, View } from "react-native";
import SingleWeatherCard from "./SingleWeatherCard";
import { useSavedWeatherLocations } from "../../data/SavedWeatherLocationsContext";

export default function AllWeatherLocationContainer() {
  const { weatherLocations } = useSavedWeatherLocations();
  console.log(weatherLocations);
  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={weatherLocations}
      renderItem={({ item }) => <SingleWeatherCard item={item} />}
      keyExtractor={(item) =>
        `${Math.floor(Math.abs(item.lat))}${Math.floor(Math.abs(item.lon))}`
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  contentContainer: {
    width: "100%",
    alignItems: "center",
  },
});
