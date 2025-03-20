---
sidebar_position: 1
---

## Getting Started Backend

To start the project, change directory into ./backend and you must already installed npm

```sh
cd ./backend
npm install
```

Next, configure your database connection, create `.env` file:
open `.env.example` to see the required environment variables
The default is

```sh
DB_USER = "postgres"
DB_HOST = "localhost"
DB_NAME = "ujian2"
DB_PASSWORD = "postgres"
DB_PORT = 5432
```

Start the development server:

```sh
npm run dev
```

or

```sh
npm run build
npm run start
```

Now, your backend is up and running in port 3000 (or you can change it in the `./src/index.ts` file)!
