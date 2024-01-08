# Book Management System
This Node.js application provides a RESTful API for managing books. It includes user authentication, book publishing, searching, and listing functionalities.
![Screenshot (11)](https://github.com/pranandv/book-managements-system/assets/50710950/7585282e-d513-46c2-9eee-13325901f901)

![Screenshot (12)](https://github.com/pranandv/book-managements-system/assets/50710950/3498315b-dde9-4d64-9c35-056705b97649)


## Endpoints
## User Authentication
POST /api/auth/signup: Register a new user.  
POST /api/auth/login: Log in an existing user.  
## Book Management
POST /api/books/publish: Publish a new book.  
GET /api/books/search?title={searchQuery}: Search for books by title.  
PUT /api/books/unpublish/{bookId}: Unpublish a book.  
GET /api/books/user: Get a list of books published by the current user.  
GET /api/books/published: Get a list of all published books.  
## Installation
### Clone the repository:
```bash
git clone https://github.com/pranandv/book-managements-system.git
cd Book-Managment-System
### Install dependencies:
npm install
### Set up environment variables:
Create a .env file based on the provided .env.example.
Add your MongoDB connection string, JWT secret, and other necessary variables.

### Start the server:
npm start

### Endpoints
### User Authentication
POST /api/auth/signup: Register a new user.
POST /api/auth/login: Log in an existing user.
### Book Management
POST /api/books/publish: Publish a new book.
GET /api/books/search?title={searchQuery}: Search for books by title.
PUT /api/books/unpublish/{bookId}: Unpublish a book.
GET /api/books/user: Get a list of books published by the current user.
GET /api/books/published: Get a list of all published books.
