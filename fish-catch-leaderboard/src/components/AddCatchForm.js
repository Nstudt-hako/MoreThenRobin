import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { db } from '../api/firebase'; // Import Firebase configuration

const AddCatchForm = () => {
    const [fishType, setFishType] = useState('');
    const [size, setSize] = useState('');
    const [time, setTime] = useState('');

    const handleAddCatch = async () => {
        if (!fishType || !size || !time) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        try {
            await db.collection('catches').add({
                fishType,
                size,
                time,
                createdAt: new Date(),
            });
            Alert.alert('Success', 'Catch added successfully');
            setFishType('');
            setSize('');
            setTime('');
        } catch (error) {
            Alert.alert('Error', 'Failed to add catch');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Fish Type"
                value={fishType}
                onChangeText={setFishType}
            />
            <TextInput
                style={styles.input}
                placeholder="Size (in cm)"
                value={size}
                onChangeText={setSize}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Time of Catch"
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
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default AddCatchForm;