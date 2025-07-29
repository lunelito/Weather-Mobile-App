import { StatusBar } from "expo-status-bar";
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import SearchContainer from "./components/SearchFindPlaces/SearchContainer";
import AllWeatherLocationContainer from "./components/MemoryWeatherPlaceContainer/AllWeatherLocationContainer";
import { SavedWeatherLocationsProvider } from "./data/SavedWeatherLocationsContext";
import { DeviceDataProvider } from "./data/DeviceDataContext";
import MainPage from "./components/MainPage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SinglePlaceDetailSearch from "./components/SearchFindPlaces/SinglePlaceDetailSearch";
import SinglePlaceDetailMemory from "./components/MemoryWeatherPlaceContainer/SinglePlaceDetailMemory";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView style={{ flex: 1 }}>
        {/* contexts */}
        <SavedWeatherLocationsProvider>
          <DeviceDataProvider>
            {/* APP STARTS HERE */}
            <NavigationContainer>
              <Stack.Navigator initialRouteName="MainPage">
                <Stack.Screen
                  component={MainPage}
                  name="MainPage"
                  options={{
                    headerShown: false,
                    contentStyle: { backgroundColor: "white" },
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
                    contentStyle: { backgroundColor: "white" }
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </DeviceDataProvider>
        </SavedWeatherLocationsProvider>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
