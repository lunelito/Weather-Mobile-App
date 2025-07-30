import { FlatList, StyleSheet, Text, View } from "react-native";
import SingleWeatherCard from "./SingleWeatherCard";
import { useSavedWeatherLocations } from "../../data/SavedWeatherLocationsContext";
import { useUserLocation } from "../../data/UserLocationWeather";
import UserLocationCard from "../UserLocationContainers/UserLocationCard";

export default function AllWeatherLocationContainer() {
  const { weatherLocations } = useSavedWeatherLocations();
  const { userLocation } = useUserLocation();

  return (
    <>
      <View style={styles.contentContainer}>
        {userLocation && <UserLocationCard item={userLocation} index={"loc"} />}
      </View>
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={weatherLocations}
        renderItem={({ item, index }) => (
          <SingleWeatherCard item={item} index={index} />
        )}
        keyExtractor={(item, index) => index}
      />
    </>
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
