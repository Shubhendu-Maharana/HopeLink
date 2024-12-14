import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  StatusBar,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import Overview from "./Tabs/Overview";
import Documents from "./Tabs/Documents";
import Updates from "./Tabs/Updates";
import { useNavigation } from "@react-navigation/native";

const statusBarHeight = StatusBar.currentHeight || 0;

const StoryScreen = ({ route }) => {
  const navigation = useNavigation();
  const { post } = route.params;
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ["Overview", "Documents", "Updates"];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#7A9B76",
        paddingTop: statusBarHeight + 20,
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          paddingLeft: 20,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#fff",
          }}
        >
          {post?.title}
        </Text>
      </View>

      {/* Tab Bar */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          // backgroundColor: "#6E8F68",
          paddingVertical: 10,
          borderRadius: 8,
          marginHorizontal: 10,
          marginVertical: 10,
        }}
      >
        {tabs.map((tab, index) => (
          <Pressable
            key={index}
            onPress={() => setActiveTab(index)}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 20,
              backgroundColor: activeTab === index ? "#5C7357" : "transparent",
              borderRadius: 8,
              flex: 1,
            }}
          >
            <Text style={{ color: "white", fontSize: 16, textAlign: "center" }}>
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Tab Content */}
      <View
        style={{
          flex: 1,
          // marginTop: 20,
          // padding: 20,
          overflow: "hidden",
          backgroundColor: "#fff",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        {activeTab === 0 && (
          <Overview
            post={post}
          />
        )}
        {activeTab === 1 && <Documents />}
        {activeTab === 2 && <Updates />}
      </View>
    </View>
  );
};

export default StoryScreen;
