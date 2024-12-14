import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import WelcomeScreen from "./screens/WelcomeScreen/WelcomeScreen";
import LoginScreen from "./screens/Login/LoginScreen";
import OtpVerifyScreen from "./screens/Login/OtpVerifyScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { UserProvider } from "./contexts/UserProvider";
import SignupScreen from "./screens/Login/SignupScreen";
import StoryScreen from "./screens/HomeScreen/StoryScreen/StoryScreen";
import NeederSignUp from "./screens/Login/NeederSignUp";
import Dashboard from "./screens/Needer/Dashboard";
import PaymentScreen from "./screens/Payment/PaymentScreen";

const Stack = createStackNavigator();

const App = () => {
  const [firstLaunch, setFirstLaunch] = useState(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const value = await AsyncStorage.getItem("alreadyLaunched");
        if (value === null) {
          await AsyncStorage.setItem("alreadyLaunched", "true");
          setFirstLaunch(true);
        } else {
          setFirstLaunch(false);
        }
      } catch (error) {
        console.error("Error checking app launch status:", error);
      }
    };
    checkFirstLaunch();
  }, []);

  if (firstLaunch === null) {
    // You can replace this with a loading screen if needed
    return null;
  }

  return (
    <NavigationContainer>
      <UserProvider>
        <StatusBar style="auto" />
        <Stack.Navigator
          initialRouteName={firstLaunch ? "Welcome" : "LoginScreen"}
        >
          {firstLaunch && (
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
          )}
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignupScreen"
            component={SignupScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NeederSignupScreen"
            component={NeederSignUp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OtpVerifyScreen"
            component={OtpVerifyScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NeederDashboard"
            component={Dashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="StoryScreen"
            component={StoryScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PaymentScreen"
            component={PaymentScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </UserProvider>
    </NavigationContainer>
  );
};

export default App;
