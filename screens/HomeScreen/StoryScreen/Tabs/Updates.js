import { Text, View } from "react-native";

const Updates = () => {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Updates</Text>

      <View style={{ padding: 20 }}>
        <Text>There are no updates yet.</Text>
      </View>
    </View>
  );
};

export default Updates;
