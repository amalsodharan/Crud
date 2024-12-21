# CRUD Operation with Node.js and Express

This project demonstrates a basic implementation of CRUD (Create, Read, Update, Delete) operations using Node.js and Express. It connects to a MariaDB database and provides APIs to manage two tables: `User` and `Book`. The project is designed to help developers understand how to build backend services with Node.js and interact with databases.

---

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- Manage users with Create, Read, Update, and Delete operations.
- Manage books with Create, Read, Update, and Delete operations.
- RESTful API design.
- Integration with MariaDB for persistent storage.

---

## Technologies Used
- **Node.js**: Server-side JavaScript runtime.
- **Express**: Lightweight framework for building APIs.
- **MariaDB**: Relational database for data storage.
- **Postman**: API testing and debugging.

---

## Installation

### Prerequisites
- Node.js installed on your system.
- MariaDB database server.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repository-url.git
   ```
2. Navigate to the project directory:
   ```bash
   cd crud-nodejs
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure the database connection in the `.env` file:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=crud_db
   JWT_SECRET=your_jwt_secret
   ```
5. Set up the database:
   - Create the `crud_db` database in MariaDB.
   - Execute the SQL scripts to create the `User` and `Book` tables (refer to [Database Schema](#database-schema)).

6. Start the server:
   ```bash
   npm start
   ```
   The server will run at `http://localhost:3000/`.

---

## Database Schema

### User Table
| Column      | Type         | Description          |
|-------------|--------------|----------------------|
| id          | INT (Primary Key) | Unique identifier   |
| name        | VARCHAR(255) | Name of the user     |
| email       | VARCHAR(255) | Email address        |
| role        | VARCHAR(50)  | Role of the user     |
| created_at  | TIMESTAMP    | Record creation time |

### Book Table
| Column      | Type         | Description              |
|-------------|--------------|--------------------------|
| id          | INT (Primary Key) | Unique identifier       |
| book_name   | VARCHAR(255) | Name of the book         |
| price       | FLOAT        | Price of the book        |
| stock       | INT          | Number of books in stock |
| created_at  | TIMESTAMP    | Record creation time     |

---

## API Endpoints

### User APIs
| Method | Endpoint           | Description             |
|--------|--------------------|-------------------------|
| POST   | `/rest/signUp`     | Register a new user     |
| POST   | `/rest/login`      | Log in a user           |
| GET    | `/rest/list`       | Get a list of all users (Admin only) |

### Book APIs
| Method | Endpoint           | Description             |
|--------|--------------------|-------------------------|
| POST   | `/rest/user/add`   | Add a new book (Admin only) |
| GET    | `/rest/user/view`  | View all books          |
| PUT    | `/rest/user/change`| Update book details (Admin only) |

---

## Usage

### Example Requests

#### Create a User
**Request:**
```bash
POST /rest/signUp
Content-Type: application/json

{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "role": "admin"
}
```

**Response:**
```json
{
  "newItem": {
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@example.com",
    "role": "admin",
    "created_at": "2024-12-22T10:00:00Z"
  },
  "token": "JWT eyJhbGci..."
}
```

#### User Login
**Request:**
```bash
POST /rest/login
Content-Type: application/json
Authorization: Bearer <token>

{
  "id": 1
}
```

**Response:**
```json
{
  "message": "Login Successful!",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@example.com",
    "role": "admin",
    "created_at": "2024-12-22T10:00:00Z"
  }
}
```

#### Add a Book
**Request:**
```bash
POST /rest/user/add
Content-Type: application/json
Authorization: Bearer <token>

{
  "book_name": "The Great Gatsby",
  "price": 15.99,
  "stock": 10
}
```

**Response:**
```json
{
  "id": 1,
  "book_name": "The Great Gatsby",
  "price": 15.99,
  "stock": 10,
  "created_at": "2024-12-22T10:05:00Z"
}
```

#### View Books
**Request:**
```bash
GET /rest/user/view
```

**Response:**
```json
[
  {
    "id": 1,
    "book_name": "The Great Gatsby",
    "price": 15.99,
    "stock": 10,
    "created_at": "2024-12-22T10:05:00Z"
  }
]
```

#### Update Book
**Request:**
```bash
PUT /rest/user/change
Content-Type: application/json
Authorization: Bearer <token>

{
  "book_name": "The Great Gatsby",
  "price": 17.99,
  "stock": 12
}
```

**Response:**
```json
{
  "message": "Updated Successfully",
  "response": {
    "id": 1,
    "book_name": "The Great Gatsby",
    "price": 17.99,
    "stock": 12
  }
}
```

---

## Future Improvements
- Implement input validation and error handling using libraries like `Joi`.
- Add authentication and authorization (e.g., using JWT).
- Enhance database schema with indexes and constraints.
- Create a frontend interface to interact with the APIs.
- Add automated testing using tools like Mocha or Jest.

---

## Contributing
Contributions are welcome! Feel free to fork the repository and submit a pull request.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

