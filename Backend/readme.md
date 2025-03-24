# User Registration Endpoint (/user/register)

## Description

This endpoint allows new users to register on the platform. It requires specific user details to create a new account.

### HTTP Method

`POST`

## Request Body

The request body should be in JSON format and include the following fields:
- `fullname` (object):
    - `firstName` (string, optional): The user's first name.
    - `lastName` (string, optional): The user's last name.
- `email` (string, required): The user's email address. Must be a valid email format.
- `password` (string, required): The password for the new account. Must meet complexity requirements (e.g., minimum length).

Example:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "user@example.com",
  "password": "SecurePassword123"
}

```

## Response Status Codes

- `201 Created`: Successfully created a new user account.
- `400 Bad Request`: The request body is invalid or missing required fields. The response body will contain details about the validation errors.
- `409 Conflict`: The username or email address is already taken.
- `500 Internal Server Error`: An unexpected error occurred on the server.

- `user` (object):
    - `fullname` (object):
        - `firstName` (string): The user's first name.
        - `lastName` (string): The user's last name.
    - `email` (string): The user's email address. Must be a valid email format.
    - `password` (string): The password for the new account. Must meet complexity requirements (e.g., minimum length).
- `token` (String): JWT Token

## User Login Endpoint (/user/login)

### Description

This endpoint allows registered users to log in to the platform. It verifies the user's credentials and returns a JWT token for authentication.

### HTTP Method

`POST`

## Request Body

The request body should be in JSON format and include the following fields:

- `email` (string, required): The user's email address. Must be a valid email format.
- `password` (string, required): The user's password.

Example:

```json
{
  "email": "user@example.com",
  "password": "SecurePassword123"
}
```

## Response Status Codes

- `200 OK`: Successfully logged in. The response body will contain a JWT token and user details.
- `400 Bad Request`: The request body is invalid or missing required fields. The response body will contain details about the validation errors.
- `401 Unauthorized`: Invalid email or password.
- `500 Internal Server Error`: An unexpected error occurred on the server.

## Response Example

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGQzZjA4NzM4Zjg3ZjAwMTIxNjJkZTUiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE2OTIxMzEwODcsImV4cCI6MTY5MjIzMTA4N30.SomeExampleToken",
  "user": {
    "fullname": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "user@example.com"
  }
}
```

- `user` (object):
    - `fullname` (object):
        - `firstName` (string): The user's first name.
        - `lastName` (string): The user's last name.
    - `email` (string): The user's email address.
- `token` (String): JWT Token

## User Profile Endpoint (/user/profile)

### Description

This endpoint retrieves the profile information of the currently authenticated user.

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the Authorization header.

### Response Status Codes

- `200 OK`: Successfully retrieved user profile
- `401 Unauthorized`: Invalid or missing authentication token
- `500 Internal Server Error`: An unexpected error occurred on the server

### Response Example

```json
{
  "fullname": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "user@example.com",
  "createdAt": "2023-08-15T10:30:00.000Z"
}
```

## User Logout Endpoint (/user/logout)

### Description

This endpoint logs out the current user by invalidating their JWT token.

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the Authorization header.

### Response Status Codes

- `200 OK`: Successfully logged out
- `400 Bad Request`: Token not found
- `401 Unauthorized`: Invalid or missing authentication token
- `500 Internal Server Error`: An unexpected error occurred on the server

### Response Example

```json
{
  "message": "Logout successfully"
}
```
