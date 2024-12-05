import * as React from "react";
import { StyleSheet, View, Text, Pressable, Alert } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { FontSize, FontFamily, Border, Color } from "../../GlobalStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import Constants from "expo-constants";
import { AuthContext } from "../../context/authContext";
import AnimatedLoader from "react-native-animated-loader";

const DeviceConfirm = () => {
  const navigation = useNavigation();
  const [state] = React.useContext(AuthContext);
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const handleNextPress = async () => {
    const userId = state.user._id;
    const registeredEmail = state.user.email;

    const updatePayload = {
      userId,
      registeredEmail,
    };
    try {
      const response = await fetch("http://10.42.0.1:8000/data", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatePayload),
      });

      if (response.ok) {
        const responseData = await response.json();
        Alert.alert("Success", "Device data updated successfully!");
        navigation.navigate("Device Account Info Update", { deviceData: data });
      } else {
        const errorData = await response.json();
        Alert.alert("Error", `Failed to update: ${errorData.message}`);
      }
    } catch (error) {
      Alert.alert("Error", "Unable to connect to the device.");
    }
  };

  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null; // You can replace this with a loading indicator if needed
  }

  React.useEffect(() => {
    // Fetch data from the Raspberry Pi FastAPI server
    const fetchData = async () => {
      try {
        const response = await fetch("http://10.42.0.1:8000/data");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.aboutUsScreen}>
      <View style={styles.header}>
        <Pressable
          style={styles.iconLeft}
          onPress={() => navigation.navigate("Add Device")}
        >
          <Icon name="chevron-left" size={30} color="#132A17" />
        </Pressable>

        <Text style={styles.title}>Device Confirmation</Text>
      </View>

      {/* Conditional rendering for loading state */}
      {loading ? (
        <View style={styles.contentContainer}>
          <Text style={[styles.messageText, { paddingTop: 180 }]}>
            Fetching your device details...
          </Text>
          <AnimatedLoader
            visible={true}
            overlayColor="rgba(255,255,255,0)"
            source={require("../../assets/loader.json")}
            animationStyle={styles.lottie}
            speed={0.75}
          />
        </View>
      ) : error ? (
        <View style={styles.contentContainer}>
          <Text style={[styles.messageText, { paddingTop: 250 }]}>
            Error: {error}
          </Text>
        </View>
      ) : (
        <View style={styles.contentContainer}>
          {data ? (
            // Check if the device is already connected to another account
            data.data.userId && data.data.registeredEmail ? (
              <View style={styles.contentContainer}>
                <Text
                  style={[
                    styles.messageText,
                    { paddingTop: 250, paddingBottom: 10 },
                  ]}
                >
                  This device is already connected to another account.
                </Text>
                <Text style={styles.messageText}>
                  Account Email: {"\n"}
                  {data.data.registeredEmail}
                </Text>
              </View>
            ) : (
              <>
                <Image
                  source={require("../../assets/Device_3D View.png")}
                  style={styles.deviceImage}
                />
                <Text>Device Id: {data.data.deviceId}</Text>
                <Text>Device Name: {data.data.deviceName}</Text>
                <View style={styles.infoContainer}>
                  <Icon name="info-circle" size={20} color="#132A17" />
                  <Text style={styles.infoText}>
                    If the details shown in the device's LCD are the same as
                    shown here, proceed to the next step.
                  </Text>
                </View>
                <View style={styles.buttonContainer}>
                  <Pressable
                    style={styles.nextButton}
                    onPress={handleNextPress}
                  >
                    <Text style={styles.nextButtonText}>Next</Text>
                  </Pressable>
                </View>
              </>
            )
          ) : (
            <Text style={[styles.messageText, { paddingTop: 250 }]}>
              No data found
            </Text>
          )}
        </View>
      )}
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
    zIndex: 1,
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
    transform: [{ translateX: -100 }, { translateY: 20 }], // Offset by half its width for perfect centering
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#69b578",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 30,
  },
  lottie: {
    width: 300,
    height: 300,
  },
  messageText: {
    fontSize: 20,
    color: "#132A17",
    textAlign: "center", // Horizontally center the text
    justifyContent: "center", // Vertically center the text in the container
    alignItems: "center",
  },
  deviceImage: {
    width: 125,
    height: 450, // Adjust height to match the layout
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

export default DeviceConfirm;
