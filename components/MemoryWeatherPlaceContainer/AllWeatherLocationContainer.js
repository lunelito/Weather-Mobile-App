import { ScrollView, StyleSheet, Text, View } from "react-native";
import SingleWeatherCard from "./SingleWeatherCard";
import { useSavedWeatherLocations } from "../../data/SavedWeatherLocationsContext";
import { useUserLocation } from "../../data/UserLocationWeather";
import UserLocationCard from "../UserLocationContainers/UserLocationCard";

export default function AllWeatherLocationContainer() {
  const { weatherLocations } = useSavedWeatherLocations();
  const { userLocation } = useUserLocation();

  return (
    <>
      <ScrollView>
        <View style={styles.contentContainer}>
          <View>
            {userLocation && (
              <UserLocationCard item={userLocation} index={"loc"} />
            )}
          </View>
          {weatherLocations.map((item, index) => (
            <SingleWeatherCard item={item} index={index} />
          ))}
        </View>
      </ScrollView>
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
