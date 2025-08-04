import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { getUserCatches } from '../api/firebase'; // Assume this function fetches catches from Firebase
import CatchItem from '../components/CatchItem';

const ProfileScreen = () => {
    const { user } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);
    const [catches, setCatches] = useState([]);

    useEffect(() => {
        const fetchCatches = async () => {
            if (user) {
                const userCatches = await getUserCatches(user.uid);
                setCatches(userCatches);
            }
        };

        fetchCatches();
    }, [user]);

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={[styles.title, { color: theme.text }]}>Your Catches</Text>
            <FlatList
                data={catches}
                renderItem={({ item }) => <CatchItem catch={item} />}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});

export default ProfileScreen;