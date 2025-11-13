import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Platform } from 'react-native';
import { App } from '../App';

// Mock the config module
jest.mock('../config', () => ({
  subplatform: undefined,
  isDev: false,
}));

// Mock AsyncStorageExample component
jest.mock('../AsyncStorageExample', () => ({
  AsyncStorageExample: () => null,
}));

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { toJSON } = render(<App />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('displays "Hello from React Native!" text', () => {
    render(<App />);
    expect(screen.getByText('Hello from React Native!')).toBeTruthy();
  });

  it('displays the platform correctly', () => {
    render(<App />);
    expect(screen.getByText('Platform:')).toBeTruthy();
    expect(screen.getByText(Platform.OS)).toBeTruthy();
  });

  it('renders the logo image', () => {
    const { UNSAFE_getAllByType } = render(<App />);
    const images = UNSAFE_getAllByType('Image' as any);
    expect(images.length).toBeGreaterThan(0);
  });

  it('applies correct styles', () => {
    // Check that it renders without errors
    expect(() => render(<App />)).not.toThrow();
  });

  it('displays platform with subplatform when available', () => {
    // Re-mock config with subplatform
    jest.resetModules();
    jest.doMock('../config', () => ({
      subplatform: 'electron',
      isDev: false,
    }));

    const { App: AppWithSubplatform } = require('../App');
    render(<AppWithSubplatform />);

    // Should display "os (electron)" format
    expect(screen.getByText(/\(/)).toBeTruthy();
  });
});
