// Polyfill for use-latest-callback to avoid import.meta issues in Next.js
// This is a simplified version that provides the same API

const { useRef, useCallback } = require('react');

function useLatestCallback(callback) {
  const ref = useRef(callback);
  ref.current = callback;

  return useCallback((...args) => {
    return ref.current?.(...args);
  }, []);
}

module.exports = useLatestCallback;
module.exports.default = useLatestCallback;
