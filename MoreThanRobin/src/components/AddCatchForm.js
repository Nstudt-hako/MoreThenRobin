import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { db } from '../api/firebase'; // Import Firebase configuration

const AddCatchForm = () => {
  const [fishType, setFishType] = useState('');
  const [size, setSize] = useState('');
  const [time, setTime] = useState('');

  const handleAddCatch = async () => {
    if (fishType && size && time) {
      try {
        await db.collection('catches').add({
          fishType,
          size,
          time,
        });
        setFishType('');
        setSize('');
        setTime('');
      } catch (error) {
        console.error("Error adding catch: ", error);
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Fish Type:</Text>
      <TextInput
        style={styles.input}
        value={fishType}
        onChangeText={setFishType}
      />
      <Text style={styles.label}>Size:</Text>
      <TextInput
        style={styles.input}
        value={size}
        onChangeText={setSize}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Time of Catch:</Text>
      <TextInput
        style={styles.input}
        value={time}
        onChangeText={setTime}
      />
      <Button title="Add Catch" onPress={handleAddCatch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});

export default AddCatchForm;