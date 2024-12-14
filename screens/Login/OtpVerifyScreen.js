import React, { useState } from "react";
import {
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../../utils/supabase";
import { useUser } from "../../contexts/UserProvider";

const statusBarHeight = StatusBar.currentHeight || 0;

const OtpVerifyScreen = () => {
  const navigation = useNavigation();
  const { email, setEmail, setName, setSession, loading, setLoading, userType } =
    useUser();
  const [otp, seOtp] = useState("");

  const verifyOtp = async () => {
    if (otp === "") {
      Alert.alert("No OTP provided", "Please enter your OTP");
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.verifyOtp({
        email: email,
        token: otp,
        type: "email",
      });

      if (error) {
        console.log(error.message);
        Alert.alert(error.message);
      } else {
        setLoading(false);
        setSession(data?.session);
        if (userType === "needer") {
          navigation.navigate("NeederDashboard");
        } else {
          navigation.navigate("HomeScreen");
        }
      }
    } catch (error) {
      console.log("Error in verifyOtp:", error);
    } finally {
      setEmail("");
      setName("");
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 30,
        justifyContent: "center",
        flex: 1,
        padding: 30,
        paddingTop: statusBarHeight,
      }}
    >
      <View style={{ gap: 30 }}>
        <View>
          <Text
            style={{
              fontSize: 32,
              color: "#605856",
              marginTop: 5,
              fontWeight: "900",
            }}
          >
            Enter OTP
          </Text>
        </View>

        <View style={{ marginBottom: 30 }}>
          <TextInput
            style={{
              height: 50,
              borderColor: "#ccc",
              borderWidth: 1,
              borderRadius: 8,
              paddingLeft: 15,
              fontSize: 16,
              backgroundColor: "#fff",
            }}
            placeholder="OTP"
            keyboardType="number-pad"
            value={otp}
            onChangeText={seOtp}
          />
        </View>
      </View>

      <View>
        <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: "#008080",
            paddingVertical: 15,
            paddingHorizontal: 40,
            borderRadius: 100,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
          onPress={verifyOtp}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
              Verify
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OtpVerifyScreen;
