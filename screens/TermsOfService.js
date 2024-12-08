import * as React from "react";
import { Image } from "expo-image"; // Make sure you have expo-image installed
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontSize, FontFamily } from "../GlobalStyles";

// Import your image
import iconImage from '../assets/Icon2.png'; // Adjust the path as necessary

const TermsOfService = () => {
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
          TERMS OF SERVICE
        </Text>
        <Text style={styles.HeaderDescription1}>
        Welcome to our mobile application and device service for detecting rice
        ear bugs. By using our services, you agree to comply with and be bound
        by the following terms and conditions. Please review them carefully.
        </Text>
      </View>
      
      <View style={styles.Container2}>
        <Text style={styles.Header2}>
        Acceptance of terms
        </Text>
        <Text style={styles.HeaderDescription2}>
        By accessing and using our mobile application and device, you accept and
        agree to be bound by these Terms of Service and our Privacy Policy.
        </Text>
      </View>
      
      <View style={styles.Container3}>
        <Text style={styles.Header3}>
        Use of services
        </Text>
        <Text style={styles.HeaderDescription3}>
        Account Registration: You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.{"\n"}{"\n"}
        Prohibited Conduct: You agree not to use the services for any unlawful purpose or in any way that could harm or disable our operations.{"\n"}{"\n"}
        By using our services, you acknowledge that you have read, understood,
        and agree to be bound by these Terms of Service.
        
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
    height: "35%",
    backgroundColor: "",
    alignItems: "center", // Center the image horizontally
    marginLeft: "0%",
    padding: 25, // Add padding for better text layout
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
    height: "13%",
    backgroundColor: "",
    alignItems: "", // Center the image horizontally
    marginTop: "0%",
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
    height: "35%",
    backgroundColor: "",
    alignItems: "", // Center the image horizontally
    marginTop: "0%",
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

export default TermsOfService;
