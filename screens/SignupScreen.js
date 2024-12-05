import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  Modal,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";
import { Ionicons } from "@expo/vector-icons"; // Ensure you have this package installed

// Back-end Modules
import axios from "axios";

const SignupScreen = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordVisible, setPasswordVisible] = React.useState(false); // New state for password visibility
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = React.useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSignUpPress = async () => {
    try {
      setLoading(true);
      if (username === "" || email === "" || password === "") {
        alert("Please enter username, email, or password.");
        setLoading(false);
        return;
      }
      setLoading(false);
      const { data } = await axios.post("/auth/register", {
        username,
        email,
        password,
      });

      console.log(data);
      console.log("Signing up with:", username, email, password);
      // Example: navigate to AccountSucc upon successful signup
      toggleModal();
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  const handleLoginPress = () => {
    navigation.navigate("LoginScreen");
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
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          autoCapitalize="none"
        />
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
            secureTextEntry={!passwordVisible} // Use the visibility state
          />
          <Pressable
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={passwordVisible ? "eye-off" : "eye"}
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
        onPress={handleSignUpPress}
      >
        <Text style={styles.buttonText}>Sign up</Text>
      </Pressable>

      <Pressable onPress={handleLoginPress}>
        <Text style={styles.signUpText}>Already have an account? Log in</Text>
      </Pressable>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Account Registration</Text>
            <Text style={styles.modalContent}>
              Account created successfully!
            </Text>
            <View style={styles.closeButtonContainer}>
              <Pressable
                style={[styles.closeButton, { backgroundColor: "#3a7d44" }]}
                onPress={() => navigation.navigate("LoginScreen")}
              >
                <Text style={styles.closeButtonText}>Proceed with Login</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    backgroundColor: "#132a17", // Button background color
    paddingVertical: 6,
    paddingHorizontal: 35,
    borderRadius: 6,
    elevation: 3,
    marginTop: 16,
  },
  buttonText: {
    fontSize: 21,
    fontFamily: "Poppins-SemiBold",
    color: "#fff", // Button text color
  },
  Text2: {
    fontSize: 25,
    fontFamily: "Poppins-SemiBold",
    color: "#3a7d44",
    bottom: 10,
    fontWeight: "900",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 4,
    position: "fixed",
  },
  logo: {
    width: 120, // Adjust width as needed
    height: 120, // Adjust height as needed
    bottom: 5,
    position: "fixed",
  },
  signUpText: {
    marginTop: 20,
    fontSize: FontSize.medium,
    fontFamily: FontFamily.regular,
    color: "#132a17",
    textDecorationLine: "underline",
  },
  eyeIcon: {
    padding: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.)", // Semi-transparent background
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    marginBottom: 10,
  },
  modalContent: {
    width: "50%",
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    marginBottom: 5,
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
  },
  closeButtonContainer: {
    flexDirection: "row", // Align children horizontally
    justifyContent: "space-evenly", // Adjust spacing between buttons
    alignItems: "center", // Align buttons vertically in the row
    marginTop: 20,
  },
});

export default SignupScreen;
