import { render, screen, fireEvent } from '@/lib/test-utils';
import { InvoiceList } from '../InvoiceList';
import { mockInvoices } from '@/lib/test-utils';

describe('InvoiceList', () => {
  const mockOnMenuOpen = jest.fn();

  beforeEach(() => {
    mockOnMenuOpen.mockClear();
  });

  it('renders invoice list correctly', () => {
    render(<InvoiceList invoices={mockInvoices} onMenuOpen={mockOnMenuOpen} />);

    // Check if invoice names are rendered
    expect(screen.getByText('Test Invoice 1')).toBeInTheDocument();
    expect(screen.getByText('Test Invoice 2')).toBeInTheDocument();

    // Check if invoice numbers are rendered
    expect(screen.getByText('INV-2024-001')).toBeInTheDocument();
    expect(screen.getByText('INV-2024-002')).toBeInTheDocument();

    // Check if statuses are rendered
    expect(screen.getByText('paid')).toBeInTheDocument();
    expect(screen.getByText('pending')).toBeInTheDocument();
  });

  it('calls onMenuOpen when menu button is clicked', () => {
    render(<InvoiceList invoices={mockInvoices} onMenuOpen={mockOnMenuOpen} />);

    const menuButtons = screen.getAllByRole('button');
    fireEvent.click(menuButtons[0]);

    expect(mockOnMenuOpen).toHaveBeenCalledTimes(1);
    expect(mockOnMenuOpen).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({
        id: mockInvoices[0].id,
        name: mockInvoices[0].name
      })
    );
  });

  it('renders empty state when no invoices', () => {
    render(<InvoiceList invoices={[]} onMenuOpen={mockOnMenuOpen} />);
    
    expect(screen.queryByText('Test Invoice 1')).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('formats currency correctly', () => {
    render(<InvoiceList invoices={mockInvoices} onMenuOpen={mockOnMenuOpen} />);

    expect(screen.getByText('Rp 15,000,000')).toBeInTheDocument();
    expect(screen.getByText('Rp 8,500,000')).toBeInTheDocument();
  });
});