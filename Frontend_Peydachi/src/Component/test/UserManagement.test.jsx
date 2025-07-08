import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import UserManagement from '../Admin/AdminUser/UserManagement';
import axiosInstance from '../axiosInstance';
import Swal from 'sweetalert2';

// Mock dependencies
jest.mock('../axiosInstance');
jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

describe('UserManagement Component - Tests', () => {
  const mockUsers = [
    {
      id: 1,
      username: 'john_doe',
      email: 'john@example.com',
      phone_number: '+1234567890',
      is_seller: true,
      is_admin: false,
      is_super_admin: false,
      is_banned: false,
    },
    {
      id: 2,
      username: 'jane_smith',
      email: 'jane@example.com',
      phone_number: '+1987654321',
      is_seller: false,
      is_admin: true,
      is_super_admin: false,
      is_banned: true,
    },
    {
      id: 3,
      username: 'alex_wilson',
      email: 'alex@example.com',
      phone_number: '+1122334455',
      is_seller: false,
      is_admin: false,
      is_super_admin: false,
      is_banned: false,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    axiosInstance.post.mockReset();
    axiosInstance.put.mockReset();
    axiosInstance.delete.mockReset();
  });

  test('renders component correctly', async () => {
    await act(async () => {
      render(<UserManagement />);
    });
    expect(screen.getByRole('button', { name: /جستجو با نام کاربری/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /همه/i })).toBeInTheDocument();
    expect(screen.getByText('جستجو')).toBeInTheDocument();
    expect(screen.getByText('پاک کردن')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search by username...')).toBeInTheDocument();
  });


  test('filters users by banned status', async () => {
    axiosInstance.post.mockResolvedValueOnce({ data: [mockUsers[1]] });
    await act(async () => {
      render(<UserManagement />);
    });
    const statusFilterButton = screen.getByRole('button', { name: /همه/i });
    await act(async () => {
      fireEvent.click(statusFilterButton);
      // Wait for dropdown to open and find the option
      const bannedOption = await screen.findByText('کاربران مسدود', {}, { timeout: 2000 });
      fireEvent.click(bannedOption);
    });
    await waitFor(() => {
      expect(screen.getByText('jane_smith')).toBeInTheDocument();
      expect(screen.getByText('مسدود')).toBeInTheDocument();
      expect(screen.queryByText('john_doe')).not.toBeInTheDocument();
    });
  });


  test('bans a user and shows toast', async () => {
    axiosInstance.post.mockResolvedValueOnce({ data: mockUsers });
    axiosInstance.put.mockResolvedValueOnce({ status: 200 });
    await act(async () => {
      render(<UserManagement />);
    });
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('Search by username...'), { target: { value: 'john' } });
      fireEvent.click(screen.getByText('جستجو'));
    });
    await waitFor(() => {
      expect(screen.getByText('john_doe')).toBeInTheDocument();
    });
    const banButton = screen.getAllByTitle('Ban User')[0];
    await act(async () => {
      fireEvent.click(banButton);
    });
    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(expect.objectContaining({ title: 'کاربر محدود شد' }));
      expect(axiosInstance.put).toHaveBeenCalledWith('admin/user/ban_user', { user_id: 1 });
    });
  });

  test('unbans a user and shows toast', async () => {
    axiosInstance.post.mockResolvedValueOnce({ data: [mockUsers[1]] });
    axiosInstance.put.mockResolvedValueOnce({ status: 200 });
    await act(async () => {
      render(<UserManagement />);
    });
    const statusFilterButton = screen.getByRole('button', { name: /همه/i });
    await act(async () => {
      fireEvent.click(statusFilterButton);
      // Wait for dropdown to open and find the option
      const bannedOption = await screen.findByText('کاربران مسدود', {}, { timeout: 2000 });
      fireEvent.click(bannedOption);
    });
    await waitFor(() => {
      expect(screen.getByText('jane_smith')).toBeInTheDocument();
    });
    const unbanButton = screen.getAllByTitle('Unban User')[0];
    await act(async () => {
      fireEvent.click(unbanButton);
    });
    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(expect.objectContaining({ title: 'محدودیت کاربر برداشته شد' }));
      expect(axiosInstance.put).toHaveBeenCalledWith('admin/user/unban_user', { user_id: 2 });
    });
  });

  test('promotes user to seller and shows toast', async () => {
    axiosInstance.post.mockResolvedValueOnce({ data: [mockUsers[2]] });
    axiosInstance.post.mockResolvedValueOnce({ status: 200 });
    await act(async () => {
      render(<UserManagement />);
    });
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('Search by username...'), { target: { value: 'alex' } });
      fireEvent.click(screen.getByText('جستجو'));
    });
    await waitFor(() => {
      expect(screen.getByText('alex_wilson')).toBeInTheDocument();
    });
    const promoteButton = screen.getAllByTitle('Promote to Seller')[0];
    await act(async () => {
      fireEvent.click(promoteButton);
    });
    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(expect.objectContaining({ title: 'تغییر دسترسی انجام شد' }));
      expect(axiosInstance.post).toHaveBeenCalledWith('/admin/user/promote_user_to_seller', { user_id: 3 });
    });
  });

  test('deletes a user and shows toast', async () => {
    axiosInstance.post.mockResolvedValueOnce({ data: mockUsers });
    axiosInstance.delete.mockResolvedValueOnce({ status: 200 });
    await act(async () => {
      render(<UserManagement />);
    });
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('Search by username...'), { target: { value: 'john' } });
      fireEvent.click(screen.getByText('جستجو'));
    });
    await waitFor(() => {
      expect(screen.getByText('john_doe')).toBeInTheDocument();
    });
    const deleteButton = screen.getAllByLabelText('حذف کاربر')[0];
    await act(async () => {
      fireEvent.click(deleteButton);
    });
    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(expect.objectContaining({ title: 'کاربر حذف شد' }));
      expect(axiosInstance.delete).toHaveBeenCalledWith('/admin/user/delete_user', { data: { user_id: 1 } });
    });
  });
});