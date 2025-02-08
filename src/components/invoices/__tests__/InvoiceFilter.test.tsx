import { render, screen, fireEvent } from '@/lib/test-utils';
import { InvoiceFilter } from '../InvoiceFilter';

describe('InvoiceFilter', () => {
  const mockOnSearchChange = jest.fn();
  const mockOnStatusChange = jest.fn();

  beforeEach(() => {
    mockOnSearchChange.mockClear();
    mockOnStatusChange.mockClear();
  });

  it('renders search input and status select', () => {
    render(
      <InvoiceFilter
        search=""
        status=""
        onSearchChange={mockOnSearchChange}
        onStatusChange={mockOnStatusChange}
      />
    );

    expect(screen.getByPlaceholderText('Search invoices...')).toBeInTheDocument();
    expect(screen.getByText('All Status')).toBeInTheDocument();
  });

  it('handles search input changes', () => {
    render(
      <InvoiceFilter
        search=""
        status=""
        onSearchChange={mockOnSearchChange}
        onStatusChange={mockOnStatusChange}
      />
    );
  
    const searchInput = screen.getByPlaceholderText('Search invoices...');
    fireEvent.change(searchInput, { target: { value: 'new search' } });
  
    expect(mockOnSearchChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: 'new search'
        })
      })
    );
  });

  it('handles status select changes', () => {
    render(
      <InvoiceFilter
        search=""
        status="pending"
        onSearchChange={mockOnSearchChange}
        onStatusChange={mockOnStatusChange}
      />
    );
  
    const statusSelect = screen.getByRole('combobox');
    fireEvent.mouseDown(statusSelect);
    const paidOption = screen.getByRole('option', { name: /paid/i });
    fireEvent.click(paidOption);
  
    expect(mockOnStatusChange).toHaveBeenCalledTimes(1);
    expect(mockOnStatusChange.mock.calls[0][0].target.value).toBe('paid');
  });

  it('displays current filter values', () => {
    const searchValue = 'test invoice';
    const statusValue = 'paid';
  
    render(
      <InvoiceFilter
        search={searchValue}
        status={statusValue}
        onSearchChange={mockOnSearchChange}
        onStatusChange={mockOnStatusChange}
      />
    );
  
    const searchInput = screen.getByPlaceholderText('Search invoices...');
    expect(searchInput).toHaveValue(searchValue);
  
    const statusSelect = screen.getByRole('combobox');
    expect(statusSelect).toHaveTextContent(new RegExp(statusValue, 'i'));
  });
  
  // Add after existing tests
  it('handles empty search input', () => {
    render(
      <InvoiceFilter
        search="test"
        status=""
        onSearchChange={mockOnSearchChange}
        onStatusChange={mockOnStatusChange}
      />
    );
  
    const searchInput = screen.getByPlaceholderText('Search invoices...');
    fireEvent.change(searchInput, { target: { value: '' } });
  
    expect(mockOnSearchChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: ''
        })
      })
    );
  });

  it('maintains selected status after search change', () => {
    render(
      <InvoiceFilter
        search=""
        status="pending"
        onSearchChange={mockOnSearchChange}
        onStatusChange={mockOnStatusChange}
      />
    );
  
    const searchInput = screen.getByPlaceholderText('Search invoices...');
    fireEvent.change(searchInput, { target: { value: 'test' } });
  
    const statusSelect = screen.getByRole('combobox');
    expect(statusSelect).toHaveTextContent(/pending/i);
  });
});
