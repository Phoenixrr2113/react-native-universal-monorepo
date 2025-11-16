// Custom type declarations for react-native-web value exports
// The @types/react-native-web package only provides interface definitions
// but doesn't declare the actual exported values.

import type * as RNW from '@types/react-native-web';

declare module 'react-native-web' {
  // Re-export all types from @types/react-native-web
  export * from '@types/react-native-web';

  // Declare the actual value exports that are missing from @types/react-native-web
  export const AppRegistry: RNW.AppRegistry;
  export const AppState: RNW.AppState;
  export const Appearance: RNW.Appearance;
}
