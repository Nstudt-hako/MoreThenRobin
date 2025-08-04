import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CatchItem = ({ catchData }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.fishType}>{catchData.fishType}</Text>
            <Text style={styles.size}>Size: {catchData.size} cm</Text>
            <Text style={styles.time}>Caught on: {new Date(catchData.time).toLocaleString()}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    fishType: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    size: {
        fontSize: 16,
    },
    time: {
        fontSize: 14,
        color: '#666',
    },
});

export default CatchItem;