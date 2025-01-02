# Node API with Swagger Documentation

This is a small project for practicing and documenting the use of Swagger in a Node.js application using Fastify. It includes setup for CORS, validation and serialization with Zod, and a Swagger API documentation.

## Features

- **Fastify**: A Node.js framework.
- **CORS Support**: Enabled using `@fastify/cors`.
- **Zod Integration**: For request validation and response serialization.
- **Swagger Documentation**: Automatically generated API docs using `@fastify/swagger` and `@fastify/swagger-ui`.
- **CRUD Operations**: A basic user management API with `GET`, `POST`, `PUT`, `PATCH`, and `DELETE` endpoints.
- **Route Grouping**: Routes are grouped by tags in Swagger documentation.

## Project Structure
```plaintext
. ├── src
  │ ├── server.ts # Entry point for the Fastify application 
  │ ├── routes.ts # API routes 
  │ ├── types.ts # Custom types for Fastify with Zod 
  ├── package.json  
  ├── pnpm-lock.yaml 
  └── README.md
```

## Prerequisites

- [Node.js](https://nodejs.org/) 
- [PNPM](https://pnpm.io/) 

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/tatacsd/node-api-swagger.git
   ```
2. Navigate to the project directory:
   ```bash
   cd node-api-swagger
    ```
3. Install the dependencies:
    ```bash
    pnpm install
    ```
4. Start the development server:
    ```bash
    pnpm run dev
    ```
5. Open the Swagger documentation in your browser:
    ```plaintext
    http://localhost:3000/docs
    ```
6. Test the API using the Swagger UI 

