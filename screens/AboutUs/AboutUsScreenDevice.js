import * as React from "react";
import {StyleSheet,View,Text,TouchableOpacity,Pressable} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Border, FontFamily, FontSize, Color } from "../../GlobalStyles";
import Icon from "react-native-vector-icons/Octicons";

const AboutUsScreenDevice = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.aboutUsScreenDevice}>
      <View style={[styles.aboutUsScreenDeviceChild, styles.aboutLayout]} />
      <Text style={[styles.deviceText]}>DEVICE</Text>
      <Text
        style={[styles.deviceDescription]}
      >{`The device consists of several components such as the attractant modules (UV light and piezo buzzer), the web camera, and the DC fans. The enclosure of the components is made of transparent acrylic with a thickness of 3 millimeters. In addition to that, the bait compartment in the figure, which holds the attractant modules, is a customized 3D printed model made with PETG filament.
`}</Text>
      <View style={[styles.aboutUsScreenDeviceItem, styles.aboutLayout]} />
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

      <View style={[styles.button, styles.buttonPosition]}>
        <View style={[styles.buttonChild, styles.childPosition]} />
        <Image
          style={[styles.hardwareDesign1, styles.vectorIconLayout]}
          contentFit="cover"
          source={require("../../assets/hardware-design1.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  aboutLayout: {
    borderRadius: Border.br_xl,
    position: "absolute",
    width: "100%",
  },
  vectorIconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  buttonPosition: {
    left: "7.5%",
    position: "absolute",
  },
  aboutUsScreenDeviceChild: {
    height: "15.78%",
    top: "-2.5%",
    bottom: "86.72%",
    backgroundColor: Color.colorAntiquewhite,
    left: "0%",
    right: "0%",
  },
  deviceText: {
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
  deviceDescription: {
    height: "32.5%",
    width: "85.83%",
    top: "51.56%",
    fontSize: 16,
    color: "#AFE1AF",
    left: "6.94%",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
    fontWeight: "600",
    position: "absolute",
    color: "#F9E2D0",
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
  aboutUsScreenDeviceItem: {
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
  buttonChild: {
    height: "97%",
    top: "4%",
    bottom: "0%",
    borderRadius: Border.br_4xs,
    backgroundColor: "rgba(255, 255, 255, 1)",
    left: "20%",
    right: "10%",
    maxHeight: "100%",
    maxWidth: "100%",
  },
  childPosition: {
    left: "4%",
    right: "0%",
  },
  button: {
    height: "30.78%",
    width: "80.56%",
    top: "17.03%",
    right: "11.94%",
    bottom: "52.19%",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
  },
  graphIcon: {
    height: "13.85%",
    width: "16.89%",
    position: "absolute",
    top: "93.12%",
    left: "34.56%",
  },
  buttonShadowBox: {
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
  },
  hardwareDesign1: {
    height: "89.54%",
    width: "60.06%",
    top: "8.8%",
    right: "13.06%",
    bottom: "52.66%",
    left: "23.89%",
    position: "absolute",
  },
  aboutUsScreenDevice: {
    backgroundColor: Color.colorMediumseagreen,
    flex: 1,
    height: 640,
    overflow: "hidden",
    width: "100%",
  },
});

export default AboutUsScreenDevice;
