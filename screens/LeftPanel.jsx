import * as React from "react";
import { StyleSheet, View, Text, Pressable, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LeftPanel = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [logOutState, setLogOutState] = React.useContext(AuthContext);

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
    <View style={styles.leftPanel}>
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
      <Pressable
        style={styles.logOutButton}
        onPress={toggleLogOut}
      >
        <Text style={styles.logOutText}>LOG OUT</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  leftPanel: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    justifyContent: "space-between",
    width: "100%",
  },
  closeButton: {
    width: "45%",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  logOutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#69B578",
    borderRadius: 5,
  },
  logOutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LeftPanel;