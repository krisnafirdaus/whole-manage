# Invoice Management System

A modern web application for managing invoices with features like filtering, status tracking, and CRUD operations.

## Features

- Create, view, update, and delete invoices
- Filter invoices by status (Pending/Paid)
- Search invoices by name or number
- Responsive Material-UI design
- Comprehensive test coverage

## Prerequisites

- Node.js (v16 or higher)
- pnpm (v8 or higher)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd invoice-management
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

## Running the Application

1. Start the development server:
   ```bash
   pnpm dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Running Tests

Run the test suite:
```bash
pnpm test
```

## Test Coverage Results

```
---------------------|---------|----------|---------|---------|---------------------
File                 | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s   
---------------------|---------|----------|---------|---------|---------------------
All files            |   90.47 |      100 |     100 |   89.65 |                     
 components/invoices |     100 |      100 |     100 |     100 |                     
  InvoiceFilter.tsx  |     100 |      100 |     100 |     100 |                     
  InvoiceList.tsx    |     100 |      100 |     100 |     100 |                     
 hooks               |   84.21 |      100 |     100 |   83.78 |                     
  use-invoices.ts    |   84.21 |      100 |     100 |   83.78 | 75-76,89-90,101-102 
 lib                 |     100 |      100 |     100 |     100 |                     
  test-utils.tsx     |     100 |      100 |     100 |     100 |                     
 utils               |     100 |      100 |     100 |     100 |                     
  format.ts          |     100 |      100 |     100 |     100 |                     
---------------------|---------|----------|---------|---------|---------------------
```

Highlights:
- Overall coverage: 90.47%
- Most components have 100% coverage
- Only minor uncovered lines in hooks/use-invoices.ts

## Build

To create a production build:
```bash
pnpm build
```

To start the production server:
```bash
pnpm start
```