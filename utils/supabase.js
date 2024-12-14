import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cpqsjagvpwwxqkvvqtcz.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwcXNqYWd2cHd3eHFrdnZxdGN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwMTM0NDMsImV4cCI6MjA0OTU4OTQ0M30.pxyAxUDSeS3ZxcNA65of7y2LYY8q4lUF7YjZWIcib1s";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
