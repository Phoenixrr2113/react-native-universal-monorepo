// Mock React Native completely to avoid Flow syntax issues
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
  View: 'View',
  Text: 'Text',
  Image: 'Image',
  TouchableOpacity: 'TouchableOpacity',
  Pressable: 'Pressable',
  ImageSourcePropType: jest.fn(),
}));

// Mock Gluestack UI config
jest.mock('./gluestack-ui.config', () => ({
  config: {},
}));

// Mock Gluestack UI to avoid complex dependencies
jest.mock('@gluestack-ui/themed', () => {
  const React = require('react');
  return {
    GluestackUIProvider: ({ children }) => children,
    Box: ({ children, ...props }) => React.createElement('View', props, children),
    Text: ({ children, ...props }) => React.createElement('Text', props, children),
    Heading: ({ children, ...props }) => React.createElement('Text', props, children),
    Badge: ({ children, ...props }) => React.createElement('View', props, children),
    BadgeText: ({ children, ...props }) => React.createElement('Text', props, children),
    Image: (props) => React.createElement('Image', props),
    Center: ({ children, ...props }) => React.createElement('View', props, children),
    Button: ({ children, ...props }) => React.createElement('TouchableOpacity', props, children),
    ButtonText: ({ children, ...props }) => React.createElement('Text', props, children),
    Card: ({ children, ...props }) => React.createElement('View', props, children),
  };
});
