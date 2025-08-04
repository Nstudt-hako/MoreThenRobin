import React from 'react';
import { View, StyleSheet } from 'react-native';
import AddCatchForm from '../components/AddCatchForm';
import { useTheme } from '../context/ThemeContext';

const AddCatchScreen = () => {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <AddCatchForm />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
});

export default AddCatchScreen;