import { Dimensions, Image, Text, View } from "react-native";

const { width } = Dimensions.get("window");
const Documents = () => {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Documents</Text>

      <Image
        source={require("../../../../assets/images/image1.jpg")}
        style={{
          width: width - 40,
          height: width - 100,
        }}
        resizeMode="contain"
      />
    </View>
  );
};

export default Documents;
