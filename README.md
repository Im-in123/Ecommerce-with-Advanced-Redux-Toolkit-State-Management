# eCommerce Application

## Overview
This eCommerce application is built with React and Redux Toolkit for the frontend and uses Sequelize with SQLite for the backend. The application allows users to manage products, orders, and user accounts, supporting functionalities such as user registration, role management, and product management.

## Technologies Used

### Frontend
- React
- Redux Toolkit 
- Redux-Persist
- React Router DOM
- CSS Modules

### Backend
- Node.js
- Express
- Sequelize
- SQLite

## Features
- User Registration and Authentication
- Role Management (Admin, Seller, Shopper) with Create, Read, Update, Delete
- Product Management (Create, Read, Update, Delete)
- Order Management (Checkout, View Orders)
- User roles with different special operation permissions (Admin, Seller, Shopper)
- Add To Cart And View Cart Functionality
- Persistence For Cart Items and Auth After Reloads(Redux-Persist Package).
-

## Getting Started

### Prerequisites
- Node.js and npm installed on your machine.
- SQLite installed (if required for database management).

### Installation
### Clone the Repository

```bash
git clone https://github.com/Im-in123/Ecommerce-with-Advanced-Redux-Toolkit-State-Management
cd Ecommerce-with-Advanced-Redux-Toolkit-State-Management
 
nvm install --lts  # if using nvm
corepack enable
yarn set version stable
yarn install  # Install all required dependencies for the project
 
cd /packages/frontend
yarn install  # Install frontend dependencies

cd /packages/backend
yarn install  # Install backend dependencies

cd /packages/backend
cp .env.example .env  # Copy the example environment variables file . After that edit the .env file to set the appropriate values for your environment

# Now cd back to your root folder
yarn backend:serve  # Start the backend server
yarn frontend:dev  # Start the frontend application
```

## API Endpoints

### Users
- **POST /users**: Create a new user.
- **GET /users**: Retrieve all users.
- **GET /users/:id**: Retrieve a specific user by ID.
- **PUT /users/:id**: Update a user by ID.
- **DELETE /users/:id**: Delete a user by ID.

### Products
- **POST /products**: Create a new product.
- **GET /products**: Retrieve all products.
- **GET /products/:id**: Retrieve a specific product by ID.
- **PUT /products/:id**: Update a product by ID.
- **DELETE /products/:id**: Delete a product by ID.

### Orders
- **POST /checkout**: Create a new product order for shopper.
- **GET /orders**: Retrieve all product orders from shopper.
 
 
