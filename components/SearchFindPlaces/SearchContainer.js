import { View, TextInput, StyleSheet, Keyboard } from "react-native";
import IconButton from "../UI/IconButton";

export default function SearchContainer({
  query,
  setQuery,
  setIsFocused,
  isFocused,
}) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {isFocused && (
          <View style={styles.iconContainer}>
            <IconButton
              color="white"
              icon="arrow-back-outline"
              size={28}
              onPress={() => {
                setIsFocused(false);
                Keyboard.dismiss();
              }}
            />
          </View>
        )}
        <TextInput
          placeholderTextColor={"#A0A0A0"}
          keyboardAppearance="dark"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder="Chek your city weather..."
        />
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
    borderColor: "white",
    padding: 10,
    color:"#A0A0A0",
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
