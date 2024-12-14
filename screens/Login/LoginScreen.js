import React, { useEffect } from "react";
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
import { useUser } from "../../contexts/UserProvider";
import { supabase } from "../../utils/supabase";

const statusBarHeight = StatusBar.currentHeight || 0;

const LoginScreen = () => {
  const navigation = useNavigation();
  const { email, setEmail, loading, setLoading, session, handleSendOtp } =
    useUser();

  useEffect(() => {
    if (session) {
      navigation.navigate("HomeScreen");
    }
  }, [session]);

  const handleLogin = async () => {
    if (email === "") {
      Alert.alert("Please enter your email");
      return;
    }
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

      if (error) {
        console.log("Error in handleLogin:", error);
        Alert.alert("User not found", "Please sign up first");
      } else {
        const { error } = await supabase.auth.signInWithOtp({
          email: email,
          options: {
            shouldCreateUser: false,
          },
        });
        if (error) {
          console.log(error);
          alert(error.message);
        } else {
          setLoading(false);
          navigation.navigate("OtpVerifyScreen");
        }
      }
    } catch (error) {
      console.log("Error in handleLogin:", error);
    } finally {
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
              fontSize: 18,
              fontWeight: "bold",
              color: "#008080",
            }}
          >
            Welcome to HopeLink
          </Text>
          <Text
            style={{
              fontSize: 32,
              color: "#605856",
              marginTop: 5,
              fontWeight: "900",
            }}
          >
            Be the hero someone needs today!
          </Text>
        </View>

        <View style={{ marginBottom: 30 }}>
          <Text style={{ fontSize: 16, color: "#333", marginBottom: 10 }}>
            Enter your email address
          </Text>
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
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
      </View>

      <View style={{ gap: 20 }}>
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
          onPress={handleLogin}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size={"small"} />
          ) : (
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
              Send OTP
            </Text>
          )}
        </TouchableOpacity>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <Text>Dont have an account?</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.reset({ index: 0, routes: [{ name: "SignupScreen" }] })
            }
          >
            <Text style={{ color: "#008080", fontWeight: "bold" }}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            gap: 2,
          }}
        >
          <Text>Looking for support? Create a Needer account</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: "NeederSignupScreen" }],
              })
            }
          >
            <Text style={{ color: "#008080", fontWeight: "bold" }}>
              Click here!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
