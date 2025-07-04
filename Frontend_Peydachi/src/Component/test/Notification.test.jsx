import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Notifications from '../Notification/Notification'; 
import axiosInstance from '../axiosInstance';
import { BrowserRouter } from 'react-router-dom';
import Cookies from 'js-cookie';

jest.mock('js-cookie', () => ({
  get: jest.fn(),
}));

jest.mock('../axiosInstance', () => ({
  get: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Notifications Component', () => {
  beforeEach(() => {
    Cookies.get.mockReturnValue('fake-auth-token');
    axiosInstance.get.mockResolvedValue({
      data: {
        notif_count: 2,
        first_three_notifs: [
          { id: 1, title: 'اعلان ۱' },
          { id: 2, title: 'اعلان ۲' },
        ],
      },
    });
  });

  test('renders unread notification count and shows dropdown on click', async () => {
    render(
      <BrowserRouter>
        <Notifications />
      </BrowserRouter>
    );

    const icon = await screen.findByTestId('notif-icon');
    fireEvent.click(icon);

    // انتظار داریم که عناوین نوتیفیکیشن بیاد
    await waitFor(() => {
      expect(screen.getByText('اعلان ۱')).toBeInTheDocument();
      expect(screen.getByText('اعلان ۲')).toBeInTheDocument();
    });
  });
});
