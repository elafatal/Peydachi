import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import StoreComment from '../Store/StoreProfile/StoreComment';
import StoreFullComment from '../Store/StoreProfile/StoreFullComment';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import axios from '../axiosInstance';

jest.mock('../axiosInstance', () => ({
  post: jest.fn()
}));
beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterAll(() => {
    console.log.mockRestore();
    console.error.mockRestore();
  });

const mockComments = [
  { id: 1, user_name: 'علی', text: 'نظر خوب', date_added: new Date().toISOString() },
  { id: 2, user_name: 'مریم', text: 'فوق‌العاده', date_added: new Date().toISOString() },
];

describe('StoreComment and StoreFullComment', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays correct number of comments in badge', async () => {
    axios.post.mockResolvedValueOnce({ data: mockComments });
  
    render(
      <MemoryRouter initialEntries={['/storeComments/1']}>
        <Routes>
          <Route path="/storeComments/:storeID" element={<StoreFullComment />} />
        </Routes>
      </MemoryRouter>
    );
  
    expect(await screen.findByText(mockComments.length.toString())).toBeInTheDocument();
  });
  test('does not show ellipsis card when loading', () => {
    axios.post.mockImplementation(() => new Promise(() => {})); // simulate long loading
  
    render(<BrowserRouter><StoreComment storeID={1} /></BrowserRouter>);
  
    const ellipsis = screen.queryByRole('button', { name: /ellipsis/i });
    expect(ellipsis).not.toBeInTheDocument(); // باید وجود نداشته باشد چون هنوز لود نشده
  });
  

  test('renders loading skeletons before data loads', () => {
    axios.post.mockImplementation(() => new Promise(() => {}));
    render(<BrowserRouter><StoreComment storeID={1} /></BrowserRouter>);
    expect(screen.getAllByText((_, element) => element.classList.contains('animate-pulse')).length).toBeGreaterThan(0);
  });

  test('clicking "مشاهده‌ی همه" navigates to full comments page', async () => {
    axios.post.mockResolvedValueOnce({ data: mockComments });
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<StoreComment storeID={1} />} />
          <Route path="/storeComments/:storeID" element={<div>Full Comments Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    const button = await screen.findByText('مشاهده‌ی همه');
    fireEvent.click(button);
    await waitFor(() => expect(screen.getByText('Full Comments Page')).toBeInTheDocument());
  });

  test('renders StoreFullComment and lists all comments', async () => {
    axios.post.mockResolvedValueOnce({ data: mockComments });
    render(
      <MemoryRouter initialEntries={['/storeComments/1']}>
        <Routes>
          <Route path="/storeComments/:storeID" element={<StoreFullComment />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText('نظرات مشتریان')).toBeInTheDocument();
    expect(await screen.findByText('علی')).toBeInTheDocument();
  });

  test('shows empty state when no comments available', async () => {
    axios.post.mockResolvedValueOnce({ data: [] });
    render(
      <MemoryRouter initialEntries={['/storeComments/1']}>
        <Routes>
          <Route path="/storeComments/:storeID" element={<StoreFullComment />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText('هنوز نظری وجود ندارد')).toBeInTheDocument();
  });

  test('submits only rating and shows success message', async () => {
    axios.post.mockResolvedValue({ data: {} }); // for both rating & comment

    render(
      <MemoryRouter initialEntries={['/storeComments/1']}>
        <Routes>
          <Route path="/storeComments/:storeID" element={<StoreFullComment />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getAllByRole('button', { name: '' })[1]); // select 1 star
    const buttons = await screen.findAllByText('ثبت بازخورد');
    fireEvent.click(buttons[buttons.length - 1]); // معمولاً آخری واقعیه
    

    expect(await screen.findByText('بازخورد شما با موفقیت ارسال شد!')).toBeInTheDocument();
  });

  test('shows error when submitting empty feedback', async () => {
    render(
      <MemoryRouter initialEntries={['/storeComments/1']}>
        <Routes>
          <Route path="/storeComments/:storeID" element={<StoreFullComment />} />
        </Routes>
      </MemoryRouter>
    );
  
    const buttons = await screen.findAllByText('ثبت بازخورد');
    const submitButton = buttons.find((el) => el.tagName === 'BUTTON');
    fireEvent.click(submitButton);
  
    expect(await screen.findByText('لطفا قبل از ارسال، نظر یا امتیاز خود را اضافه کنید')).toBeInTheDocument();
  });
  
});
