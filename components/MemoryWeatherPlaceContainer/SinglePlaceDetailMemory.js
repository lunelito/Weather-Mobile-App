import { useLayoutEffect, useEffect } from "react";
import { Button, Keyboard, Text, View } from "react-native";
import { useSavedWeatherLocations } from "../../data/SavedWeatherLocationsContext";
import SinglePlaceDataContainer from "../DataContainers/SinglePlaceDataContainer";

export default function SinglePlaceDetailMemory({ route, navigation }) {
  const { data } = route.params;

  const { weatherLocations, setWeatherLocations } = useSavedWeatherLocations();

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
      )
    });
  }, [navigation]);

  const deleteFromStorage = () => {
    const filteredWeatherLocations = weatherLocations.filter(
      (el) => el.lat !== data.lat && el.lon !== data.lon
    );
    setWeatherLocations(filteredWeatherLocations);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <SinglePlaceDataContainer data={data} deleteFromStorage={deleteFromStorage}/>
    </View>
  );
}
