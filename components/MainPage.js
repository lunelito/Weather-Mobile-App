import { Button, Keyboard, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import SearchContainer from "./SearchFindPlaces/SearchContainer";
import AllWeatherLocationContainer from "./MemoryWeatherPlaceContainer/AllWeatherLocationContainer";
import SearchList from "./SearchFindPlaces/SearchList";
import { useUserLocation } from "../data/UserLocationWeather";
import { useSettingsDataContext } from "../data/SettingsContext";
export default function MainPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const { getUserLocation, userLocation } = useUserLocation();
  const { themeColors } = useSettingsDataContext();

  useFocusEffect(
    useCallback(() => {
      const timeout = setTimeout(() => {
        Keyboard.dismiss();
      }, 100);
      return () => clearTimeout(timeout);
    }, [])
  );

  console.log(themeColors.backgroundColor)

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeColors.backgroundColor },
      ]}
    >
      <View style={styles.searchContainer}>
        <SearchContainer
          query={query}
          setQuery={setQuery}
          isFocused={isFocused}
          setIsFocused={setIsFocused}
        />
      </View>
      <View style={styles.allWeatherLocationContainer}>
        {isFocused ? (
          query.length > 0 ? (
            <SearchList
              query={query}
              setQuery={setQuery}
              selected={selected}
              setSelected={setSelected}
              setIsFocused={setIsFocused}
            />
          ) : (
            <View style={styles.infoContainer}>
              {!userLocation && (
                <Button
                  title="grant permission"
                  onPress={() => {
                    getUserLocation();
                    setIsFocused(false);
                    setQuery("");
                    Keyboard.dismiss();
                  }}
                />
              )}
            </View>
          )
        ) : (
          <AllWeatherLocationContainer />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flex: 1,
  },
  allWeatherLocationContainer: {
    flex: 9,
  },
  infoContainer: {
    flex: 1,
    alignItems: "center",
  },
});
