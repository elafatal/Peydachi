import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import AddStore from '../otherServices/Store/AddStoreRequest/AddStoreRequest';
import '@testing-library/jest-dom';

jest.mock('../axiosInstance', () => ({
  get: jest.fn().mockResolvedValue({ data: [{ id: 1, name: 'تهران' }] }),
  post: jest.fn().mockResolvedValue({ data: {} }),
}));

beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterAll(() => {
    console.log.mockRestore();
    console.error.mockRestore();
  });

describe('AddStoreRequest Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = async () => {
    await act(async () => {
      render(<AddStore />);
    });
  };

  test('renders store name input field', async () => {
    await renderComponent();
    const input = screen.getByPlaceholderText('نام فروشگاه');
    expect(input).toBeInTheDocument();
  });

  test('updates phone number field correctly', async () => {
    await renderComponent();
    const input = screen.getByPlaceholderText('09123456789');
    fireEvent.change(input, { target: { value: '09121234567' } });
    expect(input.value).toBe('09121234567');
  });

  test('shows validation errors if form is submitted empty', async () => {
    await renderComponent();
    const submitBtn = screen.getByText('ثبت درخواست');
    fireEvent.click(submitBtn);
    expect(screen.getAllByText('این فیلد اجباری است').length).toBeGreaterThan(0);
  });

  test('clears form when reset button is clicked', async () => {
    await renderComponent();
    const nameInput = screen.getByPlaceholderText('نام فروشگاه');
    fireEvent.change(nameInput, { target: { value: 'فروشگاه تستی' } });
    expect(nameInput.value).toBe('فروشگاه تستی');

    const resetBtn = screen.getByText('پاک کردن فرم');
    fireEvent.click(resetBtn);
    expect(nameInput.value).toBe('');
  });

  test('city dropdown is disabled before selecting a region', async () => {
    await renderComponent();
    const citySelect = screen.getByDisplayValue('انتخاب شهر');
    expect(citySelect).toBeDisabled();
  });

  
});
