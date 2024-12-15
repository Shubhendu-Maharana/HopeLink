import { useNavigation } from "@react-navigation/native";
import { Image, Text, TouchableOpacity, View } from "react-native";

const FeaturedCard = ({ post }) => {
  const navigation = useNavigation();

  const shrinkText = (text) => {
    const maxSize = 15;
    if (text.length <= maxSize) return text;

    return text.substring(0, maxSize) + "...";
  };

  const images = {
    1: require("../../assets/images/card-1.jpg"),
    2: require("../../assets/images/card-2.jpg"),
    3: require("../../assets/images/card-3.jpg"),
    4: require("../../assets/images/card-4.jpg"),
    5: require("../../assets/images/card-5.jpg"),
  };

  const image =
    images[post.id] || require("../../assets/images/card-1.jpg");

  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#fff",
        borderRadius: 15,
        overflow: "hidden",
        marginRight: 15,
      }}
      onPress={() => {
        navigation.navigate("StoryScreen", { post });
      }}
    >
      <View>
        <Image
          source={image}
          style={{
            height: 200,
            width: 200,
          }}
        />
      </View>

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {shrinkText(post?.title)}
        </Text>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ color: "#00000066", fontSize: 12 }}>
            Funds received
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            ${post?.funds_collected} / {post?.required_fund}
          </Text>
        </View>

        <View style={{ marginVertical: 10 }}>
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
              CONTRIBUTE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FeaturedCard;
