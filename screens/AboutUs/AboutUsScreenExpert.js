import * as React from "react";
import {StyleSheet,View,Text,TouchableOpacity,Pressable,} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Border, Color, FontFamily, FontSize } from "../../GlobalStyles";
import Icon from "react-native-vector-icons/Octicons";

const AboutUsScreenExpert = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.aboutUsScreenExpert}>
      <View style={[styles.aboutUsScreenExpertChild, styles.aboutPosition]} />
      <Text style={[styles.expertText]}>EXPERT</Text>
      <View style={styles.button}>
        <Image
          style={[styles.buttonChild, styles.vectorIconLayout1]}
          contentFit="cover"
          source={require("../../assets/rectangle-12.png")}
        />
      </View>
      <View style={[styles.aboutUsScreenExpertItem, styles.aboutPosition]} />
      <Pressable
        style={[styles.homeIcon]}
        onPress={() => navigation.navigate("HomeScreen")}
      >
        <Icon name="home" size={35} color="#132A17" />
      </Pressable>

      <Pressable
        style={[styles.arrowleft]}
        onPress={() => navigation.navigate("AboutUsScreen")}
      >
        <Icon name="arrow-left" size={35} color="#132A17" />
      </Pressable>

      <Icon
        name="feed-person"
        size={35}
        color="#3A7D44"
        style={[styles.informationIcon]}
      />

      <Pressable
        style={[styles.controlIcon]}
        onPress={() => navigation.navigate("ControlOff")}
      >
        <Icon name="plus-circle" size={35} color="#132A17" />
      </Pressable>

      <Pressable
        style={[styles.graphIcon]}
        onPress={() => navigation.navigate("Stats")}
      >
        <Icon name="graph" size={32} color="#132A17" />
      </Pressable>

      <Text style={[styles.expertDescription]}>
        We are collaborating with Mr. Daryl Hernandez, an entomologist with 12
        years of experience in urban pest management, agriculture, and the
        pesticide industry. Mr. Hernandez is a key expert from Raidex Solutions
        Inc., a company renowned for its innovative pest control solutions. His
        extensive knowledge and practical expertise in managing agricultural
        pests provide a solid foundation for our research efforts.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  aboutPosition: {
    borderRadius: Border.br_xl,
    left: "0%",
    right: "0%",
    position: "absolute",
    width: "100%",
  },
  vectorIconLayout1: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    position: "absolute",
  },
  aboutUsScreenExpertChild: {
    height: "15.78%",
    top: "-3.12%",
    bottom: "87.34%",
    backgroundColor: Color.colorAntiquewhite,
  },
  expertText: {
    height: "4.53%",
    width: "32.28%",
    top: "7.25%",
    left: "34.33%",
    fontSize: 28,
    position: "absolute",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 2,
    textAlign: "center",
    color: Color.colorBlack,
    fontFamily: "Poppins-SemiBold",
    fontWeight: "600",
  },
  arrowleft: {
    height: "15.47%",
    width: "25.53%",
    top: "7.28%",
    right: "86.81%",
    bottom: "93.25%",
    left: "3.67%",
    position: "absolute",
    overflow: "hidden",
  },
  informationIcon: {
    height: "13.42%",
    right: "5.83%",
    bottom: "2.53%",
    left: "81.33%",
    width: "10.83%",
    top: "93.04%",
    position: "absolute",
  },
  graphIcon: {
    height: "13.85%",
    width: "16.89%",
    position: "absolute",
    top: "93.12%",
    left: "34.56%",
  },
  buttonChild: {
    height: "100%",
    top: "0%",
    bottom: "0%",
    borderRadius: Border.br_4xs,
    left: "0%",
    right: "0%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    width: "100%",
  },
  button: {
    height: "30.78%",
    width: "80.56%",
    top: "16.72%",
    right: "9.72%",
    bottom: "52.5%",
    left: "9.72%",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    position: "absolute",
  },
  aboutUsScreenExpertItem: {
    height: "14.53%",
    top: "90.66%",
    bottom: "-2.19%",
    backgroundColor: Color.colorPeachpuff,
    position: "absolute",
  },
  homeIcon: {
    height: "10.06%",
    width: "10.28%",
    top: "92.86%",
    left: "10.83%",
    position: "absolute",
  },
  controlIcon: {
    height: "10.06%",
    width: "10.28%",
    top: "93.16%",
    left: "58.53%",
    position: "absolute",
  },
  expertDescription: {
    left: "6.25%",
    height: "37.5%",
    width: "90%",
    top: "50.63%",
    fontSize: 15,
    color: "#F9E2D0",
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
    fontWeight: "600",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    position: "absolute",
  },
  aboutUsScreenExpert: {
    backgroundColor: Color.colorMediumseagreen,
    flex: 1,
    height: 640,
    overflow: "hidden",
    width: "100%",
  },
});

export default AboutUsScreenExpert;
