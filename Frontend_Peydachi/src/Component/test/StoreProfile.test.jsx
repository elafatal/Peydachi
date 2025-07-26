import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import StoreProfile from '../Store/StoreProfile/StoreProfile';
import { BrowserRouter } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import showErrorToast from '../utils/showErrorToast';
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
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),  // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
jest.mock('../utils/showErrorToast', () => ({
  __esModule: true,
  default: jest.fn(),
}));

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
const manyProducts = Array.from({ length: 11 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  description: `Description ${i + 1}`,
  quantity: 10 + i,
  date_added: `2025-04-${10 + i}T10:30:00.000Z`,
  pic_url: `/product${i + 1}.jpg`,
  average_rating: 4.0 + (i % 5) * 0.1,
  city_id: 1,
}));


describe('StoreProfile Component - Tests', () => {
  beforeEach(() => {
    axiosInstance.post.mockReset();
    formatDistanceToNow.mockReturnValue('about 1 month ago');
    axiosInstance.post
    .mockResolvedValueOnce({ data: mockStore })        // store fetch
    .mockResolvedValueOnce({ data: manyProducts })     // initial products
    .mockResolvedValueOnce({ data: [mockProduct] });   // next page (after click)

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

  test('typing in search input and clicking search updates products', async () => {
    axiosInstance.post.mockReset();
    axiosInstance.post
      .mockResolvedValueOnce({ data: mockStore })
      .mockResolvedValueOnce({ data: [mockProduct] })
      .mockResolvedValueOnce({ data: [mockProduct] });

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
    axiosInstance.post
      .mockResolvedValueOnce({ data: mockStore })     
      .mockResolvedValueOnce({ data: manyProducts })    
      .mockResolvedValueOnce({ data: [mockProduct] });   
  
    render(
      <BrowserRouter>
        <StoreProfile />
      </BrowserRouter>
    );
  
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();  // From manyProducts
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
      expect(showErrorToast).toHaveBeenCalledWith(expect.any(Error));
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