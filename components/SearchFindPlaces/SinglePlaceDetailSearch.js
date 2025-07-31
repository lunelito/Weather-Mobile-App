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
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: () => (
        <Button
          title="Dodaj"
          onPress={() => {
            AddNewWeatherLocation();
            navigation.goBack();
          }}
        />
      ),
    });
  }, [navigation]);

  return (
    <View>
      <SinglePlaceDataContainer data={data} />
    </View>
  );
}
