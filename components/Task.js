import { View, Text, StyleSheet, TouchableOpacity } from "react-native";



function Task({deleteTask, updateTask, uuid, text, done}) {
  const checkMarkSymbol = '✓';
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <TouchableOpacity style={styles.checkbox} onPress={() => updateTask(uuid)}><Text style={styles.checkMark}>{(done) ? checkMarkSymbol : ""}</Text></TouchableOpacity>
        {/* <Text style={styles.itemText}>{uuid}</Text> */}
        <Text style={(done === false) ? styles.itemText : styles.itemTextCrosses}>{text}</Text>
      </View>
      <TouchableOpacity style={styles.btn} onPress={() => deleteTask(uuid)}>

      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "rgb(231, 229, 229)",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  checkbox: {
    width: 24,
    height: 24,
    backgroundColor: "#61c1f2",
    borderRadius: 5,
    opacity: 0.4,
    marginRight: 15,
  },
  checkMark: {
    marginTop: -15,
    marginLeft: 5,
    fontSize: 35,
  },
  itemText: {
    maxWidth: "80%",
  },
  itemTextCrosses: {
    maxWidth: "80%",
    textDecorationLine: "line-through",
  },
  btn: {
    width: 12,
    height: 12,
    borderColor: "#61c1f2",
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default Task;
