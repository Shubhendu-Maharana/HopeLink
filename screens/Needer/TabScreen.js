import React, { useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  StatusBar,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import Post from "./Tabs/Post";
import Funds from "./Tabs/Funds";
import Updates from "./Tabs/Updates";
import { useUser } from "../../contexts/UserProvider";
import { supabase } from "../../utils/supabase";

const statusBarHeight = StatusBar.currentHeight || 0;

const TabScreen = () => {
  const { user, setSession } = useUser();
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ["New Post", "My Posts", "Updates"];

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    } else {
      setSession(null);
    }
  };

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
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#fff",
          }}
        >
          Hey, {user?.name}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#ffffff88",
            padding: 10,
            borderRadius: 100,
          }}
          onPress={handleLogout}
        >
          <MaterialIcons name="logout" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Tab Bar */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
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
        {activeTab === 0 && <Post />}
        {activeTab === 1 && <Funds />}
        {activeTab === 2 && <Updates />}
      </View>
    </View>
  );
};

export default TabScreen;
