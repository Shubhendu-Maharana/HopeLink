import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";

const FeaturedChip = ({ selected, onPress, label, icon }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        gap: 8,
        backgroundColor: selected ? "#008080" : "#00808044",
        paddingHorizontal: 10,
        paddingVertical: 16,
        borderRadius: 10,
        marginRight: 12,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FontAwesome name={icon} size={22} color={selected ? "#fff" : "#000"} />
      <Text style={{ color: selected ? "#fff" : "#000" }}>{label}</Text>
    </TouchableOpacity>
  );
};

export default FeaturedChip;
