import * as React from "react";
import {StyleSheet, View, Text, TouchableOpacity, Pressable,} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Border, Color, FontFamily, FontSize } from "../../GlobalStyles";
import Icon from "react-native-vector-icons/Octicons";

const AboutUsScreenClient = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.aboutUsScreenClient}>
      <View style={[styles.aboutUsScreenClientChild, styles.aboutPosition]} />
      <Text style={[styles.clientText]}>CLIENT</Text>
      <View style={styles.button}>
        <Image
          style={[styles.buttonChild, styles.vectorIconLayout]}
          contentFit="cover"
          source={require("../../assets/rectangle-11.png")}
        />
      </View>
      <Text style={[styles.clientDescription]}>
        Our client is a community of farmers from Krus na Ligas, Quezon City,
        who are facing significant challenges due to rice bugs infesting their
        rice crops. These pests are not only reducing their yield but also
        threatening their livelihood. Our research aims to address this critical
        issue by leveraging advanced computer engineering techniques to develop
        innovative solutions tailored specifically to their needs.
      </Text>
      <View style={[styles.aboutUsScreenClientItem, styles.aboutPosition]} />
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
        onPress={() => navigation.navigate("DeviceStatus")}
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
  aboutPosition: {
    borderRadius: Border.br_xl,
    left: "0%",
    right: "0%",
    position: "absolute",
    width: "100%",
  },
  vectorIconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  clientDescription: {
    top: "50.23%",
    color: "#F9E2D0",
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
    fontWeight: "600",
    position: "absolute",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    left: "2.55%",
  },
  aboutUsScreenClientChild: {
    height: "15.78%",
    top: "-3.12%",
    bottom: "87.34%",
    backgroundColor: Color.colorAntiquewhite,
  },
  clientText: {
    height: "4.53%",
    width: "32.28%",
    top: "7.25%",
    left: "35.33%",
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
  buttonChild: {
    height: "100%",
    top: "0%",
    bottom: "0%",
    borderRadius: Border.br_4xs,
    left: "0%",
    right: "0%",
    maxHeight: "100%",
    maxWidth: "100%",
    width: "100%",
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
  aboutUsScreenClientItem: {
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
  graphIcon: {
    height: "13.85%",
    width: "16.89%",
    position: "absolute",
    top: "93.12%",
    left: "34.56%",
  },
  aboutUsScreenClient: {
    backgroundColor: Color.colorMediumseagreen,
    flex: 1,
    height: 640,
    overflow: "hidden",
    width: "100%",
  },
});

export default AboutUsScreenClient;
