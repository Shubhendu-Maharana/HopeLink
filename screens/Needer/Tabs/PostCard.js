import { Text, View } from "react-native";

const PostCard = ({ post }) => {
  return (
    <View
      style={{
        padding: 20,
        gap: 10,
        backgroundColor: "#7A9B76",
        borderRadius: 10,
        marginBottom: 15,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}>
        {post?.title}
      </Text>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ gap: 5, alignItems: "center" }}>
          <Text style={{ color: "#fff" }}>Persons donated</Text>
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
            {post?.donation_count}
          </Text>
        </View>

        <View style={{ gap: 5, alignItems: "center" }}>
          <Text style={{ color: "#fff" }}>Funds raised</Text>
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
            ${post?.funds_collected} / {post?.required_fund}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PostCard;
