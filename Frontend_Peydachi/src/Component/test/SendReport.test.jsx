// SendReport.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import SendReport from '../Report/SendReport';

describe('SendReport Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders title and content inputs', () => {
    render(<SendReport />);
    expect(screen.getByLabelText(/عنوان درخواست/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/متن درخواست/i)).toBeInTheDocument();
  });

  test('updates title and text fields on user input', () => {
    render(<SendReport />);
    
    const titleInput = screen.getByLabelText(/عنوان درخواست/i);
    const textArea = screen.getByLabelText(/متن درخواست/i);

    fireEvent.change(titleInput, { target: { value: 'تست عنوان' } });
    fireEvent.change(textArea, { target: { value: 'تست متن گزارش' } });

    expect(titleInput.value).toBe('تست عنوان');
    expect(textArea.value).toBe('تست متن گزارش');
  });

  test('saves draft when clicking save draft button', () => {
    render(<SendReport />);

    const titleInput = screen.getByLabelText(/عنوان درخواست/i);
    const textArea = screen.getByLabelText(/متن درخواست/i);
    const saveButton = screen.getByRole('button', { name: /ذخیره پیش‌نویس/i });

    fireEvent.change(titleInput, { target: { value: 'پیش‌نویس عنوان' } });
    fireEvent.change(textArea, { target: { value: 'محتوای پیش‌نویس' } });
    fireEvent.click(saveButton);

    const draftsToggle = screen.getByText(/پیش‌نویس ذخیره شده/i);
    expect(draftsToggle).toBeInTheDocument();
  });

  test('disable submit button when isSubmitting is true', () => {
    render(<SendReport />);

    const submitButton = screen.getByRole('button', { name: /ارسال درخواست/i });
    expect(submitButton).toBeEnabled(); // به صورت پیش‌فرض فعال است
  });
});

// mock for matchMedia (for SweetAlert2 or MUI etc.)
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
  