import { View, StyleSheet, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

function Header(props) {
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEPT",
    "OCT",
    "NOV",
    "DEC",
  ];
  const currentDate = new Date();
  return (
    <View style={styles.container}>
      <View style={styles.dateBlock}>
        <View style={styles.dateDiv}>
          <Text style={styles.date}>{currentDate.getDate()}</Text>
          <View style={styles.monthYear}>
            <Text style={styles.month}>{months[currentDate.getMonth()]}</Text>
            <Text style={styles.year}>{currentDate.getFullYear()}</Text>
          </View>
        </View>
        <Text style={styles.task}>
          <Text style={styles.taskNbr}>
            {props.taskNbr > 1
              ? props.taskNbr + " tasks"
              : props.taskNbr + " task"}
          </Text>
        </Text>
      </View>
      
      {/* <img src={logo} alt="logo to-do" className="banner-logo-todo" /> */}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 10,
    // marginTop: 50,
  },
  dateBlock: {
    
  },
  dateDiv: {
    display: "flex",
    flexDirection: "row",
  },
  date: {
    fontSize: 65,
  },
  monthYear: {
    marginTop: 15,
    marginLeft: 5,
  },
  month: {
    fontSize: 22,
  },
  year: {
    fontSize: 18
  },
  task: {
    marginLeft: 2,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Header;
