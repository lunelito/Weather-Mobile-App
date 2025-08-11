import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { SavedWeatherLocationsProvider } from "./data/SavedWeatherLocationsContext";
import { DeviceDataProvider } from "./data/DeviceDataContext";
import { UserLocationProvider } from "./data/UserLocationWeather";

import SinglePlaceDetailSearch from "./components/SearchFindPlaces/SinglePlaceDetailSearch";
import SinglePlaceDetailMemory from "./components/MemoryWeatherPlaceContainer/SinglePlaceDetailMemory";
import UserLocationDetail from "./components/UserLocationContainers/UserLocationDetail";
import MainPage from "./components/MainPage";
import DetailForcastList from "./components/ContentContainers/HourlyForecast/DetailForcastList";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }}>
        {/* contexts */}
        <SavedWeatherLocationsProvider>
          <UserLocationProvider>
            <DeviceDataProvider>
              {/* APP STARTS HERE */}
              <NavigationContainer>
                <Stack.Navigator initialRouteName="MainPage">
                  <Stack.Screen
                    component={MainPage}
                    name="MainPage"
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    component={SinglePlaceDetailSearch}
                    name="SinglePlaceDetailSearch"
                    options={{
                      presentation: "modal",
                    }}
                  />
                  <Stack.Screen
                    component={SinglePlaceDetailMemory}
                    name="SinglePlaceDetailMemory"
                    options={{
                      presentation: "fullScreenModal",
                      headerTransparent: true
                    }}
                  />
                  <Stack.Screen
                    component={UserLocationDetail}
                    name="UserLocationDetail"
                    options={{
                      presentation: "fullScreenModal",
                    }}
                  />
                  <Stack.Screen
                    component={DetailForcastList}
                    name="DetailForcastList"
                    options={{
                      presentation: "modal",
                    }}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </DeviceDataProvider>
          </UserLocationProvider>
        </SavedWeatherLocationsProvider>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
});
