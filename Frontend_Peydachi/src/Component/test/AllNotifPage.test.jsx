import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AllNotifPage from '../Notification/AllNotifPage';
import axiosInstance from '../axiosInstance';
import { BrowserRouter } from 'react-router-dom';

jest.mock('date-fns/locale/fa-IR', () => ({
  __esModule: true,
  default: {
    code: 'fa-IR',
    formatDistance: () => 'چند لحظه پیش',
  },
}));

jest.mock('../axiosInstance', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
  },
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useLocation: () => ({
    search: '',
  }),
}));

describe('AllNotifPage - Notifications Interaction', () => {
    beforeAll(() => {
        window.matchMedia = window.matchMedia || function () {
          return {
            matches: false,
            media: '',
            onchange: null,
            addListener: () => {}, // deprecated
            removeListener: () => {}, // deprecated
            addEventListener: () => {}, // ✅ مورد نیاز sweetalert2
            removeEventListener: () => {}, // ✅
            dispatchEvent: () => false,
          };
        };
      });
      
      
  beforeEach(() => {
    axiosInstance.get.mockImplementation((url) => {
      if (url === '/notification/get_all_self_unread_notifications') {
        return Promise.resolve({
          data: [
            {
              id: 1,
              title: 'اعلان تستی',
              text: 'محتوای اعلان',
              has_seen: false,
              date_added: new Date().toISOString(),
              type: 'mention',
            },
          ],
        });
      }
      return Promise.resolve({ data: [] });
    });

    axiosInstance.post.mockResolvedValue({
      data: {
        id: 1,
        title: 'اعلان تستی',
        text: 'محتوای اعلان',
        has_seen: false,
        date_added: new Date().toISOString(),
      },
    });

    axiosInstance.put.mockResolvedValue({ status: 200 });
  });

  test('marks a notification as read when individual "خواندن" button is clicked', async () => {
    render(
      <BrowserRouter>
        <AllNotifPage />
      </BrowserRouter>
    );

    const title = await screen.findByText((content) =>
      content.includes('اعلان تستی')
    );
    fireEvent.click(title); // expand

    const readButtons = await screen.findAllByRole('button', { name: /خواندن/i });
    fireEvent.click(readButtons[1]); 
    

    await waitFor(() => {
      expect(axiosInstance.put).toHaveBeenCalledWith(
        '/notification/review_notification',
        { notification_id: 1 }
      );
    });
  });

  test('expands a notification and displays its details when clicked', async () => {
    render(
      <BrowserRouter>
        <AllNotifPage />
      </BrowserRouter>
    );
  
    const notifTitle = await screen.findByText((text) =>
      text.includes('اعلان تستی')
    );
  
    fireEvent.click(notifTitle);
  
    await waitFor(() => {
      const detailTitles = screen.getAllByText('اعلان تستی');
      const detailTexts = screen.getAllByText('محتوای اعلان');
  
      expect(detailTitles.length).toBeGreaterThan(1);
      expect(detailTexts.length).toBeGreaterThan(1); 
    });
  });
  
  test('filters notifications based on search input', async () => {
    render(
      <BrowserRouter>
        <AllNotifPage />
      </BrowserRouter>
    );
  
    await screen.findByText('اعلان تستی');
  
    const searchInput = screen.getByPlaceholderText('جستجو در اعلان‌ها');
  
    fireEvent.change(searchInput, { target: { value: 'چیزی که نیست' } });
  
    await waitFor(() => {
      const notifTitles = screen.queryByText('اعلان تستی');
      expect(notifTitles).not.toBeInTheDocument();
    });
  
    fireEvent.change(searchInput, { target: { value: 'اعلان' } });
  
    await waitFor(() => {
      const notifTitles = screen.getByText('اعلان تستی');
      expect(notifTitles).toBeInTheDocument();
    });
  });
});
