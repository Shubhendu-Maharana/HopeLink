import { Image, Text, View } from "react-native";

const imageMapper = {
  image1: require("../../assets/images/heart.png"),
  image2: require("../../assets/images/trust.png"),
};

const Card = ({ imageKey, text1, text2 }) => {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 5,
        alignItems: "center",
        flex: 1,
      }}
    >
      <Image
        source={imageMapper[imageKey]}
        style={{
          height: 60,
          width: 60,
        }}
      />
      <Text>{text1 ? text1 : ""} </Text>
      <Text>{text2 ? text2 : ""}</Text>
    </View>
  );
};

export default Card;
