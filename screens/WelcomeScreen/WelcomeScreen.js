import React from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";

const { width } = Dimensions.get("window");

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const slides = [
    {
      id: "1",
      title: "Welcome to HopeLink",
      description:
        "Discover heartfelt stories from those in need. Your kindness can bring hope and transform lives",
      logo: require("../../assets/logo1.json"),
    },
    {
      id: "2",
      title: "Trustworthy Support",
      description:
        "Every story is verified for authenticity, ensuring your help reaches the right hands with complete transparency.",
      logo: require("../../assets/logo2.json"),
    },
    {
      id: "3",
      title: "Feel the Impact",
      description:
        "Stay connected with real-time updates and gratitude messages from those you’ve helped. Together, we make a difference.",
      logo: require("../../assets/logo3.json"),
    },
  ];

  const renderSlide = ({ item }) => (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
        width,
      }}
    >
      <LottieView
        source={item.logo}
        autoPlay
        loop
        style={{ flex: 3, width: `${width - 100}` }}
      />
      <View style={{ flex: 1, position: "relative" }}>
        <View
          style={{
            zIndex: 1,
            height: "80%",
            borderRadius: 10,
            padding: 14,
            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.4)",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#605856",
              marginBottom: 10,
              paddingBottom: 8,
              borderBottomColor: "#E85F5C",
              borderBottomWidth: 2,
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#436436",
            }}
          >
            {item.description}
          </Text>
        </View>
        {item.id === "3" && (
          <View
            style={{
              position: "absolute",
              bottom: 20,
              left: 0,
              right: 0,
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#008080",
                paddingVertical: 10,
                paddingHorizontal: 35,
                borderRadius: 100,
              }}
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
                Get Started
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <FlatList
      data={slides}
      renderItem={renderSlide}
      keyExtractor={(item) => item.id}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default WelcomeScreen;
