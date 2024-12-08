import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Button,
  Alert,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { FontSize, FontFamily, Border, Color } from "../GlobalStyles";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
import "regenerator-runtime/runtime";
import Constants from "expo-constants";

const Details = ({ route }) => {
  const navigation = useNavigation();
  const { deviceId } = route.params;
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [detections, setDetections] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [detectionInfo, setDetectionInfo] = useState({
    numberOfBugs: 0,
    bugsConfidenceScore: 0,
    numberOfPanicles: 0,
    paniclesConfidenceScore: 0,
    date: "N/A",
    time: "N/A",
  });

  useEffect(() => {
    const fetchDetectionData = async () => {
      try {
        const response = await axios.get(
          `/auth/filter-detections?deviceId=${deviceId}`
        );
        const data = response.data.detections;
        if (response.data.success) {
          const sortedData = data.sort((a, b) => {
            const dateA = new Date(`${a.date} ${a.time}`);
            const dateB = new Date(`${b.date} ${b.time}`);
            return dateA - dateB;
          });
          setDetections(sortedData);
          setDetectionInfo({
            numberOfBugs: sortedData[0].numberOfBugs,
            bugsConfidenceScore: sortedData[0].bugsConfidenceScore,
            numberOfPanicles: sortedData[0].numberOfPanicles,
            paniclesConfidenceScore: sortedData[0].paniclesConfidenceScore,
            date: sortedData[0].date,
            time: sortedData[0].time,
          });
        } else {
          Alert.alert("Error", "Failed to load detection data.");
        }
      } catch (error) {
        console.error("Error fetching detection data", error);
        Alert.alert("Error", "Failed to load detection data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetectionData();
  }, []);

  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded || isLoading) {
    return (
      <ActivityIndicator
        size="large"
        color={Color.colorBlack}
        style={styles.loading}
      />
    );
  }

  const showPreviousDetection = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      const prevDetection = detections[prevIndex];
      setDetectionInfo({
        numberOfBugs: prevDetection.numberOfBugs,
        bugsConfidenceScore: prevDetection.bugsConfidenceScore,
        numberOfPanicles: prevDetection.numberOfPanicles,
        paniclesConfidenceScore: prevDetection.paniclesConfidenceScore,
        date: prevDetection.date,
        time: prevDetection.time,
      });
    } else {
      Alert.alert(
        "No Previous Results",
        "You are already at the first detection."
      );
    }
  };

  const showNextDetection = () => {
    if (currentIndex < detections.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      const nextDetection = detections[nextIndex];
      setDetectionInfo({
        numberOfBugs: nextDetection.numberOfBugs,
        bugsConfidenceScore: nextDetection.bugsConfidenceScore,
        numberOfPanicles: nextDetection.numberOfPanicles,
        paniclesConfidenceScore: nextDetection.paniclesConfidenceScore,
        date: nextDetection.date,
        time: nextDetection.time,
      });
    } else {
      Alert.alert("No Next Results", "You are already at the last detection.");
    }
  };

  const showLatestDetection = () => {
    if (detections.length > 0) {
      const latestDetection = detections[detections.length - 1];
      console.log(detections);
      setDetectionInfo({
        numberOfBugs: latestDetection.numberOfBugs,
        bugsConfidenceScore: latestDetection.bugsConfidenceScore,
        numberOfPanicles: latestDetection.numberOfPanicles,
        paniclesConfidenceScore: latestDetection.paniclesConfidenceScore,
        date: latestDetection.date,
        time: latestDetection.time,
      });
    }
  };

  const showSummary = () => {
    return detectionInfo.numberOfBugs === 0
      ? "NO BUGS FOUND! THE DEVICE IS EFFECTIVELY MANAGING ITS TASKS."
      : "!!BUGS HAVE BEEN DETECTED!! ALLOW THE DEVICE TO RUN FOR EFFICIENT EXECUTION AND AUTOMATIC RESOLUTION.";
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.aboutUsScreen}>
      <View style={styles.header}>
        <Pressable style={styles.iconLeft} onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={30} color="#132A17" />
        </Pressable>
        <Text style={styles.title}>DETAILS</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.container}>
          <Image
            source={
              imageUrl
                ? { uri: imageUrl }
                : require("../assets/sample-image.png")
            }
            style={styles.image}
          />
          <View style={styles.dateTimeSection}>
            <View style={styles.dateTimeRow}>
              <Text style={styles.labelText}>Date Created</Text>
              <Text style={styles.labelText}>Time Created</Text>
            </View>
            <View style={styles.dateTimeRow}>
              <Text style={styles.valueText}>{detectionInfo.date}</Text>
              <Text style={styles.valueText}>{detectionInfo.time}</Text>
            </View>
          </View>

          <Text style={styles.text}>More details of the report:</Text>
          <View style={styles.reportContainer}>
            <View style={styles.reportRow}>
              <Icon name="bug" size={20} style={styles.icon} />
              <Text>
                Bugs Detected:{" "}
                <Text style={styles.valueText}>
                  {detectionInfo.numberOfBugs}
                </Text>
              </Text>
            </View>
            <View style={styles.reportRow}>
              <Icon name="bar-chart" size={20} style={styles.icon} />
              <Text>
                Average Confidence Score (Bugs):{" "}
                <Text style={styles.valueText}>
                  {detectionInfo.bugsConfidenceScore * 100} %
                </Text>
              </Text>
            </View>
            <View style={styles.reportRow}>
              <Icon name="leaf" size={20} style={styles.icon} />
              <Text>
                Panicles Detected:{" "}
                <Text style={styles.valueText}>
                  {detectionInfo.numberOfPanicles}
                </Text>
              </Text>
            </View>
            <View style={styles.reportRow}>
              <Icon name="bar-chart" size={20} style={styles.icon} />
              <Text>
                Average Confidence Score (Panicles):{" "}
                <Text style={styles.valueText}>
                  {detectionInfo.paniclesConfidenceScore * 100} %
                </Text>
              </Text>
            </View>
          </View>
          <View style={styles.iconRow}>
            <Pressable onPress={showPreviousDetection}>
              <Icon name="arrow-left" size={30} style={styles.icon} />
            </Pressable>
            <Pressable onPress={showLatestDetection}>
              <Icon name="refresh" size={30} style={styles.icon} />
            </Pressable>
            <Pressable onPress={showNextDetection}>
              <Icon name="arrow-right" size={30} style={styles.icon} />
            </Pressable>
          </View>

          <View style={styles.buttonsContainer}>
            <Pressable onPress={toggleModal} style={styles.button}>
              <Text style={styles.buttonText}>Download Image</Text>
            </Pressable>

            <Pressable onPress={toggleModal} style={styles.button}>
              <Text style={styles.buttonText}>Suggested Actions</Text>
            </Pressable>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={isModalVisible}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>
                  Suggested actions for farmers:
                </Text>
                <Text style={styles.modalText}>
                  For {detectionInfo.numberOfBugs} bugs detected, you should use
                  pest control measures.
                </Text>
                <Text style={styles.modalText}>
                  For {detectionInfo.numberOfPanicles} panicles, ensure proper
                  irrigation and growth conditions.
                </Text>
                <Pressable
                  onPress={() => setIsModalVisible(false)}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
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
    left: "55%",
    transform: [{ translateX: -50 }], // Center title horizontally
    top: 40,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  container: {
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 5,
  },
  dateTimeSection: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 5,
    justifyContent: "space-around",
    width: "80%", // Center content within container
  },
  dateTimeRow: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  labelText: {
    fontSize: 16,
    color: "#3a573f",
    textAlign: "center",
    justifyContent: "center",
    letterSpacing: 2,
  },
  valueText: {
    fontSize: 16,
    color: "#333333",
    fontWeight: "bold",
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  reportContainer: {
    backgroundColor: "#c7d6ca",
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    width: "90%", // Align to center relative to parent
  },
  reportRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  icon: {
    marginRight: 10,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "70%",
    marginTop: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    top: 10, // Position buttons at the bottom
    width: "100%",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 5,
  },
  closeButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});


export default Details;
