import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { Platform } from 'react-native';
import colors from './colors';

const common = {
  borderRadius: 8,
  spacing: 16,
  fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
};

export const lightTheme = {
  ...common,
  colors: {
    ...colors,
    background: colors.white,
    text: colors.black,
    border: colors.lightGray,
  },
};

export const darkTheme = {
  ...common,
  colors: {
    ...colors,
    background: colors.black,
    text: colors.white,
    border: colors.darkGray,
  },
};