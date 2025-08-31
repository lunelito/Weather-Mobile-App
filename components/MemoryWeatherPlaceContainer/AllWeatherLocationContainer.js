import { ScrollView, StyleSheet, Text, View } from "react-native";
import SingleWeatherCard from "./SingleWeatherCard";
import { useSavedWeatherLocations } from "../../data/SavedWeatherLocationsContext";
import { useUserLocation } from "../../data/UserLocationWeather";
import UserLocationCard from "../UserLocationContainers/UserLocationCard";
import LottiLoader from "../UI/LottiLoader";

export default function AllWeatherLocationContainer() {
  const { weatherLocations } = useSavedWeatherLocations();
  const { userLocation } = useUserLocation();

  const isLoading =
    !userLocation && (!weatherLocations || weatherLocations.length === 0);

  if (isLoading) {
    return (
      <View style={styles.contentContainer}>
        <LottiLoader speed={0.05} />
      </View>
    );
  }

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
            <SingleWeatherCard item={item} index={index} key={index} />
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
    justifyContent: "center",
  },
});
