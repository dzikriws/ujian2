---
sidebar_position: 1
---

# Auth API

## API Endpoint

### POST /login

**Description**

This endpoint is used for user authentication.

**Request Body Example**

```json
{
  "username": "orang",
  "password": "Inikatasandinya123?"
}
```

or you can use email

```json
{
  "email": "orang@example.com",
  "password": "Inikatasandinya123?"
}
```

**Response Success**

```json
{
  {
    "message": "Login successful",
    "data": {
        "username": "dzikri",
        "email": "dzikri@gmail.com"
    }
}
}
```

**Response Invalid Input**

```json
{
  "message": "Invalid credentials"
}
```

**Missing Field Response**

```json
{
  "message": "Request validation failed",
  "errors": [
    {
      "type": "field",
      "msg": "Username or email is required",
      "path": "username",
      "location": "body"
    },
    {
      "type": "field",
      "msg": "Username must be a string",
      "path": "username",
      "location": "body"
    },
    {
      "type": "field",
      "msg": "Username or email is required",
      "path": "email",
      "location": "body"
    },
    {
      "type": "field",
      "msg": "Email must be a valid email",
      "path": "email",
      "location": "body"
    },
    {
      "type": "field",
      "msg": "Password is required",
      "path": "password",
      "location": "body"
    },
    {
      "type": "field",
      "msg": "Password must be a string",
      "path": "password",
      "location": "body"
    }
  ]
}
```
