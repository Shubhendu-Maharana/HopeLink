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

const NeederSignUp = () => {
  const navigation = useNavigation();
  const { email, setEmail, name, setName, loading, setLoading, session } =
    useUser();

  useEffect(() => {
    if (session) {
      navigation.navigate("HomeScreen");
    }
  }, [session]);

  const handleSingup = async () => {
    if (name.trim() === "" || email.trim() === "") {
      Alert.alert("Please fill all the fields");
      return;
    }

    // Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);

      // Check if the user already exists in the "users" table
      const { data: existingUser, error: fetchError } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        // Ignore the error if no matching user is found (code PGRST116 means "Row not found")
        throw fetchError;
      }

      if (existingUser) {
        Alert.alert("User already exists");
        setLoading(false);
        return;
      }

      // Send OTP to the email
      const { error: authError } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          shouldCreateUser: true,
        },
      });

      if (authError) {
        console.log("Error sending OTP:", authError);
        Alert.alert("Failed to send OTP. Please try again.");
        return;
      }

      // Insert into the "users" table only after OTP is successfully sent
      const { error: insertError } = await supabase
        .from("users")
        .insert({ email: email, name: name, user_type: "needer" });

      if (insertError) {
        console.log("Error inserting user into database:", insertError);
        Alert.alert("Error saving user information. Please try again.");
        return;
      }

      // Navigate to the OTP verification screen
      navigation.navigate("OtpVerifyScreen");
    } catch (error) {
      console.log("Error in handleSignup:", error);
      Alert.alert("An unexpected error occurred. Please try again.");
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
            Your Bridge to Help and Hope
          </Text>
        </View>

        <View style={{ marginBottom: 30 }}>
          <Text style={{ fontSize: 16, color: "#333", marginBottom: 10 }}>
            Enter your full name
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
            placeholder="Name"
            keyboardType="default"
            value={name}
            onChangeText={setName}
          />
          <Text
            style={{
              fontSize: 16,
              color: "#333",
              marginBottom: 10,
              marginTop: 10,
            }}
          >
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
          onPress={handleSingup}
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
          <Text>Already have an account?</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.reset({ index: 0, routes: [{ name: "LoginScreen" }] })
            }
          >
            <Text style={{ color: "#3D5A80", fontWeight: "bold" }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NeederSignUp;
