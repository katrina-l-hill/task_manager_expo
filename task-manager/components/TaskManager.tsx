import React, { useState } from 'react';
import { View, Button, Text, TextInput, FlatList, StyleSheet } from 'react-native';

interface Task {
    id: number;
    title: string;
    completed: boolean;
  }

const TaskManager = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTitle, setNewTitle] = useState('');

    const addTask = () => {
        const newTask = {
            id: Date.now(),
            title: newTitle,
            completed: false,
        };

        setTasks([...tasks, newTask]);
        setNewTitle('');
    };

    const toggleTaskCompletion = (taskId: number) => {
        setTasks(
            tasks.map(task => 
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };

    return (
        <View style={styles.container}>
          <Text style={styles.header}>Task Manager</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Enter task title"
            value={newTitle} 
            onChangeText={setNewTitle}
          />
          <Button title="Add Task" onPress={addTask} />
          
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.task}>
                <Text style={item.completed ? styles.completed : styles.notCompleted}>{item.title}</Text>
                <Button title="Complete" onPress={() => toggleTaskCompletion(item.id)} />
              </View>
            )}
          />
        </View>
      );

}

const styles = StyleSheet.create({
  container: { 
    padding: 20 
},
  header: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 10 
},
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 8, 
    marginBottom: 10 
},
  task: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginBottom: 10 
},
  completed: { 
    textDecorationLine: 'line-through', 
    color: 'gray' 
},
  notCompleted: { 
    color: 'black' 
},
  });

export default TaskManager;