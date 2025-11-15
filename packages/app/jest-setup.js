// Mock React Native completely to avoid Flow syntax issues
const mockComponent = (name) => {
  const Component = ({ children, ...props }) => {
    return children || null;
  };
  Component.displayName = name;
  return Component;
};

jest.mock('react-native', () => ({
  Platform: {
    OS: 'ios',
    select: jest.fn((obj) => obj.ios || obj.default),
    isTV: false,
  },
  StyleSheet: {
    create: jest.fn((styles) => styles),
    flatten: jest.fn((style) => style),
  },
  Touchable: {
    Mixin: {
      touchableHandlePress: jest.fn(),
      touchableHandleActivePressIn: jest.fn(),
      touchableHandleActivePressOut: jest.fn(),
      touchableHandleLongPress: jest.fn(),
      touchableGetPressRectOffset: jest.fn(),
    },
  },
  View: mockComponent('View'),
  Text: mockComponent('Text'),
  Image: mockComponent('Image'),
  TouchableOpacity: mockComponent('TouchableOpacity'),
  Pressable: mockComponent('Pressable'),
  ImageSourcePropType: jest.fn(),
}));

// Mock Gluestack UI config
jest.mock('./gluestack-ui.config', () => ({
  config: {},
}));

// Mock Gluestack UI to avoid complex dependencies
jest.mock('@gluestack-ui/themed', () => {
  const mockGluestackComponent = (name) => {
    const Component = ({ children, ...props }) => {
      return children || null;
    };
    Component.displayName = `Gluestack${name}`;
    return Component;
  };

  return {
    GluestackUIProvider: ({ children }) => children,
    Box: mockGluestackComponent('Box'),
    Text: mockGluestackComponent('Text'),
    Heading: mockGluestackComponent('Heading'),
    Badge: mockGluestackComponent('Badge'),
    BadgeText: mockGluestackComponent('BadgeText'),
    Image: mockGluestackComponent('Image'),
    Center: mockGluestackComponent('Center'),
    Button: mockGluestackComponent('Button'),
    ButtonText: mockGluestackComponent('ButtonText'),
    Card: mockGluestackComponent('Card'),
  };
});

// Mock React Navigation dependencies
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => children,
  SafeAreaView: mockComponent('SafeAreaView'),
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));

jest.mock('react-native-screens', () => ({
  enableScreens: jest.fn(),
}));

// Mock React Navigation
jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }) => children,
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    setOptions: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
}));

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: mockComponent('StackNavigator'),
    Screen: mockComponent('StackScreen'),
  }),
}));
