import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  FlatList,
  Pressable,
  View,
  ActivityIndicator,
} from "react-native";
import useFetch from "../../hooks/useFetch";
import { useState, useEffect } from "react";
import { useSavedWeatherLocations } from "../../data/SavedWeatherLocationsContext";
import { useSettingsDataContext } from "../../data/SettingsContext";

export default function SearchList({
  query,
  setQuery,
  setSelected,
  setIsFocused,
}) {
  const navigation = useNavigation();

  const [debouncedQuery, setDebouncedQuery] = useState(query);

  const { weatherLocations } = useSavedWeatherLocations();

  const { themeColors } = useSettingsDataContext();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  const { data, isPending, error } = useFetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${debouncedQuery}&limit=20&appid=4b697ed7a09995dacb97f44eb9978af3`
  );

  // remake this later shit code doesnt work well or api make duplicat

  const uniqueData = data
    ? data.filter((city) => {
        const cityName = city.name ? city.name.toLowerCase() : "";
        const cityCountry = city.country ? city.country.toLowerCase() : "";

        return !weatherLocations.some((saved) => {
          const savedName = saved.name ? saved.name.toLowerCase() : "";
          const savedCountry = saved.country ? saved.country.toLowerCase() : "";
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

  return isPending ? (
    <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
  ) : error ? (
    <View style={styles.messageContainer}>
      <Text style={styles.errorText}>{error}</Text>
    </View>
  ) : !data || data.length === 0 ? (
    <View style={styles.messageContainer}>
      <Text style={styles.emptyText}>Brak wyników.</Text>
    </View>
  ) : (
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
          <Text style={[styles.cityText,{color:themeColors.textColor}]}>
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
