import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, Pressable, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, Color, Border, FontFamily } from "../GlobalStyles";
import Icon from "react-native-vector-icons/Ionicons";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { AuthContext } from "../context/authContext";

const UserInfo = () => {
  const navigation = useNavigation();

  // Global State
  const [state, setState] = useContext(AuthContext);
  const { user, token } = state;

  // Local State
  const [username, setUsername] = React.useState(user?.username);
  const [email, setEmail] = React.useState(user?.email);
  const [password, setPassword] = React.useState(user?.password);
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the password visibility
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put("/auth/update-user", {
        username,
        password,
        email,
      });
      setLoading(false);
      let UD = JSON.stringify(data);
      setState({ ...state, user: UD?.updatedUser });
      alert(data && data.message);
      navigation.navigate("LoginScreen");
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <View style={styles.userInfo}>
      <Pressable
        style={[styles.arrowleft]}
        onPress={() => navigation.navigate("AccountSettingsOption")}
      >
        <Icon name="arrow-back" size={35} color="#132A17" />
      </Pressable>

      <View style={styles.editUserContainer}>
        <Text style={styles.editUserText}> EDIT USER INFO </Text>
      </View>
      <View style={styles.usernameContainer}>
        <Text style={styles.label}>USERNAME</Text>
        <View style={styles.textBox}>
          <TextInput
            style={styles.InputStyle}
            placeholder="Enter Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <Text style={styles.label}>EMAIL</Text>

        <View style={styles.textBox}>
          <TextInput
            style={[styles.InputStyle, { color: "#A9A9A9" }]}
            placeholder="Enter Email"
            value={email}
            editable={false}
          />
        </View>
        <Text style={styles.label}>PASSWORD</Text>
        <View style={styles.textBox}>
          <TextInput
            style={styles.InputStyle}
            placeholder="Enter Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <Pressable onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="black"
            />
          </Pressable>
        </View>

        <Pressable style={styles.saveChangesButton} onPress={handleUpdate}>
          <Text style={styles.saveChangesText}>SAVE CHANGES</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    backgroundColor: Color.colorMediumseagreen,
    flex: 1,
    flexGrow: 1,
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  arrowleft: {
    height: "15.47%",
    width: "25.53%",
    marginTop: 40,
    marginLeft: 10,
    position: "absolute",
    overflow: "hidden",
  },
  editUserContainer: {
    backgroundColor: "#3A7D44",
    width: "82%",
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    marginHorizontal: 35,
    marginTop: 90,
    flexDirection: "column",
    shadowColor: "#000",
    shadowOffset: {
      width: 20,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  editUserText: {
    fontSize: 25,
    fontFamily: "Poppins-SemiBold",
    color: "#132A17",
    marginTop: 4,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 2,
  },
  usernameContainer: {
    backgroundColor: "#3A7D44",
    width: "82%",
    height: 400,
    borderRadius: 25,
    alignItems: "stretch",
    marginHorizontal: 35,
    marginTop: 50,
    flexDirection: "column",
    elevation: 3,
  },
  textBox: {
    flexDirection: "row",
    alignItems: "center",
    height: "12%",
    width: "78%",
    backgroundColor: "#F6D4BA",
    marginTop: 1,
    marginLeft: "10%",
    borderRadius: 10,
    paddingHorizontal: 16,
  },
  InputStyle: {
    flex: 1,
    fontSize: 15,
  },
  label: {
    marginLeft: "10%",
    marginTop: "9%",
    fontWeight: "bold",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 2,
  },
  eyeIcon: {
    padding: 5,
  },
  saveChangesButton: {
    backgroundColor: "#132A17",
    width: "40%",
    height: "10%",
    marginHorizontal: "30%",
    marginTop: "10%",
    borderRadius: 10,
    textAlign: "center",
    elevation: 10,
  },
  saveChangesText: {
    textAlign: "center",
    marginTop: 8,
    fontWeight: "bold",
    color: "white",
  },
});

export default UserInfo;
