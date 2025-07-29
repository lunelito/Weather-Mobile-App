import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import SearchContainer from "./SearchFindPlaces/SearchContainer";
import AllWeatherLocationContainer from "./MemoryWeatherPlaceContainer/AllWeatherLocationContainer";
import SearchList from "./SearchFindPlaces/SearchList";

export default function MainPage() {
  useFocusEffect(
    useCallback(() => {
      const timeout = setTimeout(() => {
        Keyboard.dismiss();
        console.log("tutaj");
      }, 100);
      return () => clearTimeout(timeout);
    }, [])
  );

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  return (
      <View style={styles.container}>
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
                <Text>szukaj czegos</Text>
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
