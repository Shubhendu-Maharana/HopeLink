import { FontAwesome } from "@expo/vector-icons";
import { Text, View } from "react-native";

const Footer = () => {
  return (
    <View
      style={{
        paddingLeft: 20,
        marginBottom: 30,
        paddingBottom: 30,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View>
        <Text style={{ fontSize: 32, fontWeight: "bold", color: "#008080" }}>
          Keep
        </Text>
        <Text style={{ fontSize: 32, fontWeight: "bold", color: "#008080" }}>
          the love
        </Text>
        <Text style={{ fontSize: 32, fontWeight: "bold", color: "#008080" }}>
          flowing!
        </Text>
        <Text style={{ fontSize: 12, color: "gray" }}>Made by Shubhendu</Text>
      </View>

      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginLeft: 20,
          marginRight: 20,
        }}
      >
        <FontAwesome name="heart" size={94} color="#d59" />
      </View>
    </View>
  );
};

export default Footer;
