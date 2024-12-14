import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { useEffect } from "react";
import { useUser } from "../../contexts/UserProvider";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { supabase } from "../../utils/supabase";
import DonationSummary from "./DonationSummary";
import Featured from "./Featured";
import { ScrollView } from "react-native-gesture-handler";
import Footer from "./Footer";
import { MaterialIcons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

const HomeScreen = () => {
  const navigation = useNavigation();
  const { session, setSession, user, userType } = useUser();

  useEffect(() => {
    if (!session) {
      navigation.reset({
        index: 0,
        routes: [{ name: "LoginScreen" }],
      });
    }

    if (userType === "needer") {
      navigation.reset({
        index: 0,
        routes: [{ name: "NeederDashboard" }],
      });
    }
  }, [session, userType]);

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
      }}
    >
      <LinearGradient
        colors={["#7A9B76", "#C8BFC7"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: height + 30,
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 30, paddingTop: 30 }}
      >
        <View
          style={{
            paddingLeft: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: 21,
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>
            Hey, {user?.name}
          </Text>

          <TouchableOpacity
            style={{
              backgroundColor: "#008080",
              padding: 10,
              borderRadius: 100,
            }}
            onPress={handleLogout}
          >
            <MaterialIcons name="logout" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <DonationSummary />
        <Featured />

        <Footer />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
