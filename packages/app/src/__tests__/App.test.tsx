import { App } from '../App';

// Mock the config module
jest.mock('../config', () => ({
  subplatform: undefined,
  isDev: false,
}));

describe('App Component', () => {
  it('exports the App component', () => {
    expect(App).toBeDefined();
    expect(typeof App).toBe('function');
  });
});
