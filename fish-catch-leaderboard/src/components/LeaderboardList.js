import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db } from '../api/firebase';
import { AuthContext } from '../context/AuthContext';
import CatchItem from './CatchItem';

const LeaderboardList = () => {
    const [catches, setCatches] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const unsubscribe = db.collection('catches')
            .orderBy('size', 'desc')
            .onSnapshot(snapshot => {
                const catchesData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setCatches(catchesData);
            });

        return () => unsubscribe();
    }, []);

    const renderItem = ({ item }) => (
        <CatchItem catchData={item} />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Leaderboard</Text>
            <FlatList
                data={catches}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#121212', // Dark mode background
    },
    title: {
        fontSize: 24,
        color: '#ffffff', // Dark mode text color
        marginBottom: 16,
    },
});

export default LeaderboardList;