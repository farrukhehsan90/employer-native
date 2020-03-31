import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";


// Button Component
const Button = ({ onPress, style,title }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, style]}>
        <Text
          style={[styles.text, style && style.color && { color: style.color }]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    bottom: "3%",
    width: 120,
    minHeight: 55,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4B0082"
  },
  text: { color: "#fff", fontWeight: "700" }
});

export default Button;
