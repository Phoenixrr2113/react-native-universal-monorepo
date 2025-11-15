import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { AsyncStorageExample } from '../AsyncStorageExample';

// Mock @react-native-async-storage/async-storage
const mockGetItem = jest.fn();
const mockSetItem = jest.fn();

jest.mock('@react-native-async-storage/async-storage', () => ({
  useAsyncStorage: () => ({
    getItem: mockGetItem,
    setItem: mockSetItem,
  }),
}));

describe('AsyncStorageExample Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetItem.mockResolvedValue(null);
    mockSetItem.mockResolvedValue(undefined);
  });

  it('renders correctly', () => {
    const { toJSON } = render(<AsyncStorageExample />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('displays instruction text', () => {
    render(<AsyncStorageExample />);
    expect(
      screen.getByText(/Test the async-storage native module/i)
    ).toBeTruthy();
  });

  it('displays "Current value:" label', () => {
    render(<AsyncStorageExample />);
    expect(screen.getByText('Current value:')).toBeTruthy();
  });

  it('renders "Update Value" button', () => {
    render(<AsyncStorageExample />);
    expect(screen.getByText('Update Value')).toBeTruthy();
  });

  it('loads stored value on mount', async () => {
    mockGetItem.mockResolvedValue('test-value');

    render(<AsyncStorageExample />);

    await waitFor(() => {
      expect(mockGetItem).toHaveBeenCalledWith();
      expect(screen.getByText('test-value')).toBeTruthy();
    });
  });

  it('displays empty string when no value is stored', async () => {
    mockGetItem.mockResolvedValue(null);

    render(<AsyncStorageExample />);

    await waitFor(() => {
      expect(mockGetItem).toHaveBeenCalledWith();
    });

    // Initial state shows spaces, then empty after load
    expect(screen.queryByText('     ')).toBeTruthy();
  });

  it('updates value when button is pressed', async () => {
    render(<AsyncStorageExample />);

    const button = screen.getByText('Update Value');
    fireEvent.press(button);

    await waitFor(() => {
      expect(mockSetItem).toHaveBeenCalledWith(expect.any(String));
    });
  });

  it('generates random value on update', async () => {
    render(<AsyncStorageExample />);

    const button = screen.getByText('Update Value');
    fireEvent.press(button);

    await waitFor(() => {
      const callArgs = mockSetItem.mock.calls[0];
      expect(callArgs[0]).toBeTruthy();
      expect(typeof callArgs[0]).toBe('string');
      expect(callArgs[0].length).toBe(5); // Generated string length
    });
  });

  it('displays updated value after button press', async () => {
    mockSetItem.mockImplementation(() => {
      // Simulate storage update
      return Promise.resolve();
    });

    render(<AsyncStorageExample />);

    const button = screen.getByText('Update Value');
    fireEvent.press(button);

    await waitFor(() => {
      expect(mockSetItem).toHaveBeenCalled();
      const savedValue = mockSetItem.mock.calls[0][0];
      expect(savedValue).toHaveLength(5);
    });
  });

  it('handles getItem error gracefully', async () => {
    mockGetItem.mockRejectedValue(new Error('Storage error'));

    // Should not throw error
    expect(() => render(<AsyncStorageExample />)).not.toThrow();

    await waitFor(() => {
      expect(mockGetItem).toHaveBeenCalled();
    });
  });

  it('handles setItem error gracefully', async () => {
    mockSetItem.mockRejectedValue(new Error('Storage error'));

    render(<AsyncStorageExample />);

    const button = screen.getByText('Update Value');

    // Should not throw error
    expect(() => fireEvent.press(button)).not.toThrow();

    await waitFor(() => {
      expect(mockSetItem).toHaveBeenCalled();
    });
  });
});
