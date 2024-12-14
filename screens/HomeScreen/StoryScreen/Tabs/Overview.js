import { useEffect, useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { supabase } from "../../../../utils/supabase";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const Overview = ({ post }) => {
  const navigation = useNavigation();
  const [neederName, setNeederName] = useState("");

  useEffect(() => {
    const getNeeder = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", post?.user_id)
        .single();
      if (error) {
        console.log(error);
      } else {
        setNeederName(data?.name);
      }
    };

    getNeeder();
  }, []);
  return (
    <View
      style={{ flex: 1, justifyContent: "space-between", paddingBottom: 20 }}
    >
      <View>
        <View>
          <Image
            source={require("../../../../assets/images/image1.jpg")}
            style={{ height: width / 2, width: "100%" }}
          />
        </View>

        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            {post?.title}
          </Text>
          <Text style={{ marginTop: 5, color: "#000000aa" }}>
            By {neederName}
          </Text>
        </View>

        <View style={{ padding: 20, gap: 10 }}>
          <Text
            style={{ fontSize: 16, color: "#000000aa", fontWeight: "bold" }}
          >
            About the Beneficiary
          </Text>

          <Text>{post?.story}</Text>
        </View>
      </View>

      <View
        style={{
          paddingHorizontal: 30,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#008080",
            padding: 12,
            borderRadius: 100,
          }}
          onPress={() => {
            navigation.navigate("PaymentScreen", { post });
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 16,
              textAlign: "center",
            }}
          >
            Contribute Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Overview;
