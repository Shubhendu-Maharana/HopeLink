import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      console.log("Checking session");
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.log(error);
          setSession(null);
        } else {
          setSession(data?.session);
        }
      } catch (error) {
        console.log("Error checking session:", error);
      }
    };

    checkSession();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      console.log("Getting user");
      try {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", session?.user.email)
          .single();

        if (error) {
          console.log(error);
        } else {
          setUser(data);
          setUserType(data?.user_type);
        }
      } catch (error) {
        console.log("Error in getUser:", error);
      }
    };

    getUser();
  }, [session]);

  return (
    <userContext.Provider
      value={{
        email,
        setEmail,
        name,
        setName,
        loading,
        setLoading,
        session,
        setSession,
        user,
        setUser,
        userType,
        setUserType,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
