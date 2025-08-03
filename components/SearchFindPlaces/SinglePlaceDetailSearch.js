import { useLayoutEffect, useEffect } from "react";
import { Button, View } from "react-native";
import { useSavedWeatherLocations } from "../../data/SavedWeatherLocationsContext";
import SinglePlaceDataContainer from "../DataContainers/SinglePlaceDataContainer";

export default function SinglePlaceDetailSearch({ route, navigation }) {
  const { data } = route.params;

  const { weatherLocations, setWeatherLocations } = useSavedWeatherLocations();

  const AddNewWeatherLocation = () => {
    setWeatherLocations([...weatherLocations, data]);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          title="Anuluj"
          color={"#ffffff"}
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: () => (
        <Button
          title="Dodaj"
          color={"#ffffff"}
          onPress={() => {
            AddNewWeatherLocation();
            navigation.goBack();
          }}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <SinglePlaceDataContainer data={data} />
    </View>
  );
}
