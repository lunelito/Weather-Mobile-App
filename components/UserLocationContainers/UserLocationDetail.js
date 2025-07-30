import { useLayoutEffect } from "react";
import { Button, View } from "react-native";
import SinglePlaceDataContainer from "../DataContainers/SinglePlaceDataContainer";
import { useUserLocation } from "../../data/UserLocationWeather";

export default function UserLocationDetail({ route, navigation }) {
  const { data } = route.params;

  const { setUserLocation } = useUserLocation();

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
    });
  }, [navigation]);

  const deleteFromStorage = () => {
    navigation.goBack();
    setUserLocation(null);
  };

  return (
    <View>
      <SinglePlaceDataContainer data={data} />
      <Button title="delete from memory" onPress={deleteFromStorage} />
    </View>
  );
}
