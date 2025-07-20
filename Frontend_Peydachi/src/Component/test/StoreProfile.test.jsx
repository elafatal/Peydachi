import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import StoreProfile from '../Store/StoreProfile/StoreProfile';
import { BrowserRouter } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import { formatDistanceToNow } from 'date-fns';
import { act } from 'react'
jest.mock('../axiosInstance', () => ({
  post: jest.fn(),
}));
jest.mock('date-fns', () => ({
  formatDistanceToNow: jest.fn(),
}));
jest.mock('../Store/StoreProfile/ProductReview.jsx', () => () => <div>ProductReview</div>);
jest.mock('../Store/StoreProfile/StoreComment.jsx', () => () => <div>StoreComment</div>);
const mockStore = {
  id: 1,
  name: 'Test Store',
  description: 'This is a test store',
  average_rating: 4.5,
  average_product_rating: 4.2,
  contact_info: {
    phone: '123456789',
    email: 'test@store.com',
  },
};

const mockProduct = {
  id: 1,
  name: 'Test Product',
  description: 'Test product description',
  quantity: 10,
  date_added: '2025-04-15T10:30:00.000Z',
  pic_url: '/test.jpg',
  average_rating: 4.8,
  city_id: 1,
};

describe('StoreProfile Component - Tests', () => {
  beforeEach(() => {
    axiosInstance.post.mockReset();
    formatDistanceToNow.mockReturnValue('about 1 month ago');
    axiosInstance.post
      .mockResolvedValueOnce({ data: mockStore }) // For /store/get_store_by_id
      .mockResolvedValueOnce({ data: [mockProduct] }); // For /product/full_search_in_store_products
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading indicator initially', async () => {
    render(
      <BrowserRouter>
        <StoreProfile />
      </BrowserRouter>
    );

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Test Store')).toBeInTheDocument();
    });
  });

  test('renders store details correctly', async () => {
    render(
      <BrowserRouter>
        <StoreProfile />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Store')).toBeInTheDocument();
      expect(screen.getByText('This is a test store')).toBeInTheDocument();
      // Query specific spans for contact info
      expect(screen.getByText('123456789')).toBeInTheDocument();
      expect(screen.getByText('test@store.com')).toBeInTheDocument();
      expect(screen.getByText('4.5')).toBeInTheDocument();
      expect(screen.getByText('4.2')).toBeInTheDocument();
    });
  });

  test('renders product card with correct details', async () => {
    render(
      <BrowserRouter>
        <StoreProfile />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByText('Test product description')).toBeInTheDocument();
      expect(screen.getByText(/10 موجود در انبار/)).toBeInTheDocument();
      expect(screen.getByText('about 1 month ago')).toBeInTheDocument();
    });
  });

  test('clicking "ثبت نظر" button opens product review modal', async () => {
    render(
      <BrowserRouter>
        <StoreProfile />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
    });

    const reviewButton = screen.getByText('ثبت نظر');
    fireEvent.click(reviewButton);

    expect(screen.getByText('ProductReview')).toBeInTheDocument();
  });

  test('typing in search input and clicking search updates products', async () => {
    axiosInstance.post.mockReset();
    axiosInstance.post
      .mockResolvedValueOnce({ data: mockStore })
      .mockResolvedValueOnce({ data: [mockProduct] })
      .mockResolvedValueOnce({ data: [mockProduct] }); // Additional mock for search

    render(
      <BrowserRouter>
        <StoreProfile />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('جستجوی محصول...');
    fireEvent.change(searchInput, { target: { value: 'New Search' } });
    expect(searchInput).toHaveValue('New Search');

    const searchButton = screen.getByTestId('search-button');
    await act(async () => {
      fireEvent.click(searchButton);
    });

    await waitFor(() => {
      expect(axiosInstance.post).toHaveBeenCalledWith(
        '/product/full_search_in_store_products',
        expect.objectContaining({ search_text: 'New Search' })
      );
    });
  });

  test('clicking "نمایش بیشتر" button increases offset', async () => {
    axiosInstance.post.mockReset();
    axiosInstance.post
      .mockResolvedValueOnce({ data: mockStore })
      .mockResolvedValueOnce({ data: [mockProduct] })
      .mockResolvedValueOnce({ data: [mockProduct] }); // Additional mock for offset change

    render(
      <BrowserRouter>
        <StoreProfile />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
    });

    const loadMoreButton = screen.getByText('نمایش بیشتر');
    await act(async () => {
      fireEvent.click(loadMoreButton);
    });

    await waitFor(() => {
      expect(axiosInstance.post).toHaveBeenCalledWith(
        '/product/full_search_in_store_products',
        expect.objectContaining({ page: 2 })
      );
    });
  });

  test('changing sort option triggers product fetch', async () => {
    axiosInstance.post.mockReset();
    axiosInstance.post
      .mockResolvedValueOnce({ data: mockStore })
      .mockResolvedValueOnce({ data: [mockProduct] })
      .mockResolvedValueOnce({ data: [mockProduct] }); // Additional mock for sort change

    render(
      <BrowserRouter>
        <StoreProfile />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
    });

    const sortSelect = screen.getByRole('combobox');
    await act(async () => {
      fireEvent.change(sortSelect, { target: { value: 'rating' } });
    });

    await waitFor(() => {
      expect(axiosInstance.post).toHaveBeenCalledWith(
        '/product/full_search_in_store_products',
        expect.objectContaining({ order: 'favorite' })
      );
    });
  });

  test('handles API error gracefully', async () => {
    axiosInstance.post.mockReset();
    axiosInstance.post
      .mockRejectedValueOnce(new Error('API Error')) // Error for store fetch
      .mockResolvedValueOnce({ data: [mockProduct] }); // Success for products

    render(
      <BrowserRouter>
        <StoreProfile />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('مشکلی در بارگیری اطلاعات فروشگاه رخ داد.')).toBeInTheDocument();
    });
  });

  test('renders StoreComment component', async () => {
    render(
      <BrowserRouter>
        <StoreProfile />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('StoreComment')).toBeInTheDocument();
    });
  });
});