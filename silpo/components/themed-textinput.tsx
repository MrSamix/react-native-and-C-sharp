import { StyleSheet, TextInput, type TextInputProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;

  lightBackgroundColor?: string;
  darkBackgroundColor?: string;

  lightBorderColor?: string;
  darkBorderColor?: string;

  lightPlaceholderColor?: string;
  darkPlaceholderColor?: string;
};

export function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  lightBackgroundColor,
  darkBackgroundColor,
  lightBorderColor,
  darkBorderColor,
  lightPlaceholderColor,
  darkPlaceholderColor,
  placeholderTextColor,
  selectionColor,
  ...rest
}: ThemedTextInputProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const backgroundColor = useThemeColor(
    { light: lightBackgroundColor, dark: darkBackgroundColor },
    'background'
  );
  const borderColor = useThemeColor({ light: lightBorderColor, dark: darkBorderColor }, 'icon');
  const computedPlaceholderColor = useThemeColor(
    { light: lightPlaceholderColor, dark: darkPlaceholderColor },
    'icon'
  );
  const computedSelectionColor = useThemeColor({}, 'tint');

  return (
    <TextInput
      style={[styles.input, { color, backgroundColor, borderColor }, style]}
      placeholderTextColor={placeholderTextColor ?? computedPlaceholderColor}
      selectionColor={selectionColor ?? computedSelectionColor}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    lineHeight: 24,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
});
