
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchProduct from '../SearchProduct/SearchProduct';
import { BrowserRouter } from 'react-router-dom';
import * as useSearchProductHook from '../SearchProduct/useSearchProduct';

const mockProduct = {
  id: 1,
  name: 'محصول تستی',
  description: 'توضیح محصول تستی',
  quantity: 10,
  average_rating: 4.5,
  pic_url: '/test.png',
  city_id: 101,
  store_id: 500
};

jest.mock('../axiosInstance', () => ({
  post: jest.fn().mockResolvedValue({ data: [] }),
}));

describe('SearchProduct Component - Custom Tests', () => {
  let mockHookValues;

  beforeEach(() => {
    mockHookValues = {
      searchTerm: 'محصول',
      selectedCity: null,
      showAvailableOnly: false,
      products: [mockProduct],
      loading: false,
      selectedProduct: null,
      isModalOpen: false,
      comments: [],
      chartRef: { current: null },
      allCities: [],
      filteredProducts: [mockProduct],
      handleSearchChange: jest.fn(),
      handleCityChange: jest.fn(),
      handleAvailabilityToggle: jest.fn(),
      openProductModal: jest.fn(),
      closeProductModal: jest.fn(),
      getCityName: () => 'تهران',
      formatDate: () => '2023-01-01',
      clearFilters: jest.fn(),
      sortOption: 'relevance',
      setSortOption: jest.fn(),
      favorites: [],
      toggleFavorite: jest.fn(),
      showOnlyFavorites: false,
      setShowOnlyFavorites: jest.fn()
    };

    jest.spyOn(useSearchProductHook, 'default').mockReturnValue(mockHookValues);
  });

  test('renders product card with correct name and rating', () => {
    render(<BrowserRouter><SearchProduct /></BrowserRouter>);
    expect(screen.getByText('محصول تستی')).toBeInTheDocument();
    expect(screen.getByText('(4.5)')).toBeInTheDocument();
  });

  test('clicking on product card triggers openProductModal', () => {
    render(<BrowserRouter><SearchProduct /></BrowserRouter>);
    fireEvent.click(screen.getByText('محصول تستی'));
    expect(mockHookValues.openProductModal).toHaveBeenCalledWith(mockProduct);
  });

  test('clicking favorite icon triggers toggleFavorite', () => {
    render(<BrowserRouter><SearchProduct /></BrowserRouter>);
    const heartButton = screen.getByRole('button', { hidden: true });
    fireEvent.click(heartButton);
    expect(mockHookValues.toggleFavorite).toHaveBeenCalledWith(mockProduct.id);
  });

  test('toggle availability filter checkbox calls handler', () => {
    render(<BrowserRouter><SearchProduct /></BrowserRouter>);
    const checkbox = screen.getByLabelText('موجود');
    fireEvent.click(checkbox);
    expect(mockHookValues.handleAvailabilityToggle).toHaveBeenCalled();
  });
});
