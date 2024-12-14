import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../../utils/supabase";

const statusBarHeight = StatusBar.currentHeight || 0;

const PaymentScreen = ({ route }) => {
  const { post } = route.params;
  const [neederName, setNeederName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  // console.log(post);

  useEffect(() => {
    const getNeeder = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", post.user_id)
          .single();
        if (error) {
          throw error;
        } else {
          setNeederName(data?.name);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getNeeder();
  }, []);

  const handlePayment = async () => {
    try {
      const { data, error } = await supabase
        .from("needer_posts")
        .select("*")
        .eq("id", post.id)
        .single();

      if (error) {
        throw error;
      } else {
        const newAmount =
          parseFloat(data?.funds_collected) + parseFloat(amount);
        const { error } = await supabase
          .from("needer_posts")
          .update({ funds_collected: newAmount })
          .eq("id", post.id);
        if (error) {
          throw error;
        } else {
          alert("Payment successful");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: statusBarHeight + 30,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading ? (
        <ActivityIndicator size={"large"} color={"#008080"} />
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              Paying {neederName}
            </Text>

            <TextInput
              style={{
                marginTop: 20,
                backgroundColor: "#fff",
                padding: 10,
                paddingHorizontal: 30,
                borderRadius: 10,
              }}
              placeholder="$0"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "#008080",
              padding: 12,
              borderRadius: 100,
            }}
            onPress={handlePayment}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 16,
                textAlign: "center",
                paddingHorizontal: 30,
              }}
            >
              Pay
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default PaymentScreen;
