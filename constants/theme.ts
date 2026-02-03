/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  // Brand colors
  toastedAlmond: '#d4835c',
  softLinen: '#f5f1e8',
  stormyTeal: '#08605f',
  teal: '#177e89',
  deepTeal: '#598381',

  // Semantic names for easier use
  primary: '#177e89',
  primaryDark: '#08605f',
  primaryLight: '#598381',
  accent: '#d4835c',
  background: '#f5f1e8',

  // Text colors
  text: '#08605f',
  textLight: '#598381',
  textAccent: '#d4835c',
  textOnPrimary: '#f5f1e8',
  textOnAccent: '#f5f1e8',

  // UI colors
  surface: '#ffffff',
  border: '#598381',
  borderLight: '#d4d4d4',
  disabled: '#c0c0c0',

  // Status colors
  success: '#4A7C59',
  warning: '#E8B44F',
  error: '#C4574C',
  info: '#177e89',
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
