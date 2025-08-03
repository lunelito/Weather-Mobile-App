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
      <SinglePlaceDataContainer data={data} deleteFromStorage={deleteFromStorage}/>
    </View>
  );
}
