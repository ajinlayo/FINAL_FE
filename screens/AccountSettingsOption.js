import React, { useContext, useState } from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Border, Color, FontFamily } from "../GlobalStyles";
import Icon from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../context/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AccountSettingsOption = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [logOutState, setLogOutState] = React.useContext(AuthContext);

  // Global State
  const [state] = useContext(AuthContext);
  const { user } = state;

  // Log Out Function
  const toggleLogOut = () => {
    setModalVisible(!isModalVisible);
  };

  const handleLogout = async () => {
    try {
      setLogOutState({ token: "", user: null });
      await AsyncStorage.removeItem("@auth");
      alert("User logged out successfully.");
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.error("Error during logout:", error);
      Alert.alert("Logout Failed", "An error occurred while logging out.");
    }
  };

  return (
    <View style={styles.Container1}>
      <View style={styles.Container2}>
        <View style={styles.Icon}>
          <Icon name="person-circle-outline" size={125} color="#132A17" />
        </View>
        <View>
          <Text style={styles.AccountSettingsTitle}>Account Details</Text>
        </View>

        <View style={styles.Child}>
          <View style={styles.IconChild}>
            <Icon name="person-outline" size={30} color="#132A17" />
          </View>
          <Text style={styles.ChildText}>{user?.username}</Text>
        </View>

        <View style={styles.Child}>
          <View style={styles.IconChild}>
            <Icon name="mail-outline" size={30} color="#132A17" />
          </View>
          <Text style={styles.ChildText}>{user?.email}</Text>
        </View>

        <View style={styles.Child}>
          <View style={styles.IconChild}>
            <Icon name="lock-closed-outline" size={30} color="#132A17" />
          </View>
          <Text style={styles.ChildText}>*********</Text>
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
          onPress={toggleLogOut}
        >
          <Text style={styles.EditButtonText}>Log Out</Text>
        </Pressable>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleLogOut}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Logout Confirmation</Text>
            <Text style={styles.modalContent}>
              Are you sure you want to log out your account?
            </Text>
            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.closeButton, { backgroundColor: "#3A7D44" }]}
                onPress={toggleLogOut}
              >
                <Text style={styles.closeButtonText}>No</Text>
              </Pressable>
              <Pressable
                style={[styles.closeButton, { backgroundColor: "red" }]}
                onPress={handleLogout}
              >
                <Text style={styles.closeButtonText}>Yes</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    elevation: 10,
  },
  Icon: {
    marginTop: "10",
  },
  AccountSettingsTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  Child: {
    backgroundColor: "white",
    width: "85%",
    height: "15%",
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 20,
    elevation: 5,
  },
  IconChild: {
    marginLeft: "20",
    alignSelf: "center",
  },
  ChildText: {
    Color: "#132A17",
    fontWeight: "bold",
    marginHorizontal: 10,
    fontSize: 16,
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
    elevation: 5,
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalContent: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  closeButton: {
    width: "35%",
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AccountSettingsOption;
