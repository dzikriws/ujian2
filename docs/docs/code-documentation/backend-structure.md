---
sidebar_position: 1
---

# Backend Structure

## Folder

This project follows a structured approach to organize the backend components efficiently. Below is the breakdown of the directory structure and its responsibilities:

```
/src
  ├── controllers
  │     ├── doctorController.ts
  │     ├── serviceCategoryController.ts
  │     ├── serviceController.ts
  │     ├── transactionController.ts
  │     ├── userController.ts
  │
  ├── routes
  │     ├── doctorRoute.ts
  │     ├── serviceCategoryRoute.ts
  │     ├── serviceRoute.ts
  │     ├── transactionRoute.ts
  │     ├── userRoute.ts
  │
  ├── validators
  │     ├── doctorValidator.ts
  │     ├── serviceCategoryValidator.ts
  │     ├── serviceValidator.ts
  │     ├── transactionValidator.ts
  │     ├── userValidator.ts
  |
  ├── middlewares
  │     ├── validateRequest.ts
  |
  ├── config
  │     ├── pool.ts
  │     ├── morgan.ts
  │
  ├── index.ts
```

### Explanation of the directories structure :

#### 1. `controllers/`

This folder contains all controller files, responsible for handling API logic and interacting with the database via Prisma.

- `userController.ts` - Handles user-related operations, such as login.
- `transactionController.ts` - Handles transaction such as create new transactions and get detailed transaction.
- `serviceController.ts` - Handles service-related operations, such as creating, updating, and deleting services.
- `serviceCategoryController.ts` - Handles service category-related operations, such as creating, updating, and deleting service categories.
- `doctorController.ts` - Handles doctor-related operations, such as creating, updating, and deleting doctors.

#### 2. `routes/`

This folder contains route files that map HTTP requests to their respective controllers.

- `userRoute.ts` - Defines routes for user-related operations.
- `transactionRoute.ts` - Defines routes for transaction-related operations.
- `serviceRoute.ts` - Defines routes for service-related operations.
- `serviceCategoryRoute.ts` - Defines routes for service category-related operations.
- `doctorRoute.ts` - Defines routes for doctor-related operations.

#### 3. `validators/`

This folder contains validator files that validate incoming request data.

- `userValidator.ts` - Validates user-related data.
- `transactionValidator.ts` - Validates transaction-related data.
- `serviceValidator.ts` - Validates service-related data.
- `serviceCategoryValidator.ts` - Validates service category-related data.
- `doctorValidator.ts` - Validates doctor-related data.

#### 4. `middlewares/`

This folder contains middleware files that handle common tasks such as request validation and error handling.

- `validateRequest.ts` - Middleware for validating incoming requests.

#### 5. `config/`

This folder contains configuration files for the application.

- `pool.ts` - Database connection pool configuration.
- `morgan.ts` - Morgan middleware configuration.

#### 6. `index.ts`

This file is the entry point of the application. It imports all necessary modules and sets up the server and routes.
