import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

const ProfileScreen = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Profile</Text>
      {user ? (
        <View>
          <Text style={[styles.label, { color: theme.text }]}>Username: {user.username}</Text>
          <Text style={[styles.label, { color: theme.text }]}>Email: {user.email}</Text>
          {/* Additional user stats can be displayed here */}
        </View>
      ) : (
        <Text style={[styles.label, { color: theme.text }]}>No user logged in</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default ProfileScreen;