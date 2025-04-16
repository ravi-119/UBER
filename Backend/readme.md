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

# Captain Registration Endpoint (/captains/register)

## Description

This endpoint allows new captains to register on the platform. It requires specific details about the captain and their vehicle to create a new account.

### HTTP Method

`POST`

## Request Body

The request body should be in JSON format and include the following fields:

- `firstname` (string, required): The captain's first name.
- `lastname` (string, required): The captain's last name.
- `email` (string, required): The captain's email address. Must be a valid email format.
- `password` (string, required): The password for the captain's account. Must meet complexity requirements (e.g., minimum length of 6 characters).
- `color` (string, required): The color of the captain's vehicle.
- `plateNumber` (string, required): The license plate number of the captain's vehicle.
- `capacity` (number, required): The seating capacity of the vehicle.
- `vehicalType` (string, required): The type of vehicle. Must be one of the following: `car`, `bike`, `auto`.

### Example Request Body

```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "captain@example.com",
  "password": "SecurePassword123",
  "color": "Red",
  "plateNumber": "ABC123",
  "capacity": 4,
  "vehicalType": "car"
}
```

## Response Example

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXB0YWluSWQiOiI2NGQzZjA4NzM4Zjg3ZjAwMTIxNjJkZTUiLCJlbWFpbCI6ImNhcHRhaW5AZXhhbXBsZS5jb20iLCJpYXQiOjE2OTIxMzEwODcsImV4cCI6MTY5MjIzMTA4N30.SomeExampleToken",
  "captain": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "captain@example.com",
    "vehicle": {
      "color": "Red",
      "plateNumber": "ABC123",
      "capacity": 4
    },
    "vehicalType": "car"
  }
}
```

## Response Status Codes

- `201 Created`: Successfully created a new Captain account.
- `400 Bad Request`: The request body is invalid or missing required fields.

## Captain Login Endpoint (/captains/login)

### Description

This endpoint allows registered captains to log in to the platform. It verifies the captain's credentials and returns a JWT token for authentication.

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- `email` (string, required): The captain's email address. Must be a valid email format.
- `password` (string, required): The captain's password. Must meet complexity requirements (e.g., minimum length of 8 characters).

#### Example Request Body

```json
{
  "email": "captain@example.com",
  "password": "SecurePassword123"
}
```

### Response

#### Success Response

- **Status Code**: `200 OK`
- **Description**: Successfully logged in. The response body will contain a JWT token and captain details.

#### Example Response Body

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXB0YWluSWQiOiI2NGQzZjA4NzM4Zjg3ZjAwMTIxNjJkZTUiLCJlbWFpbCI6ImNhcHRhaW5AZXhhbXBsZS5jb20iLCJpYXQiOjE2OTIxMzEwODcsImV4cCI6MTY5MjIzMTA4N30.SomeExampleToken",
  "captain": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "captain@example.com",
    "vehicle": {
      "color": "Red",
      "plateNumber": "ABC123",
      "capacity": 4
    },
    "vehicalType": "car"
  }
}
```

#### Error Responses

1. **Invalid Credentials**
   - **Status Code**: `400 Bad Request`
   - **Description**: The email or password is invalid.

   #### Example Response Body

   ```json
   {
     "message": "Invalid email or password"
   }
   ```

2. **Validation Errors**
   - **Status Code**: `400 Bad Request`
   - **Description**: The request body is invalid or missing required fields.

   #### Example Response Body

   ```json
   {
     "errors": [
       {
         "msg": "Invalid Email",
         "param": "email",
         "location": "body"
       },
       {
         "msg": "Password must be at least 8 characters long",
         "param": "password",
         "location": "body"
       }
     ]
   }
   ```

3. **Server Error**
   - **Status Code**: `500 Internal Server Error`
   - **Description**: An unexpected error occurred on the server.

### Validation Rules

- `email`: Must be a valid email address.
- `password`: Must be at least 8 characters long.

### Notes

- The `token` in the response is a JWT token that can be used for authentication in subsequent requests.
- Ensure that the email and password provided in the request body match the credentials of a registered captain.

## Captain Profile Endpoint (/captains/profile)

### Description

This endpoint retrieves the profile information of the currently authenticated captain. It requires a valid JWT token for authentication.

### HTTP Method

`GET`

### Authentication

- Requires a valid JWT token in the `Authorization` header or as a cookie.

### Request Headers

- `Authorization`: Bearer `<JWT_TOKEN>` (optional if the token is provided as a cookie).

### Response Status Codes

- `200 OK`: Successfully retrieved captain profile.
- `400 Bad Request`: Captain ID is missing in the request.
- `401 Unauthorized`: Invalid or missing authentication token.
- `404 Not Found`: Captain not found.
- `500 Internal Server Error`: An unexpected error occurred on the server.

### Response Example

#### Success Response

```json
{
  "success": true,
  "captain": {
    "_id": "64d3f08738f87f0012162de5",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "captain@example.com",
    "vehicle": {
      "color": "Red",
      "plateNumber": "ABC123",
      "capacity": 4
    },
    "vehicalType": "car",
    "status": "active",
    "location": {
      "latitude": 40.7128,
      "longitude": -74.0060
    }
  }
}
```

#### Error Responses

1. **Missing Captain ID**
   - **Status Code**: `400 Bad Request`
   - **Description**: Captain ID is not found in the request.

   ```json
   {
     "message": "Captain ID not found in request"
   }
   ```

2. **Captain Not Found**
   - **Status Code**: `404 Not Found`
   - **Description**: The captain does not exist in the database.

   ```json
   {
     "message": "Captain not found"
   }
   ```

3. **Unauthorized**
   - **Status Code**: `401 Unauthorized`
   - **Description**: Invalid or missing authentication token.

   ```json
   {
     "message": "Unauthorized: Token missing"
   }
   ```

4. **Server Error**
   - **Status Code**: `500 Internal Server Error`
   - **Description**: An unexpected error occurred on the server.

   ```json
   {
     "message": "Server Error",
     "error": "Detailed error message"
   }
   ```

---

## Captain Logout Endpoint (/captains/logout)

### Description

This endpoint logs out the currently authenticated captain by invalidating their JWT token. The token is blacklisted to prevent further use.

### HTTP Method

`POST`

### Authentication

- Requires a valid JWT token in the `Authorization` header or as a cookie.

### Request Headers

- `Authorization`: Bearer `<JWT_TOKEN>` (optional if the token is provided as a cookie).

### Response Status Codes

- `200 OK`: Successfully logged out.
- `400 Bad Request`: Token not found in the request.
- `401 Unauthorized`: Invalid or missing authentication token.
- `500 Internal Server Error`: An unexpected error occurred on the server.

### Response Example

#### Success Response

```json
{
  "message": "Logout successfully"
}
```

#### Error Responses

1. **Token Not Found**
   - **Status Code**: `400 Bad Request`
   - **Description**: The token is missing in the request.

   ```json
   {
     "message": "Token not found"
   }
   ```

2. **Unauthorized**
   - **Status Code**: `401 Unauthorized`
   - **Description**: Invalid or missing authentication token.

   ```json
   {
     "message": "Unauthorized: Token missing"
   }
   ```

3. **Server Error**
   - **Status Code**: `500 Internal Server Error`
   - **Description**: An unexpected error occurred on the server.

   ```json
   {
     "message": "Server Error",
     "error": "Detailed error message"
   }
   ```

---

### Notes

- The `Authorization` header or cookie must contain a valid JWT token for both endpoints.
- The `/captains/logout` endpoint blacklists the token to ensure it cannot be reused.
- Ensure proper error handling and logging for production use.




