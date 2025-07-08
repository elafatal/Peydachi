import { render, screen, fireEvent } from '@testing-library/react';
import EditProductModal from '../Store/EditProductModal';

describe('EditProductModal Component - Tests', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    description: 'This is a test product description',
    pic_url: '/test.jpg',
    quantity: 10,
  };

  const mockProductEditData = {
    name: 'Test Product',
    description: 'This is a test product description',
    quantity: 10,
  };

  const mockFile = new File(['dummy content'], 'test.png', { type: 'image/png' });

  const mockOnClose = jest.fn();
  const mockOnChange = jest.fn();
  const mockOnFileChange = jest.fn();
  const mockOnUpdateQuantity = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnRemovePic = jest.fn();
  const mockOnSave = jest.fn();
  const mockClearSelectedFile = jest.fn();
  const mockHandleUploadProductPic = jest.fn();

  const defaultProps = {
    selectedProduct: mockProduct,
    selectedFile: null,
    productEditData: mockProductEditData,
    onClose: mockOnClose,
    onChange: mockOnChange,
    onFileChange: mockOnFileChange,
    onUpdateQuantity: mockOnUpdateQuantity,
    onDelete: mockOnDelete,
    onRemovePic: mockOnRemovePic,
    onSave: mockOnSave,
    clearSelectedFile: mockClearSelectedFile,
    handleUploadProductPic: mockHandleUploadProductPic,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });


  test('renders product details correctly', () => {
    render(<EditProductModal {...defaultProps} />);
    expect(screen.getByText('ویرایش محصول')).toBeInTheDocument();
    expect(screen.getByLabelText('نام محصول')).toHaveValue('Test Product');
    expect(screen.getByLabelText('توضیحات')).toHaveValue('This is a test product description');
    expect(screen.getByLabelText('مدیریت انبار')).toHaveValue(10);
    expect(screen.getByAltText('Test Product')).toHaveAttribute('src', '/test.jpg');
  });

  test('updates name input correctly', () => {
    render(<EditProductModal {...defaultProps} />);
    const nameInput = screen.getByLabelText('نام محصول');
    fireEvent.change(nameInput, { target: { value: 'Updated Product' } });
    expect(mockOnChange).toHaveBeenCalledWith(expect.any(Object));
  });

  test('updates description input correctly', () => {
    render(<EditProductModal {...defaultProps} />);
    const descriptionInput = screen.getByLabelText('توضیحات');
    fireEvent.change(descriptionInput, { target: { value: 'Updated description' } });
    expect(mockOnChange).toHaveBeenCalledWith(expect.any(Object));
  });

  test('updates quantity input correctly', () => {
    render(<EditProductModal {...defaultProps} />);
    const quantityInput = screen.getByLabelText('مدیریت انبار');
    fireEvent.change(quantityInput, { target: { value: '20' } });
    expect(mockOnChange).toHaveBeenCalledWith(expect.any(Object));
  });

  test('calls onClose when close button is clicked', () => {
    render(<EditProductModal {...defaultProps} />);
    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('calls onUpdateQuantity when quantity update button is clicked', () => {
    render(<EditProductModal {...defaultProps} />);
    const updateButton = screen.getByText('تغییر موجودی');
    fireEvent.click(updateButton);
    expect(mockOnUpdateQuantity).toHaveBeenCalled();
  });

  test('calls onFileChange when a file is selected', () => {
    render(<EditProductModal {...defaultProps} />);
    const fileInput = screen.getByLabelText('آپلود عکس جدید');
    fireEvent.change(fileInput, { target: { files: [mockFile] } });
    expect(mockOnFileChange).toHaveBeenCalledWith(expect.any(Object));
  });

  test('calls onRemovePic when remove image button is clicked', () => {
    render(<EditProductModal {...defaultProps} />);
    const removeButton = screen.getByTestId('remove-pic-button');
    fireEvent.click(removeButton);
    expect(mockOnRemovePic).toHaveBeenCalled();
  });


  test('calls onDelete when delete button is clicked', () => {
    render(<EditProductModal {...defaultProps} />);
    const deleteButton = screen.getByText('حذف محصول');
    fireEvent.click(deleteButton);
    expect(mockOnDelete).toHaveBeenCalled();
  });

  test('calls onSave when save button is clicked', () => {
    render(<EditProductModal {...defaultProps} />);
    const saveButton = screen.getByText('ذخیره تغییرات');
    fireEvent.click(saveButton);
    expect(mockOnSave).toHaveBeenCalled();
  });

});