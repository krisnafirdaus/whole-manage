import { renderHook, act } from '@testing-library/react';
import { useInvoices } from '../use-invoices';
import { mockInvoices } from '@/lib/test-utils';

describe('useInvoices', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should load initial invoices from localStorage', () => {
    localStorage.setItem('invoices', JSON.stringify(mockInvoices));
    const { result } = renderHook(() => useInvoices());

    expect(result.current.invoices).toEqual(mockInvoices);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should handle adding a new invoice', () => {
    const { result } = renderHook(() => useInvoices());
    const newInvoice = {
      id: '3',
      name: 'New Invoice',
      number: 'INV-2024-003',
      amount: 10000000,
      status: 'pending',
      dueDate: '2024-03-15T00:00:00.000Z',
      createdAt: '2024-02-15T00:00:00.000Z'
    };

    act(() => {
      result.current.addInvoice(newInvoice);
    });

    expect(result.current.invoices).toContainEqual(newInvoice);
    expect(JSON.parse(localStorage.getItem('invoices') || '[]')).toContainEqual(newInvoice);
  });

  it('should handle updating an invoice', () => {
    localStorage.setItem('invoices', JSON.stringify(mockInvoices));
    const { result } = renderHook(() => useInvoices());
    const updatedStatus = 'paid';

    act(() => {
      result.current.updateInvoice('2', { status: updatedStatus });
    });

    const updatedInvoice = result.current.invoices.find(inv => inv.id === '2');
    expect(updatedInvoice?.status).toBe(updatedStatus);
  });

  it('should handle deleting an invoice', () => {
    localStorage.setItem('invoices', JSON.stringify(mockInvoices));
    const { result } = renderHook(() => useInvoices());

    act(() => {
      result.current.deleteInvoice('2');
    });

    expect(result.current.invoices).toHaveLength(mockInvoices.length - 1);
    expect(result.current.invoices.find(inv => inv.id === '2')).toBeUndefined();
  });

  it('should handle localStorage errors', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Storage error');
    });

    const { result } = renderHook(() => useInvoices());

    expect(result.current.error).toBe('Failed to load invoices');
    expect(result.current.loading).toBe(false);
  });
});