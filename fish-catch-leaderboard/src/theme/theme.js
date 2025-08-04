import { colors } from './colors';

const common = {
  borderRadius: 8,
  spacing: 16,
  fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
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