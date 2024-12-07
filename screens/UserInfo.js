import * as React from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, Color, Border, FontFamily } from "../GlobalStyles";
import Icon from "react-native-vector-icons/Ionicons";

const UserInfo = () => {
  const navigation = useNavigation();

  // State to hold user input values
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <View style={styles.userInfo}>
      <Pressable
        style={[styles.arrowleft]}
        onPress={() => navigation.navigate("AccountSettingsOption")}
      >
        <Icon name="arrow-back" size={25} color="#132A17" />
      </Pressable>

      <View style={styles.container1}>
        <Text style={styles.heading}> EDIT USER INFO </Text>
      </View>
      <View style={styles.container2}>
      <Text style={styles.label}>
          USERNAME
        </Text>
        <View style={styles.textBox}>
        <TextInput
        placeholder="Enter Username"
        value={username}
        onChangeText={setUsername}
      />
        </View>
        <Text style={styles.label}>
          EMAIL
        </Text>

        <View style={styles.textBox}>
        
        <TextInput
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
      />
        </View>
        <Text style={styles.label}>
          PASSWORD
        </Text>
        <View style={styles.textBox}>
      <TextInput
        placeholder="Enter Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      </View>

      <Pressable
        style={styles.saveChangesButton}
        onPress={() => navigation.navigate("AccountSettingsOption")}
      >
        <Text style={styles.saveChangesText}>
          SAVE CHANGES
        </Text>
      </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    backgroundColor: Color.colorMediumseagreen,
    flex: 1,
    width: "100%",
    height: 640,
    overflow: "hidden",
  },
  arrowleft: {
    height: "15.47%",
    width: "25.53%",
    marginTop: "25",
    marginLeft: "20",
    position: "absolute",
    overflow: "hidden",
  },
  container1:{
    backgroundColor: "#3A7D44",
    width: "82%", // Adjust width as needed
    height: "8%", // Adjust height as needed
    borderRadius: 50, // Optional: for rounded corners
    alignItems: "center", // Center content horizontally
    marginHorizontal: "45",
    marginTop: "90",
    flexDirection: "column",
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: "#132A17",
    marginTop: '13'
  },
  container2:{
    backgroundColor: "#3A7D44",
    width: "82%", // Adjust width as needed
    height: "50%", // Adjust height as needed
    borderRadius: 25, // Optional: for rounded corners
    alignItems: "stretch", // Center content horizontally
    marginHorizontal: "45",
    marginTop: "50",
    flexDirection: "column",
  },
  textBox: {
    height: "10%",
    width: "78%",
    backgroundColor: "#F6D4BA",
    marginTop: 1,
    marginLeft: "10%",
    borderRadius: 10,
  },
  label: {
    marginLeft: "10%",
    marginTop: "9%",
    fontWeight: "bold",
    color: "white"
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
    marginTop: 10,
    fontWeight: "bold",
    color: "white"
  },
  
});

export default UserInfo;
