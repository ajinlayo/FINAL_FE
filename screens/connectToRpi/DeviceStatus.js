import * as React from "react";
import { StyleSheet, View, Text, Pressable, Modal } from "react-native";
import { Image } from "expo-image"; // Make sure you are using the correct import if using expo-image
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { FontSize, FontFamily, Border, Color } from "../../GlobalStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import Constants from "expo-constants";
import { AuthContext } from "../../context/authContext";
import AnimatedLoader from "react-native-animated-loader";

const DeviceStatus = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [state] = React.useContext(AuthContext);

  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null; // You can replace this with a loading indicator if needed
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAddDevice = () => {
    navigation.navigate("Add Device");
  };

  return (
    <View style={styles.aboutUsScreen}>
      <View style={styles.header}>
        <Pressable
          style={styles.iconLeft}
          onPress={() => navigation.navigate("HomeScreen")}
        >
          <Icon name="chevron-left" size={30} color="#132A17" />
        </Pressable>

        <Text style={styles.title}>Device Status</Text>

        <Pressable style={styles.iconRight} onPress={toggleModal}>
          <Icon name="question-circle-o" size={30} color="#132A17" />
        </Pressable>
      </View>

      <View style={styles.contentContainer}>
        {state.user ? (
          state.user.connectedToDevice ? (
            // Display device ID if connectedToDevice is true
            <View style={styles.deviceContentContainer}>
              <Image
                source={require("../../assets/Device_3D View.png")}
                style={styles.deviceImage}
              />
              <View style={styles.textContainer}>
                <Text style={styles.deviceDetailsText}>
                  ID: {state.user.deviceId}
                </Text>
                <Text style={styles.deviceDetailsText}>
                  Name: AgriSense Pest Control System
                </Text>
                <Text style={styles.deviceDetailsText}>
                  Connected To: {state.user.username}
                </Text>
                <Text style={styles.deviceDetailsText}>
                  Last Detection Activity: {state.user.updatedAt}
                </Text>
                <Text style={styles.deviceDetailsText}>Status: Connected</Text>
              </View>
            </View>
          ) : (
            // Display warning icon if connectedToDevice is false
            <View style={styles.noDeviceContainer}>
              <Icon name="exclamation-triangle" size={50} color="#132A17" />
              <Text style={styles.deviceIdText}>
                No device connected to your account.
              </Text>
              <Pressable
                style={styles.addDeviceButton}
                onPress={() => handleAddDevice()}
              >
                <Text style={styles.addDeviceButtonText}>Add Device</Text>
              </Pressable>
            </View>
          )
        ) : (
          // If user data is not yet available, loader will display
          <AnimatedLoader
            visible={true}
            overlayColor="rgba(255,255,255,0.25)"
            source={require("../../assets/loader.json")}
            animationStyle={styles.lottie}
            speed={0.75}
          />
        )}
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Info</Text>
            <Text style={styles.modalContent}>
              This contains what device is connected to your account, and its
              current status.
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
    justifyContent: "space-between",
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
    textAlign: "center",
  },
  iconRight: {
    padding: 10,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#69b578",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20,
  },
  noDeviceContainer: {
    flex: 1,
    backgroundColor: "#69b578",
    justifyContent: "center",
    alignItems: "center",
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
  deviceIdText: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "#141115",
  },
  lottie: {
    width: 300,
    height: 300,
  },
  deviceContentContainer: {
    flexDirection: "column", // Align items horizontally
    alignItems: "center", // Ensure vertical alignment
    padding: 10,
    paddingTop: 2,
    paddingBottom: 50,
  },
  deviceImage: {
    width: 125,
    height: 450, // Adjust height to match the layout
  },
  textContainer: {
    flex: 1, // Allow the text container to take up the remaining space
    justifyContent: "center", // Align text vertically in the container
  },
  deviceDetailsText: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold", // Replace with your font
    color: "#000", // Text color
    marginBottom: 2, // Space between the texts
  },
  addDeviceButton: {
    backgroundColor: "#3A7D44", // Button background color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    elevation: 3, // Adds shadow on Android
    marginTop: 20, // Space above the button
  },
  addDeviceButtonText: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "#fff", // Text color
    textAlign: "center",
  },
});

export default DeviceStatus;
