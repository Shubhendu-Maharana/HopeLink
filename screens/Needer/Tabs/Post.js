import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { supabase } from "../../../utils/supabase"; // Ensure you have a supabaseClient setup
import { useUser } from "../../../contexts/UserProvider";
import { ScrollView } from "react-native-gesture-handler";

const Post = () => {
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [requiredFund, setRequiredFund] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !story || !requiredFund) {
      Alert.alert("Error", "Please fill all fields and upload images.");
      return;
    }

    try {
      setLoading(true);
      // Insert data into Supabase table
      const { error } = await supabase.from("needer_posts").insert({
        title,
        story,
        required_fund: parseFloat(requiredFund),
        user_id: user.id,
      });

      if (error) throw error;

      Alert.alert("Success", "Post created successfully!");
      // Reset form
      setTitle("");
      setStory("");
      setRequiredFund("");
    } catch (error) {
      console.error("Submission error:", error);
      Alert.alert("Error", "An error occurred while creating the post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
      />

      <Text style={styles.label}>Story</Text>
      <TextInput
        style={styles.textArea}
        value={story}
        onChangeText={setStory}
        placeholder="Enter story"
        multiline
      />

      <Text style={styles.label}>Required Fund</Text>
      <TextInput
        style={styles.input}
        value={requiredFund}
        onChangeText={setRequiredFund}
        placeholder="Enter required fund"
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={{
          backgroundColor: "#008080",
          padding: 12,
          borderRadius: 100,
        }}
        onPress={handleSubmit}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 16,
              textAlign: "center",
            }}
          >
            Post
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    height: 100,
    marginBottom: 15,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 15,
    borderRadius: 5,
  },
});

export default Post;
