import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  FlatList,
  Pressable,
  View,
  Keyboard,
} from "react-native";
import useFetch from "../../hooks/useFetch";
import { useState, useEffect } from "react";
import { useSavedWeatherLocations } from "../../data/SavedWeatherLocationsContext";
import { useSettingsDataContext } from "../../data/SettingsContext";
import LottiLoader from "../UI/LottiLoader";
import { useDeviceDataContext } from "../../data/DeviceDataContext";

export default function SearchList({
  query,
  setQuery,
  setSelected,
  setIsFocused,
}) {
  const navigation = useNavigation();

  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [screenHeightWithKeyboard, setScreenHeightWithKeyboard] = useState(0);

  const { weatherLocations } = useSavedWeatherLocations();
  const { themeColors } = useSettingsDataContext();
  const { screenHeight } = useDeviceDataContext();

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (e) => {
      setScreenHeightWithKeyboard(screenHeight - e.endCoordinates.height);
    });

    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      setScreenHeightWithKeyboard(screenHeight);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [screenHeight]);


  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(handler);
  }, [query]);

  const { data, isPending, error } = useFetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${debouncedQuery}&limit=20&appid=4b697ed7a09995dacb97f44eb9978af3`
  );

  const uniqueData = data
    ? data.filter((city) => {
        const cityName = city.name?.toLowerCase() || "";
        const cityCountry = city.country?.toLowerCase() || "";
        return !weatherLocations.some((saved) => {
          const savedName = saved.name?.toLowerCase() || "";
          const savedCountry = saved.country?.toLowerCase() || "";
          return savedName === cityName && savedCountry === cityCountry;
        });
      })
    : [];

  const handleSelect = (data) => {
    setSelected(data);
    setQuery("");
    setIsFocused(false);
    navigation.navigate("SinglePlaceDetailSearch", {
      data: { lat: data.lat, lon: data.lon },
    });
  };

  // 🟢 EARLY RETURNS 🔥
  if (isPending) {
    return <LottiLoader />;
  }

  if (error) {
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!data || data.length === 0) {
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.emptyText}>no results</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={uniqueData}
      keyExtractor={(item, index) => item.id?.toString() || item.name + index}
      keyboardShouldPersistTaps="handled"
      renderItem={({ item }) => (
        <Pressable
          onPress={() => handleSelect(item)}
          style={({ pressed }) => [
            styles.resultItem,
            {
              borderBottomColor: themeColors.textColor,
              backgroundColor: themeColors.backgroundColor,
            },
            pressed && {
              backgroundColor: themeColors.secondaryBackgroundColor,
            },
          ]}
        >
          <Text style={[styles.cityText, { color: themeColors.textColor }]}>
            {item.name}, {item.state}, {item.country}
          </Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  resultItem: {
    padding: 22,
    borderBottomWidth: 1,
  },
  messageContainer: {
    padding: 20,
    alignItems: "center",
  },
  errorText: {
    color: "red",
  },
  emptyText: {
    color: "#666",
  },
});
