// We need to test the module in different scenarios
// Note: This is a bit tricky because the module runs on import

// Global type declaration for subplatform
declare global {
   
  var __SUBPLATFORM__: 'tauri' | 'browser-ext' | 'android-tv' | 'tvos' | 'next' | undefined;
}

// Export to make this a module
export {};

describe('config module', () => {
  beforeEach(() => {
    jest.resetModules();
    // Clear any global mocks
    (global as any).__SUBPLATFORM__ = undefined;
    (global as any).__DEV__ = false;
  });

  describe('isDev', () => {
    it('exports isDev based on __DEV__', () => {
      (global as any).__DEV__ = true;
      const { isDev } = require('../config');
      expect(isDev).toBe(true);
    });

    it('isDev is false when __DEV__ is false', () => {
      (global as any).__DEV__ = false;
      const { isDev } = require('../config');
      expect(isDev).toBe(false);
    });
  });

  describe('subplatform detection', () => {
    it('returns undefined when no subplatform is set', () => {
      const { subplatform } = require('../config');
      expect(subplatform).toBeUndefined();
    });

    it('detects tauri subplatform from __SUBPLATFORM__', () => {
      (global as any).__SUBPLATFORM__ = 'tauri';
      const { subplatform } = require('../config');
      expect(subplatform).toBe('tauri');
    });

    it('detects browser-ext subplatform from __SUBPLATFORM__', () => {
      (global as any).__SUBPLATFORM__ = 'browser-ext';
      const { subplatform } = require('../config');
      expect(subplatform).toBe('browser-ext');
    });

    it('detects next subplatform from __SUBPLATFORM__', () => {
      (global as any).__SUBPLATFORM__ = 'next';
      const { subplatform } = require('../config');
      expect(subplatform).toBe('next');
    });

    it('detects tvos when Platform.isTV and Platform.OS is ios', () => {
      // Mock Platform for tvOS
      jest.doMock('react-native', () => ({
        Platform: {
          OS: 'ios',
          isTV: true,
        },
      }));

      const { subplatform } = require('../config');
      expect(subplatform).toBe('tvos');
    });

    it('detects android-tv when Platform.isTV and Platform.OS is android', () => {
      // Mock Platform for Android TV
      jest.doMock('react-native', () => ({
        Platform: {
          OS: 'android',
          isTV: true,
        },
      }));

      const { subplatform } = require('../config');
      expect(subplatform).toBe('android-tv');
    });

    it('does not set subplatform for regular mobile platforms', () => {
      // Mock regular mobile platform
      jest.doMock('react-native', () => ({
        Platform: {
          OS: 'ios',
          isTV: false,
        },
      }));

      const { subplatform } = require('../config');
      expect(subplatform).toBeUndefined();
    });
  });

  describe('global type declarations', () => {
    it('__SUBPLATFORM__ accepts valid platform strings', () => {
      // This test verifies TypeScript types are correct
      const validPlatforms: Array<typeof __SUBPLATFORM__> = [
        'tauri',
        'browser-ext',
        'android-tv',
        'tvos',
        'next',
        undefined,
      ];

      expect(validPlatforms).toHaveLength(6);
    });

    it('isDev matches __DEV__ type', () => {
      const { isDev } = require('../config');
      expect(typeof isDev).toBe('boolean');
    });
  });

  describe('module exports', () => {
    it('exports both isDev and subplatform', () => {
      const config = require('../config');
      expect(config).toHaveProperty('isDev');
      expect(config).toHaveProperty('subplatform');
    });

    it('exports are of correct types', () => {
      const { isDev, subplatform } = require('../config');
      expect(typeof isDev).toBe('boolean');
      expect(['string', 'undefined']).toContain(typeof subplatform);
    });
  });
});
