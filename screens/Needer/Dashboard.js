const { View, Text, StatusBar } = require("react-native");
import { useEffect } from "react";
import { useUser } from "../../contexts/UserProvider";
import TabScreen from "./TabScreen";
import { useNavigation } from "@react-navigation/native";

const Dashboard = () => {
  const navigation = useNavigation();
  const { session, userType } = useUser();

  useEffect(() => {
    if (!session) {
      navigation.reset({
        index: 0,
        routes: [{ name: "LoginScreen" }],
      });
    }
    if (userType === "helper") {
      navigation.reset({
        index: 0,
        routes: [{ name: "HomeScreen" }],
      });
    }
  }, [session, userType]);

  return (
    <View style={{ flex: 1 }}>
      <TabScreen />
    </View>
  );
};

export default Dashboard;
