import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import FeaturedChip from "./FeaturedChip";
import FeaturedCard from "./FeaturedCard";
import { supabase } from "../../utils/supabase";

const chipNames = ["Medical", "Animals", "Education"];
const chipIcons = ["heartbeat", "paw", "graduation-cap"];

const Featured = () => {
  const [selectedChipIndex, setSelectedChipIndex] = useState(0);
  const [posts, setPosts] = useState([]);

  const handleChipSelect = (index) => {
    setSelectedChipIndex(index);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from("needer_posts")
          .select("*")
          .order("created_at", { ascending: true });
        if (error) {
          console.error("Error fetching posts:", error);
        } else {
          setPosts(data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 25,
        marginBottom: 30,
      }}
    >
      <View>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Featured Stories
        </Text>
        <Text style={{ marginTop: 5, color: "#000000aa" }}>
          Begin with small steps to assist those in greatest need.
        </Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {chipNames.map((chipLabel, index) => (
            <FeaturedChip
              key={index}
              selected={selectedChipIndex === index}
              onPress={() => handleChipSelect(index)}
              label={chipLabel}
              icon={chipIcons[index]}
            />
          ))}
        </ScrollView>

        <View style={{ marginTop: 20 }}>
          {posts.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {posts.map((post, index) => (
                <FeaturedCard key={index} post={post} />
              ))}
            </ScrollView>
          ) : (
            <View>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                No posts yet
              </Text>
              <Text style={{ marginTop: 5, color: "#000000aa" }}>
                No posts yet
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Featured;
