import { View, TextInput, StyleSheet, Keyboard } from "react-native";
import IconButton from "../UI/IconButton";
import { useNavigation } from "@react-navigation/native";
import { useSettingsDataContext } from "../../data/SettingsContext";

export default function SearchContainer({
  query,
  setQuery,
  setIsFocused,
  isFocused,
}) {

  const navigation = useNavigation();

  const {themeColors} = useSettingsDataContext()

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {isFocused && (
          <View style={styles.iconContainer}>
            <IconButton
              color={themeColors.textColor}
              icon="arrow-back-outline"
              size={28}
              onPress={() => {
                setIsFocused(false);
                Keyboard.dismiss();
                setQuery("")
              }}
            />
          </View>
        )}
        <TextInput
          placeholderTextColor={"#A0A0A0"}
          keyboardAppearance="dark"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[styles.input,{color:themeColors.textColor,borderColor:themeColors.textColor}]}
          value={query}
          onChangeText={setQuery}
          placeholder="Chek your city weather..."
        />
        {!isFocused && (
          <View style={styles.iconContainer}>
            <IconButton
              color={themeColors.textColor}
              icon="settings"
              size={28}
              onPress={() => {
                navigation.navigate("SettingsContainer")
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    zIndex: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    marginBottom: 12,
  },
});
