import { StatusBar, Text, View } from "react-native";
import { useUser } from "../../../contexts/UserProvider";
import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabase";
import { ScrollView } from "react-native-gesture-handler";
import PostCard from "./PostCard";

const Funds = () => {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const { data, error } = await supabase
        .from("needer_posts")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.log(error);
      } else {
        setPosts(data);
      }
    };

    getPosts();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>My Posts</Text>

      {posts.length === 0 ? (
        <Text>No posts...</Text>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 20 }}
        >
          {posts.map((post, index) => (
            <PostCard post={post} key={index} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Funds;
