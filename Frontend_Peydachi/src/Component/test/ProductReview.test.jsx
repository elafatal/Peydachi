// ProductReview.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductReview from '../Store/StoreProfile/ProductReview';
import '@testing-library/jest-dom';

jest.mock('../axiosInstance', () => ({
  post: jest.fn().mockResolvedValue({ status: 201 }),
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

describe('ProductReview Component', () => {
  const defaultProps = {
    isModalOpen: true,
    setIsModalOpen: jest.fn(),
    closeProductModal: jest.fn(),
    selectedProduct: {
      id: 1,
      name: 'محصول تستی',
      store_id: 10,
      pic_url: '/test.jpg'
    }
  };

  test('renders product name and image', () => {
    render(<ProductReview {...defaultProps} />);
    expect(screen.getByText('محصول تستی')).toBeInTheDocument();
    expect(screen.getByAltText('محصول تستی')).toBeInTheDocument();
  });

  test('allows selecting a rating by clicking stars', () => {
    render(<ProductReview {...defaultProps} />);
    const thirdStar = screen.getAllByRole('button', { name: /rate/i })[2];
    fireEvent.click(thirdStar);
    expect(screen.getByText('3')).toBeInTheDocument(); // نمایش عدد امتیاز
  });

  test('shows error if submitting empty form', async () => {
    render(<ProductReview {...defaultProps} />);
    const submitBtn = screen.getByText('ثبت بازخورد');
    fireEvent.click(submitBtn);
    await waitFor(() => {
      expect(screen.getByText('Please provide either a rating or a comment')).toBeInTheDocument();
    });
  });

  test('submits form successfully with rating only', async () => {
    render(<ProductReview {...defaultProps} />);
    const fifthStar = screen.getAllByRole('button', { name: /rate/i })[4];
    fireEvent.click(fifthStar);

    const submitBtn = screen.getByText('ثبت بازخورد');
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('درحال ثبت')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(defaultProps.setIsModalOpen).toHaveBeenCalledWith(false);
    });
  });

  test('textarea accepts comment input', () => {
    render(<ProductReview {...defaultProps} />);
    const textarea = screen.getByPlaceholderText(/نظرات خود را/);
    fireEvent.change(textarea, { target: { value: 'خیلی خوب بود' } });
    expect(textarea.value).toBe('خیلی خوب بود');
  });
});
