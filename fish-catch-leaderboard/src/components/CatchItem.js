import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const CatchItem = ({ catchData }) => {
    const { type, size, time } = catchData;
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.card }]}>
            <Text style={[styles.text, { color: colors.text }]}>Type: {type}</Text>
            <Text style={[styles.text, { color: colors.text }]}>Size: {size} cm</Text>
            <Text style={[styles.text, { color: colors.text }]}>Time: {new Date(time).toLocaleString()}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        elevation: 2,
    },
    text: {
        fontSize: 16,
    },
});

export default CatchItem;