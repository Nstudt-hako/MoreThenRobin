import React, { useContext } from 'react';
import { Switch, View, Text } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { styles } from '../theme/theme';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <View style={styles.toggleContainer}>
      <Text style={styles.toggleText}>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</Text>
      <Switch
        value={isDarkMode}
        onValueChange={toggleTheme}
        thumbColor={isDarkMode ? '#f4f3f4' : '#f4f3f4'}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
      />
    </View>
  );
};

export default ThemeToggle;