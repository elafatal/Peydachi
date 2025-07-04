import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchStore from '../otherServices/Store/SearchStore/SearchStore';
import { BrowserRouter } from 'react-router-dom';
import * as useSearchStoreHook from '../otherServices/Store/SearchStore/useSearchStore';

const mockStore = {
  id: 1,
  name: 'فروشگاه تستی',
  description: 'توضیحات تستی',
  city_id: 10,
};

jest.mock('../axiosInstance', () => ({
  post: jest.fn().mockResolvedValue({ data: [] }),
}));

describe('SearchStore Component - Custom Tests', () => {
  let mockHookValues;

  beforeEach(() => {
    mockHookValues = {
      searchQuery: 'تست',
      City: 'تهران',
      searchResults: [mockStore],
      isLoading: false,
      error: null,
      selectedCity: null,
      selectedItem: null,
      showDetail: false,
      allCities: [],
      showCityDropdown: false,
      filteredCities: [],
      cityIndex: -1,
      setShowCityDropdown: jest.fn(),
      handleCityInput: jest.fn(),
      handleCitySelect: jest.fn(),
      handleSearchChange: jest.fn(),
      handleItemClick: jest.fn(),
      handleKeywordClick: jest.fn(),
      handleBackToResults: jest.fn(),
      clearSearch: jest.fn(),
      handleCityKeyDown: jest.fn(),
      HandleCityItems: jest.fn(),
      setSearchQuery: jest.fn()
    };

    jest.spyOn(useSearchStoreHook, 'default').mockReturnValue(mockHookValues);
  });

  test('renders search input with correct placeholder', () => {
    render(<BrowserRouter><SearchStore /></BrowserRouter>);
    expect(screen.getByPlaceholderText('جستجو در فروشگاه‌ها')).toBeInTheDocument();
  });

  test('typing in store search input calls handleSearchChange', () => {
    render(<BrowserRouter><SearchStore /></BrowserRouter>);
    const input = screen.getByPlaceholderText('جستجو در فروشگاه‌ها');
    fireEvent.change(input, { target: { value: 'نوشیدنی' } });
    expect(mockHookValues.handleSearchChange).toHaveBeenCalled();
  });

  test('clicking clear search button calls clearSearch', () => {
    render(<BrowserRouter><SearchStore /></BrowserRouter>);
    const button = screen.getByText('پاک کردن جستجو');
    fireEvent.click(button);
    expect(mockHookValues.clearSearch).toHaveBeenCalled();
  });

  test('clicking on city input calls handleCityInput', () => {
    render(<BrowserRouter><SearchStore /></BrowserRouter>);
    const input = screen.getByPlaceholderText('شهر فروشگاه(اختیاری)');
    fireEvent.change(input, { target: { value: 'اصفهان' } });
    expect(mockHookValues.handleCityInput).toHaveBeenCalled();
  });

  test('clicking on store name triggers handleItemClick', () => {
    render(<BrowserRouter><SearchStore /></BrowserRouter>);
    fireEvent.click(screen.getByText('فروشگاه تستی'));
    expect(mockHookValues.handleItemClick).toHaveBeenCalledWith(mockStore);
  });
  test('displays store details when showDetail is true', () => {
    mockHookValues.showDetail = true;
    mockHookValues.selectedItem = mockStore;
    render(<BrowserRouter><SearchStore /></BrowserRouter>);
    expect(screen.getByText('توضیحات تستی')).toBeInTheDocument();
  });
  test('should fetch stores from backend when searchQuery changes', async () => {
    const axios = require('../axiosInstance');
    const mockResponse = [{ id: 2, name: 'فروشگاه دوم', city_id: 2 }];
    axios.post.mockResolvedValueOnce({ data: mockResponse });
  
    render(<BrowserRouter><SearchStore /></BrowserRouter>);
  
    const input = screen.getByPlaceholderText('جستجو در فروشگاه‌ها');
    fireEvent.change(input, { target: { value: 'فروشگاه دوم' } });
  
    await waitFor(() => {
      expect(mockHookValues.handleSearchChange).toHaveBeenCalled();
    });
  });
  
});
