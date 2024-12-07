import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable, FontSize } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Border, Color, FontFamily } from "../GlobalStyles";
import Icon from "react-native-vector-icons/Ionicons";

const AccountSettingsOption = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.Container1}>
      <Pressable
        style={[styles.BackButton]}
        onPress={() => navigation.navigate("HomeScreen")}
      >
        <Icon name="arrow-back" size={25} color="#132A17" />
      </Pressable>

      <View style={styles.Container2}>
        <View style={styles.Icon}>
          <Icon name="person-circle-outline" size={125} color="#132A17" />
        </View>

        <View style={styles.Child}>
          <View style={styles.IconChild}>
            <Icon name="person-outline" size={40} color="#132A17" />
          </View>
          <Text style={styles.ChildText}>USERNAME</Text>
        </View>

        <View style={styles.Child}>
          <View style={styles.IconChild}>
            <Icon name="mail-outline" size={40} color="#132A17" />
          </View>
          <Text style={styles.ChildText}>EMAIL</Text>
        </View>

        <View style={styles.Child}>
          <View style={styles.IconChild}>
            <Icon name="lock-closed-outline" size={40} color="#132A17" />
          </View>
          <Text style={styles.ChildText}>PASSWORD</Text>
        </View>
      </View>
      <View style={styles.Container3}>
        <Pressable
          style={({ pressed }) => [
            styles.EditButton,
            pressed && styles.pressed,
          ]}
          onPress={() => navigation.navigate("UserInfo")}
        >
          <Text style={styles.EditButtonText}>Edit User Info</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.EditButton2,
            pressed && styles.pressed,
          ]}
          onPress={() => navigation.navigate("UserInfo")}
        >
          <Text style={styles.EditButtonText}>Log Out</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container1: {
    backgroundColor: Color.colorMediumseagreen,
    flex: 1,
    width: "100%",
    height: 640,
    overflow: "hidden",
  },
  BackButton: {
    height: "15.47%",
    width: "25.53%",
    marginTop: "25",
    marginLeft: "20",
    position: "absolute",
    overflow: "hidden",
  },
  Container2: {
    backgroundColor: "#F9E2D0",
    width: "82%", // Adjust width as needed
    height: "65%", // Adjust height as needed
    borderRadius: 15, // Optional: for rounded corners
    // Center content vertically
    alignItems: "center", // Center content horizontally
    marginHorizontal: "45",
    marginTop: "70",
    flexDirection: "column",
  },
  Icon: {
    marginTop: "10",
  },
  Child: {
    backgroundColor: "white",
    width: "70%",
    height: "15%",
    flexDirection: "row",
    marginTop: "20",
    alignItems: "center", // Center items vertically
    justifyContent: "",
    borderRadius: 50,
  },
  IconChild: {
    marginLeft: "20",
    marginBottom: "5"
  },
  ChildText: {
    Color: "#132A17",
    fontWeight: "bold",
    marginHorizontal: "10",
    marginVertical: "20",
    fontSize: 20,
  },
  Container3: {
    width: "80%", // Adjust width as needed
    height: "10%", // Adjust height as needed
    borderRadius: 15, // Optional: for rounded corners
    alignItems: "center", // Center content horizontally
    marginHorizontal: "45",
    marginTop: "10",
    flexDirection: "row",
  },

  EditButton: {
    height: "70%",
    width: "50%",
    borderRadius: 15,
    backgroundColor: "#132A17",
    marginRight: "10",
    marginLeft: "0",
    elevation: 5
  },
  EditButton2: {
    height: "70%",
    width: "50%",
    borderRadius: 15,
    backgroundColor: "#FF0000",
    marginRight: "10",
    marginLeft: "0",
    elevation: 5,
    
    
  },
  EditButtonText: {
    textAlign: "center",
    marginTop: "14",
    color: "white",
    fontWeight: "bold",
  },
});

export default AccountSettingsOption;
