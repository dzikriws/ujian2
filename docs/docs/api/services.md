---
sidebar_position: 4
---

# Master Service API

## Master Services Endpoint

### GET /services

**Example Response**

```json
{
  "message": "Success getting services",
  "data": [
    {
      "service_id": 1,
      "service_name": "Konsul Dr Umum",
      "service_group": "IGD",
      "categories": [
        {
          "category_id": 1,
          "category_name": "Perorangan",
          "price": 75000
        },
        {
          "category_id": 2,
          "category_name": "BPJS",
          "price": 50000
        },
        {
          "category_id": 3,
          "category_name": "Perusahaan (Mitra)",
          "price": 65000
        },
        {
          "category_id": 4,
          "category_name": "Perusahaan (Guarantee Letter)",
          "price": 70000
        },
        {
          "category_id": 5,
          "category_name": "Asuransi Admedika",
          "price": 55000
        }
      ]
    }
  ]
}
```

### POST /services

**Request Body**

```json
{
  "service_name": "Periksa sakit hati",
  "service_group": "bucin",
  "categories": [
    {
      "category_id": 1,
      "price": 1000
    },
    {
      "category_id": 2,
      "price": 1500
    },
    {
      "category_id": 3,
      "price": 3000
    },
    {
      "category_id": 4,
      "price": 5000
    }
  ]
}
```

**Success Response**

```json
{
  "message": "Service Periksa sakit hati with bucin group created successfully"
}
```

**Missing Field Response**

```json
{
  "message": "Request validation failed",
  "errors": [
    {
      "type": "field",
      "value": "",
      "msg": "service_name is required",
      "path": "service_name",
      "location": "body"
    },
    {
      "type": "field",
      "value": "",
      "msg": "service_group is required",
      "path": "service_group",
      "location": "body"
    },
    {
      "type": "field",
      "msg": "categories must be a non-empty array",
      "path": "categories",
      "location": "body"
    }
  ]
}
```

### PUT /services/:(id)

**Request Param\***

- `service_id (number): The ID of the service to be updated.`

**Request Body**
--same as POST

**Example Response**
The response is in JSON format and has the following schema:

```json
{
  "message": "Service Periksa sakit hati update updated successfully"
}
```

**Missing Field Response**
-same as post

### DELETE /services/:(id)

**Request Param**

- `service_id (number): The ID of the service to be deleted.`

**Example Response**

```json
{
  "message": "Service Periksa sakit hati update in bucin's group deleted successfully"
}
```
