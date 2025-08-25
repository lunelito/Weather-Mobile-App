import { useLayoutEffect, useEffect } from "react";
import {Keyboard, Text, View } from "react-native";
import Button from "../UI/Button";
import { useSavedWeatherLocations } from "../../data/SavedWeatherLocationsContext";
import SinglePlaceDataContainer from "../DataContainers/SinglePlaceDataContainer";
import { useSettingsDataContext } from "../../data/SettingsContext";

export default function SinglePlaceDetailMemory({ route, navigation }) {
  const { data } = route.params;

  const { themeColors } = useSettingsDataContext();

  const { weatherLocations, setWeatherLocations } = useSavedWeatherLocations();

  const deleteFromStorage = () => {
    const filteredWeatherLocations = weatherLocations.filter(
      (el) => el.lat !== data.lat && el.lon !== data.lon
    );
    setWeatherLocations(filteredWeatherLocations);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <SinglePlaceDataContainer
        data={data}
        moreContentM={
          <View style={{ margin: 60 }}>
            <Button
              text={"Delete from memory"}
              backgroundColor={themeColors.containerColor}
              color={themeColors.textColor}
              onPress={deleteFromStorage}
            />
          </View>
        }
      />
    </View>
  );
}
