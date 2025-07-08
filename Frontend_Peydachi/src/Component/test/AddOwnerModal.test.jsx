import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import AddOwnerModal from '../Admin/AdminStore/AddOwnerModal';
import axiosInstance from '../axiosInstance';

// Mock dependencies
jest.mock('../axiosInstance');

describe('AddOwnerModal Component - Tests', () => {
  const mockStore = { name: 'Test Store' };
  const mockOnAddOwner = jest.fn();
  const mockOnClose = jest.fn();
  const mockUsers = [
    { id: 1, username: 'john_doe' },
    { id: 2, username: 'jane_smith' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    axiosInstance.post.mockReset();
  });


  test('does not render modal when isOpen is false', () => {
    render(<AddOwnerModal isOpen={false} onClose={mockOnClose} store={mockStore} onAddOwner={mockOnAddOwner} />);
    expect(screen.queryByText((content, element) => {
      return element?.tagName.toLowerCase() === 'h3' && content.includes('انتخاب فروشنده برای');
    })).not.toBeInTheDocument();
  });

  test('does not render modal when store is null', () => {
    render(<AddOwnerModal isOpen={true} onClose={mockOnClose} store={null} onAddOwner={mockOnAddOwner} />);
    expect(screen.queryByText((content, element) => {
      return element?.tagName.toLowerCase() === 'h3' && content.includes('انتخاب فروشنده برای');
    })).not.toBeInTheDocument();
  });


  test('closes modal when cancel button is clicked', async () => {
    await act(async () => {
      render(<AddOwnerModal isOpen={true} onClose={mockOnClose} store={mockStore} onAddOwner={mockOnAddOwner} />);
    });
    const cancelButton = screen.getByText('لغو');
    await act(async () => {
      fireEvent.click(cancelButton);
    });
    expect(mockOnClose).toHaveBeenCalled();
  });

});