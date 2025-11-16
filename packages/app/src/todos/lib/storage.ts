import { createMMKV } from 'react-native-mmkv';

// Initialize MMKV instance for todos
export const storage = createMMKV({
  id: 'todos-storage',
  // Optional: Add encryption for sensitive data
  // encryptionKey: 'your-encryption-key'
});

/**
 * Storage adapter for Zustand persistence
 * Provides synchronous get/set operations using MMKV
 */
export const mmkvStorage = {
  getItem: (key: string): string | null => {
    const value = storage.getString(key);
    return value ?? null;
  },
  setItem: (key: string, value: string): void => {
    storage.set(key, value);
  },
  removeItem: (key: string): void => {
    storage.remove(key);
  },
};
