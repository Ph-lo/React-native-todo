import { View, Text, StyleSheet, TouchableOpacity } from "react-native";



function Task({deleteTask, updateTask, uuid, text}) {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.checkbox}></View>
        {/* <Text style={styles.itemText}>{uuid}</Text> */}
        <Text style={styles.itemText}>{text}</Text>
      </View>
      <TouchableOpacity style={styles.btn} onPress={() => deleteTask(uuid)}>

      </TouchableOpacity>
      {/* <View style={styles.btn}></View> */}
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
  itemText: {
    maxWidth: "80%",
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
