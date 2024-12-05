import * as React from "react";
import { StyleSheet, View, Text, Pressable, Modal } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { FontSize, FontFamily, Border, Color } from "../../GlobalStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import Constants from "expo-constants";
import { AuthContext } from "../../context/authContext";

const AddDevice = () => {
  const navigation = useNavigation();
  const [isPressed, setIsPressed] = React.useState(false);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [state] = React.useContext(AuthContext);

  const handleNextPress = () => {
    navigation.navigate("Device Confirm");
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
          onPress={() => navigation.navigate("HomeScreen")}
        >
          <Icon name="chevron-left" size={30} color="#132A17" />
        </Pressable>

        <Text style={styles.title}>Add Device</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.heading}>Let's get started!</Text>
        <Text style={styles.instructions}>
          Follow these instructions carefully to connect your account to the
          device:
        </Text>
        <Text style={styles.step}>
          1. Turn on the device. Wait for a few seconds to initialize.
        </Text>
        <Text style={styles.step}>
          2. Open the WiFi settings on your phone.
        </Text>
        <Text style={styles.step}>3. Connect to the device's network.</Text>
        <View style={styles.wifiCredContainer}>
          <View style={styles.wifiCredTextContainer}>
            <Icon name="wifi" size={25} color="#132A17" />
            <Text style={styles.wifiCredText}>SSID: MyEnto-RPI</Text>
            <Text style={styles.wifiCredText}>Password: MyEntoT36</Text>
          </View>
        </View>
        <Text style={styles.step}>
          4. Look at the LCD of the device for your reference to the next step.
        </Text>

        <View style={styles.infoContainer}>
          <Icon name="info-circle" size={20} color="#132A17" />
          <Text style={styles.infoText}>
            Once connected to the network, please proceed by tapping Next.
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.nextButton} onPress={handleNextPress}>
            <Text style={styles.nextButtonText}>Next</Text>
          </Pressable>
        </View>
      </View>
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
    justifyContent: "space-between", // Space between for the arrow and any potential right-side element
    backgroundColor: "#F9E2D0",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: Border.br_xl,
    paddingTop: Constants.statusBarHeight,
    position: "relative", // Required for absolute positioning within
  },
  iconLeft: {
    padding: 10,
  },
  title: {
    fontSize: 25,
    fontFamily: "Poppins-SemiBold",
    color: "#132A17",
    position: "absolute", // Make the title absolutely positioned
    left: "50%", // Move to the center horizontally
    transform: [{ translateX: -50 }, { translateY: 20 }], // Offset by half its width for perfect centering
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#69b578",
    justifyContent: "flex-start",
    alignItems: "baseline",
    padding: 30,
  },
  heading: {
    fontSize: 22,
    fontFamily: "Poppins-Bold",
    color: "#141115",
    marginBottom: 10,
  },
  instructions: {
    fontSize: 16,
    color: "#141115",
    marginBottom: 20,
  },
  step: {
    fontSize: 16,
    color: "#ffffff",
    marginBottom: 10,
  },
  wifiCredContainer: {
    alignItems: "center",
    width: "100%",
  },
  wifiCredTextContainer: {
    backgroundColor: "rgba(115, 122, 133, 0.5)",

    padding: 15,
    borderRadius: 8,
    marginVertical: 10, // Space above and below the container
    alignItems: "center", // Center items horizontally
    justifyContent: "center", // Center items vertically
  },
  wifiCredText: {
    fontFamily: "monospace", // Monospace font for coding style
    fontSize: 14,
    color: "#000", // Black text for visibility
    marginTop: 5,
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
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  nextButton: {
    backgroundColor: "#132A17",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: "#ffffff",
  },
});

export default AddDevice;
