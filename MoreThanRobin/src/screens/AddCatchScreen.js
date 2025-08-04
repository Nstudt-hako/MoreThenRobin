import React from 'react';
import { View, StyleSheet } from 'react-native';
import AddCatchForm from '../components/AddCatchForm';

const AddCatchScreen = () => {
  return (
    <View style={styles.container}>
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