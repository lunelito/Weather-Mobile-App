import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Platform,
  StatusBar as RNStatusBar,
} from "react-native";
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
import SettingsContainer from "./components/SettingsContainers/SettingsContainer";
import {
  SettingsProvider,
  useSettingsDataContext,
} from "./data/SettingsContext";

const Stack = createNativeStackNavigator();

function AppContent() {
  const { themeColors, theme } = useSettingsDataContext();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
        backgroundColor: themeColors.backgroundColor,
      }}
    >
        <StatusBar style={theme === "light" ? "dark" : "light"} />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="MainPage">
            <Stack.Screen
              component={MainPage}
              name="MainPage"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              component={SinglePlaceDetailSearch}
              name="SinglePlaceDetailSearch"
              options={{ presentation: "modal" }}
            />
            <Stack.Screen
              component={SinglePlaceDetailMemory}
              name="SinglePlaceDetailMemory"
              options={{
                presentation: "fullScreenModal",
                headerTransparent: true,
              }}
            />
            <Stack.Screen
              component={UserLocationDetail}
              name="UserLocationDetail"
              options={{ presentation: "fullScreenModal" }}
            />
            <Stack.Screen
              component={DetailForcastList}
              name="DetailForcastList"
              options={{ presentation: "modal" }}
            />
            <Stack.Screen
              component={SettingsContainer}
              name="SettingsContainer"
              options={{ presentation: "fullScreenModal" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SavedWeatherLocationsProvider>
      <SettingsProvider>
        <UserLocationProvider>
          <DeviceDataProvider>
            <AppContent />
          </DeviceDataProvider>
        </UserLocationProvider>
      </SettingsProvider>
    </SavedWeatherLocationsProvider>
  );
}
