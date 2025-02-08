import { formatCurrency, generateInvoiceNumber } from '../format';

describe('formatCurrency', () => {
  it('formats currency in IDR correctly', () => {
    expect(formatCurrency(15000000)).toBe('Rp 15,000,000');
    expect(formatCurrency(8500000)).toBe('Rp 8,500,000');
    expect(formatCurrency(0)).toBe('Rp 0');
  });
});

describe('generateInvoiceNumber', () => {
  it('generates invoice number with correct format', () => {
    const invoiceNumber = generateInvoiceNumber();
    expect(invoiceNumber).toMatch(/^INV-\d{5}$/);
  });

  it('generates unique invoice numbers', () => {
    const numbers = new Set();
    for (let i = 0; i < 100; i++) {
      numbers.add(generateInvoiceNumber());
    }
    expect(numbers.size).toBe(100);
  });
});