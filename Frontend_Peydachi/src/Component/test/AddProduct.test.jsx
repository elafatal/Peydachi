import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import showErrorToast from '../utils/showErrorToast';

import AddProduct from '../Store/AddProduct';

// Mock dependencies
jest.mock('../utils/showErrorToast', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));
jest.mock('../axiosInstance');
jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

describe('AddProduct Component - Tests', () => {
  const mockNavigate = jest.fn();
  const mockAxiosPost = jest.fn();
  const mockLocalStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  };

  const mockProductDraft = {
    formData: {
      name: 'Draft Product',
      description: 'Draft description',
      quantity: 5,
      pic_url: '',
    },
    previewImage: 'data:image/png;base64,draftImage',
  };

  const mockFile = new File(['dummy content'], 'test.png', { type: 'image/png' });
  const mockInvalidFile = new File(['dummy content'], 'test.txt', { type: 'text/plain' });
  const mockLargeFile = new File(['dummy content'], 'large.png', { type: 'image/png', size: 6 * 1024 * 1024 });

  beforeEach(() => {
    jest.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
    axiosInstance.post.mockImplementation(mockAxiosPost);
    global.localStorage = mockLocalStorage;
    global.URL.createObjectURL = jest.fn(() => 'mocked-url');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders form correctly', async () => {
    await act(async () => {
      render(<AddProduct />);
    });
    expect(screen.getByText('جزئیات محصول')).toBeInTheDocument();
    expect(screen.getByLabelText(/نام محصول/)).toBeInTheDocument();
    expect(screen.getByLabelText(/توضیحات/)).toBeInTheDocument();
    expect(screen.getByLabelText(/موجودی/)).toBeInTheDocument();
    expect(screen.getByText('عکس محصول')).toBeInTheDocument();
    expect(screen.getByText('اضافه کردن محصول')).toBeInTheDocument();
    expect(screen.getByText('ذخیره پیش‌نویس')).toBeInTheDocument();
    expect(screen.getByText('بازگشت')).toBeInTheDocument();
  });


  test('updates name input correctly', async () => {
    await act(async () => {
      render(<AddProduct />);
    });
    const nameInput = screen.getByLabelText(/نام محصول/);
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: 'New Product' } });
    });
    expect(nameInput).toHaveValue('New Product');
  });

  test('updates description input correctly', async () => {
    await act(async () => {
      render(<AddProduct />);
    });
    const descriptionInput = screen.getByLabelText(/توضیحات/);
    await act(async () => {
      fireEvent.change(descriptionInput, { target: { value: 'New description' } });
    });
    expect(descriptionInput).toHaveValue('New description');
  });

  test('updates quantity input correctly', async () => {
    await act(async () => {
      render(<AddProduct />);
    });
    const quantityInput = screen.getByLabelText(/موجودی/);
    await act(async () => {
      fireEvent.change(quantityInput, { target: { value: '10' } });
    });
    expect(quantityInput).toHaveValue(10);
  });

  test('increments quantity when plus button is clicked', async () => {
    await act(async () => {
      render(<AddProduct />);
    });
    const incrementButton = screen.getByTestId('increment-quantity');
    const quantityInput = screen.getByLabelText(/موجودی/);
    await act(async () => {
      fireEvent.change(quantityInput, { target: { value: '5' } });
      fireEvent.click(incrementButton);
    });
    expect(quantityInput).toHaveValue(6);
  });

  test('decrements quantity when minus button is clicked', async () => {
    await act(async () => {
      render(<AddProduct />);
    });
    const decrementButton = screen.getByTestId('decrement-quantity');
    const quantityInput = screen.getByLabelText(/موجودی/);
    await act(async () => {
      fireEvent.change(quantityInput, { target: { value: '5' } });
      fireEvent.click(decrementButton);
    });
    expect(quantityInput).toHaveValue(4);
  });

  test('prevents quantity from going below 0 when decrementing', async () => {
    await act(async () => {
      render(<AddProduct />);
    });
    const decrementButton = screen.getByTestId('decrement-quantity');
    const quantityInput = screen.getByLabelText(/موجودی/);
    await act(async () => {
      fireEvent.change(quantityInput, { target: { value: '0' } });
      fireEvent.click(decrementButton);
    });
    expect(quantityInput).toHaveValue(0);
  });


  test('shows error for invalid file type', async () => {
    await act(async () => {
      render(<AddProduct />);
    });
    const fileInput = screen.getByTestId('file-input');
    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [mockInvalidFile] } });
    });
    await waitFor(() => {
      expect(screen.getByText('لطفاً یک فایل تصویری (JPEG، PNG و غیره) آپلود کنید')).toBeInTheDocument();
      expect(screen.queryByAltText('Product preview')).not.toBeInTheDocument();
    });
  });

  test('shows validation errors on submit with empty form', async () => {
    await act(async () => {
      render(<AddProduct />);
    });
    const submitButton = screen.getByText('اضافه کردن محصول');
    await act(async () => {
      fireEvent.click(submitButton);
    });
    await waitFor(() => {
      expect(screen.getByText('نام محصول الزامی‌ است')).toBeInTheDocument();
      expect(screen.getByText('توضیحات محصول الزامی است')).toBeInTheDocument();
      expect(screen.getByText('تعداد باید حداقل ۱ باشد')).toBeInTheDocument();
      expect(screen.getByText('تصویر محصول الزامی است')).toBeInTheDocument();
    });
  });

  test('submits form successfully and shows success message', async () => {
    mockAxiosPost.mockResolvedValue({ data: { success: true } });
    await act(async () => {
      render(<AddProduct />);
    });
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/نام محصول/), { target: { value: 'Test Product' } });
      fireEvent.change(screen.getByLabelText(/توضیحات/), { target: { value: 'Test description' } });
      fireEvent.change(screen.getByLabelText(/موجودی/), { target: { value: '10' } });
      fireEvent.change(screen.getByTestId('file-input'), { target: { files: [mockFile] } });
      fireEvent.click(screen.getByText('اضافه کردن محصول'));
    });
    await waitFor(() => {
      expect(mockAxiosPost).toHaveBeenCalledWith(
        '/seller/product/add_product',
        expect.any(FormData),
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      expect(screen.getByText('محصول با موفقیت اضافه شد!')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.queryByText('محصول با موفقیت اضافه شد!')).not.toBeInTheDocument();
    }, { timeout: 3500 });
  });

  test('handles API submission error', async () => {
    mockAxiosPost.mockRejectedValue(new Error('API error'));
  
    await act(async () => {
      render(<AddProduct />);
    });
  
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/نام محصول/), { target: { value: 'Test Product' } });
      fireEvent.change(screen.getByLabelText(/توضیحات/), { target: { value: 'Test description' } });
      fireEvent.change(screen.getByLabelText(/موجودی/), { target: { value: '10' } });
      fireEvent.change(screen.getByTestId('file-input'), { target: { files: [mockFile] } });
      fireEvent.click(screen.getByText('اضافه کردن محصول'));
    });
  
    await waitFor(() => {
      expect(mockAxiosPost).toHaveBeenCalled();
      expect(showErrorToast).toHaveBeenCalled();
    });
  });
  


  test('navigates back when return button is clicked', async () => {
    await act(async () => {
      render(<AddProduct />);
    });
    await act(async () => {
      fireEvent.click(screen.getByText('بازگشت'));
    });
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});