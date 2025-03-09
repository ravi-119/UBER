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
