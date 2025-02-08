import { render } from '@testing-library/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {children}
      </LocalizationProvider>
    ),
    ...options,
  });

export * from '@testing-library/react';
export { customRender as render };

export const mockInvoices = [
  {
    id: '1',
    name: 'Test Invoice 1',
    number: 'INV-2024-001',
    amount: 15000000,
    status: 'paid',
    dueDate: '2024-02-15T00:00:00.000Z',
    createdAt: '2024-01-15T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'Test Invoice 2',
    number: 'INV-2024-002',
    amount: 8500000,
    status: 'pending',
    dueDate: '2024-02-28T00:00:00.000Z',
    createdAt: '2024-01-20T00:00:00.000Z'
  }
];