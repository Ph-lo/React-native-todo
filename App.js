import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import * as uuid from "react-native-uuid";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Task from "./components/Task";
import Header from "./components/Header";
import ModalForm from "./components/Modalform";
import AsyncStorage from "@react-native-async-storage/async-storage";
const STORAGE_KEY = "@todo_tasks";

export default function App() {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [task, setTasks] = useState("");
  const [taskItems, setTaskItems] = useState([]);
  let tasksLength;
  if (taskItems === null) {
    tasksLength = 0;
  }
  if (AsyncStorage.getItem(STORAGE_KEY) === null) {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  }

  const saveTask = async (text) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, text);
    } catch (e) {
      console.log(e);
    }
  };
  const getTasks = async () => {
    try {
      const tasks = await AsyncStorage.getItem(STORAGE_KEY);
      setTaskItems(JSON.parse(tasks));
    } catch (e) {
      console.log(e);
      setTaskItems([]);
    }
  };

  const handleNewTasks = (e) => {
    if (task !== "") {
      Keyboard.dismiss();
      setModalVisibility(false);
      const id = uuid.default.v4();
      setTasks("");
      let itemsCopy = [...taskItems];
      itemsCopy.push({ text: task, uuid: id });
      setTaskItems([...taskItems, { text: task, uuid: id, done: false }]);
      saveTask(JSON.stringify(itemsCopy));
    } else {
      alert('Enter a task !');
    }
  };

  const deleteTask = (uuid) => {
    const index = taskItems.findIndex((item) => item.uuid === uuid);
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
    saveTask(JSON.stringify(itemsCopy));
  };

  const updateTask = (uuid) => {
    const index = taskItems.findIndex((item) => item.uuid === uuid);
    const itemsCopy = [...taskItems];
    itemsCopy[index].done = (itemsCopy[index].done) ? false : true;
    setTaskItems(itemsCopy);
  };

  React.useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <Header style={styles.header} taskNbr={taskItems.length} />
      <View style={styles.container}>
        <ScrollView style={styles.taskcontainer}>
          <View style={styles.taskWrapper}>
            <View style={styles.items}>
              {taskItems.map((item) => {
                return (
                  <Task
                    key={item.uuid}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                    uuid={item.uuid}
                    text={item.text}
                    done={item.done}
                  />
                );
              })}
            </View>
          </View>
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibility}
          onRequestClose={() => setModalVisibility(false)}
        >
          <ModalForm
            setTasks={setTasks}
            setModalVisibility={setModalVisibility}
            handleNewTasks={handleNewTasks}
          />
        </Modal>
        <TouchableOpacity
          style={styles.btnWrapper}
          onPress={() => setModalVisibility(true)}
        >
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>＋</Text>
          </View>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    position: "absolute",
    top: 0,
  },
  taskcontainer: {
    height: 80,
  },
  taskWrapper: {
    paddingHorizontal: 20,
    marginBottom: 90,
  },
  items: {
    marginTop: 20,
  },
  btnWrapper: {
    position: "absolute",
    bottom: 20,
    right: 20,
    borderRadius: 60,
    justifyContent: "center",
  },
  btn: {
    borderRadius: 60,
  },
  addWrapper: {
    width: 60,
    height: 60,
    // marginLeft: "57%",
    backgroundColor: "rgb(231, 229, 229)",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {
    color: "#b1d6ea",
    fontSize: 60,
    fontWeight: "normal",
    marginTop: -10,
  },
});
