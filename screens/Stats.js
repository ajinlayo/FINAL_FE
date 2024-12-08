import * as React from "react";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Alert,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import { Border, FontSize, FontFamily, Color } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { BarChart } from "react-native-gifted-charts";
import axios from "axios";
import Icon from "react-native-vector-icons/Octicons";
import { Picker } from "@react-native-picker/picker";
import { AuthContext } from "../context/authContext";

const Stats = () => {
  const navigation = useNavigation();
  const [state] = React.useContext(AuthContext);
  const { user } = state;

  const [barData, setBarData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState("7AM-12PM");
  const [selectedDateRange, setSelectedDateRange] = useState("lastWeek");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const screenWidth = Dimensions.get("window").width;

  const timeRanges = [
    { label: "7 AM - 12 PM", value: "7AM-12PM" },
    { label: "1 PM - 5 PM", value: "1PM-5PM" },
    { label: "Full day (7 AM - 5 PM)", value: "7AM-5PM" },
  ];

  const dateRanges = [
    { label: "Today", value: "today" },
    { label: "Last 7 Days", value: "lastWeek" },
    { label: "Last 30 Days", value: "lastMonth" },
  ];

  const handleDetailsScreen = () => {
    // Navigate to Details
    navigation.navigate("Details", {
      deviceId: user.deviceId,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Replace the URL below with your backend URL
        const response = await axios.get(
          `/auth/filter-detections?deviceId=${user?.deviceId}`
        );
        console.log("Fetched Data:", response.data.detections);
        setBarData(response.data.detections);
      } catch (error) {
        setError("Failed to load data");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (user?.deviceId) {
      fetchData();
    }
  }, [user?.deviceId]);

  const filterDataByTimeRange = (data, range) => {
    const filteredData = data.filter((detection) => {
      const [hour, minute, second] = detection.time.split(":").map(Number);
      if (range === "7AM-12PM") return hour >= 7 && hour <= 12;
      if (range === "1PM-5PM") return hour >= 13 && hour < 17;
      return hour >= 7 && hour < 17;
    });
    return filteredData;
  };

  const processChartData = (barData) => {
    const sortedData = [...barData].sort((a, b) => {
      const dateTimeA = new Date(`${a.date}T${a.time}`);
      const dateTimeB = new Date(`${b.date}T${b.time}`);
      return dateTimeA - dateTimeB;
    });

    const groupedData = {};

    sortedData.forEach((detection) => {
      const dateTime = new Date(`${detection.date}T${detection.time}`);
      const hour = dateTime.getHours();
      const label = `${hour % 12 || 12} ${hour >= 12 ? "PM" : "AM"}`;

      if (!groupedData[label]) {
        groupedData[label] = { label, bugs: 0, panicles: 0 };
      }

      groupedData[label].bugs += detection.numberOfBugs;
      groupedData[label].panicles += detection.numberOfPanicles;
    });

    return Object.values(groupedData);
  };

  useEffect(() => {
    if (barData.length > 0) {
      const filteredData = filterDataByTimeRange(barData, selectedTimeRange);
      const processedData = processChartData(filteredData);
      setChartData(processedData);
    }
  }, [barData, selectedTimeRange]);

  const groupedBarData = chartData.flatMap((data) => {
    return [
      {
        value: data.panicles,
        frontColor: "#132A17",
        spacing: 1,
      },
      {
        value: data.bugs,
        frontColor: "#F6D4BA",
        label: `${data.label}`,
      },
    ];
  });

  const maxChartValue = Math.max(...groupedBarData.map((item) => item.value));

  const handleRefresh = async () => {
    try {
      setLoading(true);
      setError(null);

      // Re-fetch the data from the backend
      const response = await axios.get(
        `/auth/filter-detections?deviceId=${user?.deviceId}`
      );
      console.log("Refreshed Data:", response.data.detections);
      const newBarData = response.data.detections;

      setSelectedTimeRange("7 AM - 12 PM");
      setBarData(newBarData);

      // Process and update the chart data based on the selected time range
      const filteredData = filterDataByTimeRange(newBarData, selectedTimeRange);
      const processedData = processChartData(filteredData);
      setChartData(processedData);
    } catch (error) {
      setError("Failed to refresh data");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const renderTitle = () => {
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Detection Report</Text>
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColorBox, { backgroundColor: "#132A17" }]}
            />
            <Text style={styles.legendText}>Panicle</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColorBox, { backgroundColor: "#F6D4BA" }]}
            />
            <Text style={styles.legendText}>Bugs</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.statistics}>
      <View style={styles.statisticsChild} />
      <View style={[styles.statisticsItem, styles.statisticsLayout]} />
      <Text style={styles.historyData}>HISTORY DATA</Text>

      <View style={[styles.bottomScreenContainer, styles.statisticsLayout]} />
      <Pressable
        style={[styles.homeIcon, styles.iconPosition]}
        onPress={() => navigation.navigate("HomeScreen")}
      >
        <Icon name="home" size={35} color="#132A17" />
      </Pressable>

      <Pressable
        style={[styles.arrowleft]}
        onPress={() => navigation.navigate("HomeScreen")}
      >
        <Icon name="arrow-left" size={35} color="#132A17" />
      </Pressable>

      <Pressable
        style={[styles.informationIcon, styles.iconPosition]}
        onPress={() => navigation.navigate("AboutUsScreen")}
      >
        <Icon name="feed-person" size={35} color="#132A17" />
      </Pressable>

      <Pressable
        style={[styles.controlIcon, styles.vectorIconLayout]}
        onPress={() => navigation.navigate("Add Device")}
      >
        <Icon name="plus-circle" size={35} color="#132A17" />
      </Pressable>

      <Icon
        name="graph"
        size={32}
        color="#3cb371"
        style={[styles.graphIcon, styles.vectorIconLayout]}
      />

      <View style={styles.chartContainer}>
        {renderTitle()}
        <BarChart
          data={groupedBarData}
          barWidth={15}
          spacing={35}
          roundedTop
          roundedBottom
          hideRules
          xAxisThickness={0}
          yAxisTextStyle={{ color: "#F9E2D0" }}
          xAxisLabelTextStyle={{ color: "#F9E2D0" }}
          noOfSections={3}
          maxValue={maxChartValue + 2}
          showValuesAsTopLabel
          topLabelTextStyle={{ fontSize: 12 }}
          isAnimated={true}
        />
      </View>
      <Text style={styles.selectTimeLabel}>Select a time range:</Text>
      <View style={styles.selectTimeContainer}>
        <Picker
          selectedValue={selectedTimeRange}
          onValueChange={(value) => setSelectedTimeRange(value)}
          style={{
            height: 45,
            width: 170,
            backgroundColor: "#F9E2D0",
          }}
        >
          {timeRanges.map((range) => (
            <Picker.Item
              key={range.value}
              label={range.label}
              value={range.value}
              style={{
                fontSize: 12,
                fontFamily: "Poppins-Regular",
                color: "#000",
              }}
            />
          ))}
        </Picker>
      </View>

      <Text style={styles.selectDateLabel}>Select date:</Text>
      <View style={styles.selectDateContainer}>
        <Picker
          selectedValue={selectedDateRange}
          onValueChange={(value) => setSelectedDateRange(value)}
          style={{
            height: 47,
            width: 170,
            backgroundColor: "#F9E2D0",
          }}
        >
          {dateRanges.map((range) => (
            <Picker.Item
              key={range.value}
              label={range.label}
              value={range.value}
              style={{
                fontSize: 12,
                fontFamily: "Poppins-Regular",
                color: "#000",
              }}
            />
          ))}
        </Picker>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.buttonContainer,
          { backgroundColor: pressed ? "#0d1f11" : "#3A7D44" },
        ]}
        onPress={handleDetailsScreen}
      >
        <Text style={styles.buttonText}>View Details</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.refreshButton,
          { backgroundColor: pressed ? "#0d1f11" : "#3A7D44" },
        ]}
        onPress={handleRefresh}
      >
        <Text style={styles.refreshText}>Refresh Data</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  statisticsLayout: {
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
  iconPosition: {
    top: "94.04%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
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
  statisticsChild: {
    width: "177.69%",
    top: "11.28%",
    right: "-177.14%",
    bottom: "86.44%",
    left: "99.44%",
    backgroundColor: "rgba(134, 139, 132, 0.48)",
    transform: [
      {
        rotate: "89.5deg",
      },
    ],
    height: "2.28%",
    position: "absolute",
  },
  statisticsItem: {
    height: "15.78%",
    top: "-2.66%",
    bottom: "86.88%",
    backgroundColor: Color.colorAntiquewhite,
    left: "0%",
    right: "0%",
  },
  historyData: {
    height: "35.56%",
    width: "46.94%",
    top: "7.52%",
    left: "27.47%",
    fontSize: 22,
    lineHeight: 23,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 2,
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
    fontWeight: "600",
    color: Color.colorBlack,
    position: "absolute",
  },
  homeIcon: {
    height: "4.31%",
    width: "10%",
    right: "82.5%",
    bottom: "1.65%",
    left: "10.5%",
    position: "fixed",
  },
  informationIcon: {
    height: "13.42%",
    right: "5.83%",
    bottom: "2.53%",
    left: "83.33%",
    width: "10.83%",
    top: "94.04%",
    position: "fixed",
  },
  controlIcon: {
    height: "10.06%",
    width: "10.28%",
    top: "93.86%",
    right: "29.89%",
    bottom: "2.28%",
    left: "59.83%",
    position: "fixed",
  },
  graphIcon: {
    height: "13.85%",
    width: "16.89%",
    top: "94.12%",
    right: "57.56%",
    bottom: "2.45%",
    left: "35.56%",
    position: "fixed",
  },
  bottomScreenContainer: {
    height: "11.79%",
    top: "91.38%",
    right: "-0.28%",
    bottom: "-3.17%",
    left: "0.28%",
    backgroundColor: Color.colorPeachpuff,
  },
  statistics: {
    backgroundColor: Color.colorMediumseagreen,
    flex: 1,
    height: 789,
    overflow: "hidden",
    width: "100%",
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    color: "#fff",
    fontWeight: "bold",
    left: 20,
    top: 5,
  },
  buttonContainer: {
    backgroundColor: "#3A7D44",
    borderRadius: 30,
    elevation: 3,
    width: 145,
    height: 40,
    top: 125,
    alignSelf: "flex-start",
    marginLeft: 50,
  },
  selectTimeLabel: {
    fontSize: 12,
    fontFamily: "Poppins-SemiBold",
    color: "white",
    bottom: 230,
    textAlign: "left",
    marginHorizontal: 20,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  selectTimeContainer: {
    backgroundColor: "#F9E2D0",
    alignSelf: "flex-end",
    bottom: 260,
    marginHorizontal: 25,
    elevation: 3,
  },
  selectDateLabel: {
    fontSize: 12,
    fontFamily: "Poppins-SemiBold",
    color: "white",
    bottom: 240,
    textAlign: "left",
    marginHorizontal: 70,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  selectDateContainer: {
    backgroundColor: "#F9E2D0",
    alignSelf: "flex-end",
    bottom: 275,
    marginHorizontal: 25,
    elevation: 3,
  },
  chartContainer: {
    backgroundColor: "#3A7D44",
    paddingBottom: 40,
    borderRadius: 20,
    top: 250,
    width: 350,
    elevation: 3,
    alignSelf: "center",
  },
  titleContainer: {
    marginVertical: 30,
  },
  titleText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  legendContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 24,
    backgroundColor: "#3A7D44",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendColorBox: {
    height: 12,
    width: 12,
    borderRadius: 6,
    marginRight: 8,
    alignSelf: "center",
  },
  legendText: {
    width: 60,
    height: 21,
    color: "white",
  },
  refreshButton: {
    backgroundColor: "#3A7D44",
    borderRadius: 30,
    elevation: 3,
    width: 145,
    height: 40,
    alignSelf: "flex-end",
    marginVertical: 85,
    marginRight: 50,
  },
  refreshText: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    top: 5,
  },
});

export default Stats;
