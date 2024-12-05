import * as React from "react";
import { StyleSheet, View, Text, Pressable, Alert, Modal } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { FontSize, FontFamily, Border, Color } from "../../GlobalStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import Constants from "expo-constants";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

const DeviceAccountInfoUpdate = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [state] = React.useContext(AuthContext);
  const { deviceData } = route.params;
  const [isModalVisible, setModalVisible] = React.useState(false);

  const toggleModal = () => {
    navigation.navigate("HomeScreen");
  };

  const handleDonePress = async () => {
    try {
      // Extract user info and device ID
      const userId = state.user._id;
      const deviceId = deviceData.data.deviceId;

      // Update payload
      const updatePayload = {
        connectedToDevice: true,
        deviceId,
        userId,
      };

      // Send update request to backend
      const response = await axios.post("/auth/connect-device", updatePayload);
      setModalVisible(!isModalVisible);
    } catch (error) {
      // Handle error properly
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Unable to update account information.";
      Alert.alert("Error", errorMessage);
    }
  };

  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null; // You can replace this with a loading indicator if needed
  }

  return (
    <View style={styles.aboutUsScreen}>
      <View style={styles.header}>
        <Pressable
          style={styles.iconLeft}
          onPress={() => navigation.navigate("Device Confirm")}
        >
          <Icon name="chevron-left" size={30} color="#132A17" />
        </Pressable>
        <Text style={styles.title}>Account Info Update</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.instruction}>
          5. Connect to your local WiFi with Internet access to update your
          account information with the device details.
        </Text>
        <Text style={styles.instruction}>
          6. Check the "Device Status" at the Home page to verify your account's
          connection with the device.
        </Text>
        <View style={styles.infoContainer}>
          <Icon name="info-circle" size={20} color="#132A17" />
          <Text style={styles.infoText}>
            If the device details are not showing, try relogging in your
            account.
          </Text>
        </View>
        <View style={styles.doneButtonContainer}>
          <Pressable style={styles.doneButton} onPress={handleDonePress}>
            <Text style={styles.doneButtonText}>Done</Text>
          </Pressable>
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Connection Successful!</Text>
            <Text style={styles.modalContent}>
              Your account and your device are successfully linked.
            </Text>
            <Pressable style={styles.closeButton} onPress={toggleModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  aboutUsScreen: {
    backgroundColor: "#69b578",
    flex: 1,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9E2D0",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: Border.br_xl,
    paddingTop: Constants.statusBarHeight,
  },
  iconLeft: {
    padding: 10,
  },
  title: {
    fontSize: 25,
    fontFamily: "Poppins-SemiBold",
    color: "#132A17",
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -100 }, { translateY: 20 }],
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "baseline",
    padding: 30,
  },
  instruction: {
    fontSize: 18,
    marginVertical: 10,
    color: "#132A17",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  infoText: {
    fontSize: 14,
    color: "#132A17",
    marginLeft: 10,
    flex: 1,
  },
  doneButtonContainer: {
    width: "100%",
    justifyContent: "center", // Center vertically
    alignItems: "center",
  },
  doneButton: {
    marginTop: 20,
    backgroundColor: "#132A17",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: "center",
  },
  doneButtonText: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: "#ffffff",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Semi-transparent background
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
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#3A7D44",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
  },
});

export default DeviceAccountInfoUpdate;
