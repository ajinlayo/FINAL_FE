import * as React from "react";
import { Image } from "expo-image"; // Make sure you have expo-image installed
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontSize, FontFamily } from "../GlobalStyles";

// Import your image
import iconImage from '../assets/Icon2.png'; // Adjust the path as necessary

const PrivacyPolicy = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.Background}>
      <View style={styles.Container1}>
        {/* Add the Image component here */}
        <Image
          source={iconImage}
          style={styles.image}
          contentFit="contain" // Adjust the resize mode as needed
        />
        <Text style={styles.Header1}>
          PRIVACY POLICY
        </Text>
        <Text style={styles.HeaderDescription1}>
          We are committed to protecting the privacy and personal information of
          users who engage with our mobile application and use our device designed
          to detect rice ear bugs. This privacy policy outlines our practices
          regarding the collection, use, and protection of personal information in
          compliance with relevant privacy laws and regulations.
        </Text>
      </View>
      
      <View style={styles.Container2}>
        <Text style={styles.Header2}>
          Information we collect
        </Text>
        <Text style={styles.HeaderDescription2}>
          Personal Information: This may include names, email, and other identifiers necessary for providing our services.{"\n"}{"\n"}
          Data: Images captured by the device and detection results.
        </Text>
      </View>
      
      <View style={styles.Container3}>
        <Text style={styles.Header3}>
          How we use information
        </Text>
        <Text style={styles.HeaderDescription3}>
          The use of data collection is for the following purposes:{"\n"}{"\n"}
          To protect the user’s data history upon logging in/out.{"\n"}{"\n"}
          To provide a statistics and report about the rice ear bugs detected.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Background: {
    backgroundColor: "#132A17",
    flex: 1,
    width: "100%",
    height: "100%", // Use flex to fill the screen
    overflow: "hidden",
  },
  image: {
    width: "50%", // Adjust width as needed
    height: "50%", // Adjust height as needed
  },
  Container1: {
    width: "100%",
    height: "40%",
    backgroundColor: "",
    alignItems: "center", // Center the image horizontally
    marginLeft: "0%",
    padding: 20, // Add padding for better text layout
  },
  Header1: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  HeaderDescription1: {
    color: "#69B578",
    fontWeight: "bold",
    textAlign: 'center', // Justify text
    marginTop: 10, // Add some margin for spacing
  },
  Container2: {
    width: "80%",
    height: "20%",
    backgroundColor: "",
    alignItems: "", // Center the image horizontally
    marginTop: "5%",
    padding: 10, // Add padding for better text layout
  },
  Header2:{
    color: "#F6D4BA",
    fontWeight: "bold",
    fontSize: 18,
  },
  HeaderDescription2:{
    color: "#69B578",
    fontWeight: "bold",
  },
  Container3: {
    width: "80%",
    height: "22%",
    backgroundColor: "",
    alignItems: "", // Center the image horizontally
    marginTop: "2%",
    padding: 10, // Add padding for better text layout
  },
  Header3:{
    color: "#F6D4BA",
    fontWeight: "bold",
    fontSize: 18,
  },
  HeaderDescription3:{
    color: "#69B578",
    fontWeight: "bold",
  },
});

export default PrivacyPolicy;