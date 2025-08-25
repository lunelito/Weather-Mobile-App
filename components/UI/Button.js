import { Pressable, Text } from "react-native";

export default function Button({ backgroundColor, color, text, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        padding: 12,
        borderRadius: 8,
        backgroundColor: backgroundColor || "transparent",
      }}
    >
      <Text
        style={{
          color: color || "black",
          fontSize: 16,
          textAlign: "center",
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
}
