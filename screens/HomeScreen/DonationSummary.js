import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Card from "./Card";

const DonationSummary = () => {
  return (
    <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../../assets/images/image2.jpg")}
          style={{
            width: 100,
            height: 100,
            marginTop: 20,
            marginRight: -35,
            zIndex: 1,
            borderRadius: 15,
          }}
        />
        <Image
          source={require("../../assets/images/image1.jpg")}
          style={{ width: 150, height: 150, borderRadius: 15 }}
        />
        <Image
          source={require("../../assets/images/image3.jpg")}
          style={{
            width: 80,
            height: 80,
            alignSelf: "flex-end",
            marginLeft: -35,
            marginBottom: -30,
            borderRadius: 15,
          }}
        />
      </View>

      <View
        style={{
          marginTop: 50,
          marginBottom: 30,
          flexDirection: "row",
          gap: 10,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Card imageKey={"image1"} text1={"Help anywhere,"} text2={"anytime"} />
        <Card imageKey={"image2"} text1={"Give with"} text2={"trust"} />
      </View>

      <View>
        <TouchableOpacity
          style={{
            backgroundColor: "#008080",
            paddingVertical: 20,
            paddingHorizontal: 24,
            borderRadius: 100,
          }}
        >
          <Text
            style={{
              color: "#FFF",
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Help Those in Need →
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DonationSummary;
