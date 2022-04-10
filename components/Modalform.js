import {
  StyleSheet,
  Text,
  View,
  Modal,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";

function ModalForm({ setTasks, setModalVisibility, handleNewTasks }) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.writeTaskWrapper}
    >
      <View style={styles.modal}>
        <TouchableOpacity onPress={() => setModalVisibility(false)}>
          <Text style={styles.close}>✕</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder={"New task..."}
          // value={task}
          multiline={true}
          numberOfLines={3}
          // autoFocus={true}
          onChangeText={(text) => setTasks(text)}
        />
        <TouchableOpacity onPress={() => handleNewTasks()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>＋</Text>
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    height: "100%",
    width: "100%",
    paddingTop: 10,
    paddingBottom: 15,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    shadowRadius: 15,
    // shadowOffset: {width: -52, height: -54},
    // shadowOpacity: 1,
    shadowColor: "black",
    elevation: 24,
  },
  close: {
    right: 15,
    marginLeft: "92%",
    width: 30,
    height: 30,
    paddingLeft: 15,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0)",
  },
  input: {
    // backgroundColor: "#e7e5e5",
    marginTop: 5,
    marginLeft: 15,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: "#f0f0f0",
    borderRadius: 30,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 330,
  },
  addWrapper: {
    width: 60,
    height: 60,
    marginLeft: '42%',
    marginTop: 10,
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
    marginTop: -10
  },
});

export default ModalForm;
