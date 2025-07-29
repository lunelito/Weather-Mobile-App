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
              color="black"
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
    borderWidth: 2,
    borderColor: "black",
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
