import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SelfProductModal from '../Store/SelfProductModal';
jest.mock('../axiosInstance', () => ({
  __esModule: true,
  default: {
    post: jest.fn().mockResolvedValue({ data: { name: 'City 1' } }),
  },
}));

jest.mock('../utils/formatDate', () => ({
  __esModule: true,
  default: jest.fn((date) => {
    if (date === '2025-04-15T10:30:00.000Z') return 'April 15, 2025';
    if (date === '2025-04-16T12:00:00.000Z') return 'April 16, 2025';
    if (date === '2025-04-17T12:00:00.000Z') return 'April 17, 2025';
    return 'Unknown Date';
  }),
}));
describe('SelfProductModal Component - Tests', () => {

  const mockProduct = {
    id: 1,
    name: 'Test Product',
    description: 'This is a test product description',
    pic_url: '/test.jpg',
    quantity: 10,
    city_id: 1,
    date_added: '2025-04-15T10:30:00.000Z',
    average_rating: 4.5,
  };

  const mockComments = [
    {
      id: 1,
      user_name: 'Ali',
      text: 'Great product!',
      date_added: '2025-04-16T12:00:00.000Z',
    },
    {
      id: 2,
      user_name: 'Sara',
      text: 'Really satisfied.',
      date_added: '2025-04-17T12:00:00.000Z',
    },
  ];

  const mockFormatDate = jest.fn((date) => 'April 15, 2025');
  const mockGetCityName = jest.fn((cityId) => `City ${cityId}`);
  const mockCloseProductModal = jest.fn();
  const mockToggleFavorite = jest.fn();
  const mockFavorites = [];

  const defaultProps = {
    selectedProduct: mockProduct,
    isModalOpen: true,
    comments: mockComments,
    closeProductModal: mockCloseProductModal,
    getCityName: mockGetCityName,
    formatDate: mockFormatDate,
    toggleFavorite: mockToggleFavorite,
    favorites: mockFavorites,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockFormatDate.mockImplementation((date) => {
      if (date === mockProduct.date_added) return 'April 15, 2025';
      if (date === mockComments[0].date_added) return 'April 16, 2025';
      if (date === mockComments[1].date_added) return 'April 17, 2025';
      return 'Unknown Date';
    });
    mockGetCityName.mockReturnValue('City 1');
  });
  test('does not render when isModalOpen is false', () => {
    render(<SelfProductModal {...defaultProps} isModalOpen={false} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('does not render when selectedProduct is null', () => {
    render(<SelfProductModal {...defaultProps} selectedProduct={null} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('renders product details correctly', async () => {
    render(<SelfProductModal {...defaultProps} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('This is a test product description')).toBeInTheDocument();
    expect(screen.getByText('10 موجود')).toBeInTheDocument();
  
    await waitFor(() => {
      expect(screen.getByText('City 1')).toBeInTheDocument();
    });
  
    expect(screen.getByText('April 15, 2025')).toBeInTheDocument();
    expect(screen.getByText('#1')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByAltText('Test Product')).toBeInTheDocument();
  });
  

  test('renders comments correctly', () => {
    render(<SelfProductModal {...defaultProps} />);
    expect(screen.getByText('نظرات مشتریان')).toBeInTheDocument();
    expect(screen.getByText('Ali')).toBeInTheDocument();
    expect(screen.getByText('Great product!')).toBeInTheDocument();
    expect(screen.getByText('Sara')).toBeInTheDocument();
    expect(screen.getByText('Really satisfied.')).toBeInTheDocument();
  });

  test('renders no comments message when comments array is empty', () => {
    render(<SelfProductModal {...defaultProps} comments={[]} />);
    expect(screen.getByText('.نظری برای این محصول ثبت نشده است')).toBeInTheDocument();
  });

  test('calls closeProductModal when close button is clicked', () => {
    render(<SelfProductModal {...defaultProps} />);
    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);
    expect(mockCloseProductModal).toHaveBeenCalled();
  });

  test('calls closeProductModal when overlay is clicked', () => {
    render(<SelfProductModal {...defaultProps} />);
    const overlay = screen.getByTestId('overlay');
    fireEvent.click(overlay);
    expect(mockCloseProductModal).toHaveBeenCalled();
  });


});