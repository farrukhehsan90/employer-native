import React from "react";
import { View, Text, TextInput, Platform, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const TextField = ({
  textInputStyle,
  containerStyle,
  labelStyle,
  label,
  value,
  onChange,
  icon,
  placeholder,
  onPressLocation
}) => {
  return (
    <View style={[{ width: "100%" }, containerStyle]}>
      <Text style={[{ paddingVertical: 10 }, labelStyle]}>{`${label
        .toString()
        .substring(0, 1)
        .toUpperCase()}${label.toString().substring(1)}`}</Text>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={e => onChange(e, label)}
          style={[styles.textInput, textInputStyle]}
        />
        {icon && (
          <TouchableOpacity onPress={onPressLocation}>
            <Ionicons
              name={Platform.select({
                ios: `ios-${icon}`,
                android: `md-${icon}`
              })}
              size={25}
              style={styles.locationIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInputContainer: { width: "100%", flexDirection: "row" },
  textInput: {
    width: "90%",
    borderBottomColor: "#4B0082",
    borderBottomWidth: 1,
    paddingBottom: 5
  },
  locationIcon: { paddingVertical: 5, color: "#FF8362" }
});

export default TextField;
