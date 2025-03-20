---
sidebar_position: 2
---

# Frontend Structure

## Folder

This project follows a structured approach to organize the backend components efficiently. Below is the breakdown of the directory structure and its responsibilities:

```
/src
  ├── components
  │     ├── commons
  │     |     ├── FilterDropdown.tsx
  │     |     ├── InputField.tsx
  │     |     ├── ItemsPerPageSelector.tsx
  │     |     ├── Layout.tsx
  │     |     ├── LogoutButton.tsx
  │     |     ├── Navbar.tsx
  │     |     ├── Pagination.tsx
  │     |     ├── SearchBar.tsx
  │     |     ├── TextAreaField.tsx
  │     |
  │     ├── helpers
  │     |     ├── format.ts
  │     |
  │     ├── modals
  │     |     ├── AddDoctorModal.tsx
  │     |     ├── AddServiceModal.tsx
  │     |     ├── AddServiceCategoryModal.tsx
  │     |     ├── AddransactionModal.tsx
  │     |     ├── CategoryPriceModal.tsx
  │     |     ├── TransactionDetailModal.tsx
  │     |     ├── UpdateDoctorModal.tsx
  │     |     ├── UpdateServiceModal.tsx
  │     |     ├── UpdateServiceCategoryModal.tsx
  |     |
  │     ├── store
  │     |     ├── useDoctorsStore.ts
  |     |
  │     ├── tables
  │     |     ├── DoctorTable.tsx
  │     |     ├── ServiceCategoryTable.tsx
  │     |     ├── ServiceTable.tsx
  │     |     ├── TransactionTable.tsx
  │     |     ├── TransactionReportTable.tsx
  │     |
  │     ├── types
  │     |     ├── doctor.ts
  │     |     ├── transaction.ts
  │     |
  │     ├── ProtectedRoute.tsx
  │
  ├── option
  |     ├── doctor.ts
  |     ├── service.ts
  |
  ├── pages
  │     ├── DashboardPage.tsx
  │     ├── DoctorPage.tsx
  │     ├── LoginPage.tsx
  │     ├── NotFoundPage.tsx
  │     ├── ServiceCategoryPage.tsx
  │     ├── ServicePage.tsx
  │     ├── TransactionPage.tsx
  │     ├── TransactionReportPage.tsx
  |
  ├── services
  |     |── categoryService.ts
  |     |── doctorService.ts
  |     |── serviceService.ts
  |     |── transactionService.ts
  |
  ├── utils
  |     |── api.ts
  │
  ├── App.tsx
  ├── main.tsx
```

### Explanation of the directory structure :

#### `components/`

Reusable UI components used throughout the application.

- `FilterDropdown.tsx` - Dropdown component for filtering data.
- `InputField.tsx` - Input field component for user input.
- `ItemsPerPageSelector.tsx` - Component for selecting items per page.
- `Layout.tsx` - Layout component for the application.
- `LogoutButton.tsx` - Logout button component.
- `Navbar.tsx` - Navigation bar component.
- `Pagination.tsx` - Pagination component for navigating through pages.
- `SearchBar.tsx` - Search bar component for filtering data.
- `TextAreaField.tsx` - Text area field component for user input.

#### `services/`

- `categoryService.ts` - Service for managing service categories.
- `doctorService.ts` - Service for managing doctors.
- `serviceService.ts` - Service for managing services.
- `transactionService.ts` - Service for managing transactions.

#### `tables/`

- `DoctorTable.tsx` - Table component for displaying doctors.
- `ServiceCategoryTable.tsx` - Table component for displaying service categories.
- `ServiceTable.tsx` - Table component for displaying services.
- `TransactionTable.tsx` - Table component for displaying transactions.
- `TransactionReportTable.tsx` - Table component for displaying transaction reports.

#### `pages/`

- `DashboardPage.tsx` - Dashboard page component.
- `LoginPage.tsx` - Login page component.
- `NotFoundPage.tsx` - Not found page component.
- `ServiceCategoryPage.tsx` - Service category page component.
- `ServicePage.tsx` - Service page component.
- `TransactionPage.tsx` - Transaction page component.
- `TransactionReportPage.tsx` - Transaction report page component.

#### `utils/`

- `api.ts` - Handles API requests and interactions with the backend.

#### `store/`

- `useDoctorsStore.ts` - Store for managing doctors.

#### `types/`

- `doctor.ts` - Type definition for doctors.
- `transaction.ts` - Type definition for transactions.

#### `option/`

- `doctor.ts` - Options for doctors.
- `service.ts` - Options for services.

#### `main.tsx`

Main entry point for the React application.

#### `App.tsx`

Main entry point for the React application.

---

#### `How it Work`

The application structure is designed to provide a clear and organized organization of files and components, making it easier to navigate and understand the structure of the codebase.