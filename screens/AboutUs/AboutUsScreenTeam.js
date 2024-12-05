import * as React from "react";
import {StyleSheet,Text,View,Pressable,TouchableOpacity,} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { Border, Color, FontFamily, FontSize } from "../../GlobalStyles";
import Icon from "react-native-vector-icons/Octicons";

const AboutUsScreenTeam = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.aboutUsScreenTeam}>
      <View style={[styles.aboutUsScreenTeamChild, styles.aboutLayout]} />
      <Text style={[styles.teamText]}>TEAM</Text>
      <View style={styles.button}>
        <Image
          style={[styles.buttonChild, styles.buttonChildLayout]}
          contentFit="cover"
          source={require("../../assets/rectangle-1.png")}
        />
      </View>
      <Text style={[styles.teamDescription]}>
        Our team is composed of four members: Aaron, Dhan, Arwen and Andrew.
        With diverse expertise in Intelligent Systems (Arwen and Andrew), System
        Administration (Aaron), and Data Science (Dhan), we believe that our
        combined efforts and unique insights enable us to produce high-quality
        and meaningful research. Together, we are committed to achieve
        excellence and make a significant impact in our field.
      </Text>
      <View style={[styles.aboutUsScreenTeamItem, styles.aboutLayout]} />
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
        style={[styles.information]}
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
    </View>
  );
};

const styles = StyleSheet.create({
  aboutLayout: {
    borderRadius: Border.br_xl,
    position: "absolute",
    width: "100%",
  },
  buttonChildLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  teamDescription: {
    top: "50.23%",
    color: "#F9E2D0",
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
    fontWeight: "600",
    position: "absolute",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    left: "-0.50%",
  },
  aboutUsScreenTeamChild: {
    height: "15.78%",
    top: "-2.5%",
    bottom: "86.72%",
    backgroundColor: Color.colorAntiquewhite,
    left: "0%",
    right: "0%",
  },
  teamText: {
    height: "4.53%",
    width: "25.28%",
    top: "7.41%",
    left: "38.61%",
    fontSize: 28,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 2,
    textAlign: "center",
    color: Color.colorBlack,
    fontFamily: "Poppins-SemiBold",
    fontWeight: "600",
    position: "absolute",
  },
  buttonChild: {
    height: "100%",
    top: "0%",
    bottom: "0%",
    borderRadius: Border.br_4xs,
    left: "0%",
    right: "0%",
    width: "100%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
  },
  button: {
    height: "30.78%",
    width: "80.56%",
    top: "16.41%",
    right: "9.72%",
    bottom: "52.81%",
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
  information: {
    height: "13.42%",
    right: "5.83%",
    bottom: "2.53%",
    left: "81.33%",
    width: "10.83%",
    top: "93.04%",
    position: "absolute",
  },
  aboutUsScreenTeamItem: {
    height: "14.53%",
    top: "90.66%",
    right: "-0.28%",
    bottom: "-2.34%",
    left: "0.18%",
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
  taskIcon: {
    height: "4.84%",
    width: "9.44%",
    right: "59.44%",
    bottom: "4.38%",
    left: "31.11%",
  },
  controlIcon: {
    height: "10.06%",
    width: "10.28%",
    top: "93.16%",
    left: "58.53%",
    position: "absolute",
  },
  graphIcon: {
    height: "13.85%",
    width: "16.89%",
    position: "absolute",
    top: "93.12%",
    left: "34.56%",
  },
  aboutUsScreenTeam: {
    backgroundColor: Color.colorMediumseagreen,
    flex: 1,
    height: 640,
    overflow: "hidden",
    width: "100%",
  },
});

export default AboutUsScreenTeam;
