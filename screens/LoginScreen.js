import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for the eye icon

// backend modules
import { AuthContext } from "../context/authContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [state, setState] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigation = useNavigation();

  const handleLoginPress = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        alert("Please enter both email and password.");
        setLoading(false);
        return;
      }
      setLoading(false);
      const { data } = await axios.post("/auth/login", {
        email,
        password,
      });
      setState(data);
      await AsyncStorage.setItem("@auth", JSON.stringify(data));

      console.log("Logging in with:", email, password);
      navigation.navigate("HomeScreen");
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  // temporary function to check local storage data
  const getLocalStorageData = async () => {
    let data = await AsyncStorage.getItem("@auth");
    console.log("Local Storage ===> ", data);
  };
  getLocalStorageData();

  const handleSignUpPress = () => {
    navigation.navigate("SignupScreen");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the password visibility
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/MyEntoLogo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.Text2}>Welcome To MyEnto</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={!showPassword} // Use the state to determine visibility
          />
          <Pressable onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="black"
            />
          </Pressable>
        </View>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.buttonContainer,
          { backgroundColor: pressed ? "#0d1f11" : "#132a17" }, // Darken when pressed
        ]}
        onPress={handleLoginPress}
      >
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      <Pressable onPress={handleSignUpPress}>
        <Text style={styles.signUpText}>Don't have an account? Sign up</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f6d4ba", // Background color of the entire screen
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: FontSize.medium,
    fontFamily: FontFamily.regular,
    borderColor: Color.border,
    borderWidth: 1,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 16,
    width: "100%",
    height: 50,
    fontSize: FontSize.medium,
    fontFamily: FontFamily.regular,
    borderColor: Color.border,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
  },
  buttonContainer: {
    backgroundColor: "#132a17",
    paddingVertical: 6,
    paddingHorizontal: 35,
    borderRadius: 6,
    elevation: 3,
    marginTop: 16,
    position: "fixed",
  },
  buttonText: {
    fontSize: 21,
    fontFamily: FontFamily.poppinsSemiBold,
    color: "#fff",
    position: "fixed",
  },
  Text2: {
    fontSize: 30,
    fontFamily: "Poppins-SemiBold",
    color: "#3a7d44",
    bottom: 15,
    fontWeight: "900",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 4,
    position: "fixed",
  },
  logo: {
    width: 150,
    height: 150,
    bottom: 10,
    position: "fixed",
  },
  signUpText: {
    marginTop: 20,
    fontSize: FontSize.medium,
    fontFamily: FontFamily.regular,
    color: "#132a17",
    textDecorationLine: "underline",
    position: "fixed",
  },
  eyeIcon: {
    padding: 10,
  },
});

export default LoginScreen;
