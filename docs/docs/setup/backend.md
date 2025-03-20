---
sidebar_position: 2
---

# Backend

This guide will help you set up and run the backend application.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (latest LTS version recommended)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/download/)

## Installation

Navigate to the `backend` directory and install dependencies:

```sh
cd ./backend
npm install
```

## Configuration

Set up your environment variables by creating a `.env` file in the root directory.  
Refer to `.env.example` for the required environment variables. The default configuration is:

```sh
DB_USER=postgres
DB_HOST=localhost
DB_NAME=ujian2
DB_PASSWORD=postgres
DB_PORT=5432
```

Ensure your database is running and configured correctly before starting the application.

## Running the Development Server

Start the development server:

```sh
npm run dev
```

## Running in Production

To build and run the application in production mode:

```sh
npm run build
npm start
```

## Server Details

By default, the backend runs on **port 3000**.  
You can modify the port configuration in `./src/index.ts` if needed.

## Next Steps

With the backend up and running, you can now proceed with further development, API testing, or integration with the frontend.