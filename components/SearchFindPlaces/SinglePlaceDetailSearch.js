import { useLayoutEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useSavedWeatherLocations } from "../../data/SavedWeatherLocationsContext";
import SinglePlaceDataContainer from "../DataContainers/SinglePlaceDataContainer";
import Button from "../UI/Button";
import { useSettingsDataContext } from "../../data/SettingsContext";
import IconButton from "../UI/IconButton";

export default function SinglePlaceDetailSearch({ route, navigation }) {
  const { data } = route.params;

  const { themeColors } = useSettingsDataContext();

  const { weatherLocations, setWeatherLocations } = useSavedWeatherLocations();

  const AddNewWeatherLocation = () => {
    setWeatherLocations([...weatherLocations, data]);
  };

  return (
    <View style={{ flex: 1 }}>
      <SinglePlaceDataContainer
        data={data}
        moreContentS={
          <IconButton
            color={themeColors.textColor}
            icon="add"
            size={28}
            onPress={() => [AddNewWeatherLocation(), navigation.goBack()]}
          />
        }
      />
    </View>
  );
}
