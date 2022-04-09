import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import * as uuid from "react-native-uuid";
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Task from "./components/Task";
import Header from "./components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { MKV } from 'react-native-mmkv';
const STORAGE_KEY = "@todo_tasks";
// const storage = new MMKVStorage.Loader().initialize();
// export const storage = new MKV();

export default function App() {
  // const jsonTasks = storage.getString(STORAGE_KEY);
  // console.log(jsonTasks);

  // if (AsyncStorage.getItem(STORAGE_KEY) === null) {
  //   console.log('prout');
  // }
  // alert('prout');
  const [task, setTasks] = useState("");
  const [taskItems, setTaskItems] = useState([]);
  let tasksLength;
  if (taskItems === null) {
    tasksLength = 0;
  }
  if (AsyncStorage.getItem(STORAGE_KEY) === null) {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  }
  // const tasksLength = (taskItems === null) ? 0 : taskItems.length;

  const saveTask = async (text) => {
    try {
      // console.log(text);
      await AsyncStorage.setItem(STORAGE_KEY, text);

      // console.log(text);
    } catch (e) {
      console.log(e);
    }
  };
  const getTasks = async () => {
    try {
      const tasks = await AsyncStorage.getItem(STORAGE_KEY);
      // console.log(tasks);
      setTaskItems(JSON.parse(tasks));
      // tasks.then((res) => {
        
      //   if (res !== null) {
      //     const parsedTasks = JSON.parse(res);
      //     setTaskItems(parsedTasks);
      //   }
      // });
    } catch (e) {
      console.log(e);
      setTaskItems([]);
    }
  };

  const handleNewTasks = () => {
    // try {
    //   // console.log(text);
    //   AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(taskItems));
    //   // console.log(text);
    // } catch(e) {
    //   console.log(e);
    // }

    Keyboard.dismiss();
    // console.log(taskItems);
    const id = uuid.default.v4();
    // const id = globalId;
    // setTaskItems([...taskItems, { text: task, uuid: id }]);
    // console.log([...taskItems]);
    setTasks("");
    let itemsCopy = [...taskItems];
    itemsCopy.push({ text: task, uuid: id });
    // console.log(itemsCopy);
    setTaskItems([...taskItems, { text: task, uuid: id }]);
    saveTask(JSON.stringify(itemsCopy));
    // AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(itemsCopy));
    // setGlobalId(globalId + 1);
    // console.log(itemsCopy);
  };

  const deleteTask = (uuid) => {
    const index = taskItems.findIndex((item) => item.uuid === uuid);
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
    saveTask(JSON.stringify(itemsCopy));
  };

  const updateTask = (uuid, text) => {
    const index = taskItems.findIndex((item) => item.uuid === uuid);
    const itemsCopy = [...taskItems];
    itemsCopy[index].text = text;
    setTaskItems(itemsCopy);
  };

  React.useEffect(() => {
    getTasks();
  }, []);
  // console.log(taskItems);
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
                  />
                );
              })}
              {/* {taskItems} */}
            </View>
          </View>
        </ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeTaskWrapper}
        >
          <TextInput
            style={styles.input}
            placeholder={"New task..."}
            value={task}
            onChangeText={(text) => setTasks(text)}
          />
          <TouchableOpacity onPress={() => handleNewTasks()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <StatusBar style="auto" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flex: 1,
    position: "absolute",
    top: 0,
  },
  taskcontainer: {
    height: 80
  },
  taskWrapper: {
    // paddingTop: 50,
    paddingHorizontal: 20,
    marginBottom: 90,
  },
  items: {
    marginTop: 20,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 0,
    paddingVertical: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: "rgb(231, 229, 229)",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "rgb(231, 229, 229)",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {},
});
