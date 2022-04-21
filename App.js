import React, {useState, useEffect} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Task from './file/Task';
import { Constants, Notifications, Permissions } from 'expo';

export default function App() {
useEffect( ()=>{
  async function myNotification() {
    let result = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (result.status === 'granted') {
     console.log('Notification permissions granted.');
     this.setNotifications();
    } else {
        console.log('No Permission', Constants.lisDevice);
    }
  }

  myNotification()
  // this.listenForNotifications();
})

  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task])
    setTask(null);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy)
  }


  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'>

      <View style={styles.tasksWrapper}>
        <Text style={styles.judul}>Agenda Harian</Text>
        <View style={styles.items}>
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index}  onPress={() => completeTask(index)}>
                  <Task text={item} /> 
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
        
      </ScrollView>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.tulis}>
        <TextInput style={styles.input} placeholder={'Masukan Text'} value={task} onChangeText={text => setTask(text)} />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.masukan}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B4E197',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
 judul: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#FFF',
    borderColor: '#4E944F',
    borderWidth: 2,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    textAlign: "center",
  },
  items: {
    marginTop: 30,
  },
  tulis: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#4E944F',
    borderWidth: 2,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#4E944F',
    borderWidth: 2,
  },
  masukan: {},
});
