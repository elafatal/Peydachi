
import { render, screen, fireEvent } from '@testing-library/react';
import FirstSection from '../landingPage/firstSection';
import { BrowserRouter } from 'react-router-dom';
import axiosInstance from '../axiosInstance';


jest.mock('../axiosInstance', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));
beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterAll(() => {
    console.log.mockRestore();
    console.error.mockRestore();
  });

describe('FirstSection Form Input Test', () => {
  beforeEach(() => {
    axiosInstance.get.mockImplementation((url) => {
      if (url.includes('/region')) {
        return Promise.resolve({ data: [{ id: 1, name: 'تهران' }] });
      }
      if (url.includes('/city')) {
        return Promise.resolve({ data: [{ id: 10, name: 'ری' }] });
      }
      return Promise.resolve({ data: [] });
    });

    axiosInstance.post.mockResolvedValue({ data: [{ id: 10, name: 'ری' }] });
  });

  test('should fill and submit the form correctly', async () => {
    render(
      <BrowserRouter>
        <FirstSection />
      </BrowserRouter>
    );

    // انتظار برای رندر ورودی‌ها
    const productInput = await screen.findByPlaceholderText(/دنبال چی میگردی‌؟/i);
    const provinceInput = await screen.findByPlaceholderText(/استان/i);
    const cityInput = await screen.findByPlaceholderText(/شهر/i);
    const searchButton = await screen.findByRole('button', { name: /جستجو/i });

    // نوشتن مقدار داخل فیلدها
    fireEvent.change(productInput, { target: { value: 'نوشابه' } });
    fireEvent.change(provinceInput, { target: { value: 'تهران' } });
    fireEvent.keyDown(provinceInput, { key: 'Enter', code: 'Enter' });

    fireEvent.change(cityInput, { target: { value: 'ری' } });
    fireEvent.keyDown(cityInput, { key: 'Enter', code: 'Enter' });

    fireEvent.click(searchButton);

    // بررسی اینکه مقدارها درست ثبت شده
    expect(productInput.value).toBe('نوشابه');
    expect(provinceInput.value).toBe('تهران');
    expect(cityInput.value).toBe('ری');
  });
});
