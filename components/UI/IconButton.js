import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function IconButton({ size, icon, color, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.container}>
        <Ionicons size={size} name={icon} color={color} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 6,
  },
  pressed: {
    opacity: 0.75,
  },
});
