import { useLayoutEffect } from "react";
import {  View } from "react-native";
import SinglePlaceDataContainer from "../DataContainers/SinglePlaceDataContainer";
import { useUserLocation } from "../../data/UserLocationWeather";
import { useSettingsDataContext } from "../../data/SettingsContext";
import Button from "../UI/Button";

export default function UserLocationDetail({ route, navigation }) {
  const { data } = route.params;

  const { setUserLocation } = useUserLocation();

  const {themeColors} = useSettingsDataContext()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          title="Anuluj"
          color={"white"}
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
    });
  }, [navigation]);

  const deleteFromStorage = () => {
    navigation.goBack();
    setUserLocation(null);
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
