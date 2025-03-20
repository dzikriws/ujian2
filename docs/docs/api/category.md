---
sidebar_position: 2
---

# Service Category API

## Service Category Endpoint

### GET /service_category

**Success Response**

```json
{
  "message": "Success getting service category",
  "data": [
    {
      "category_id": 1,
      "category_name": "Perorangan"
    },
    {
      "category_id": 2,
      "category_name": "BPJS"
    },
    {
      "category_id": 3,
      "category_name": "Perusahaan (Mitra)"
    },
    {
      "category_id": 4,
      "category_name": "Perusahaan (Guarantee Letter)"
    },
    {
      "category_id": 5,
      "category_name": "Asuransi Admedika"
    }
  ]
}
```

### POST /service_category

**Request Body**

```json
{
  "category_name": "auh"
}
```

**Success Response**

```json
{
  "message": "Service category auh created successfully",
  "data": {
    "category_name": "auh"
  }
}
```

**Already Exists Response**

```json
{
  "message": "Service category with name auh already exists"
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
      "msg": "category_name is required",
      "path": "category_name",
      "location": "body"
    }
  ]
}
```

### PUT /service_category/:(id)

**Request Param**

- `service_category id`

**Request Body**

```json
{
  "category_name": "update"
}
```

**Success Response**

```json
{
  "message": "Service category update updated successfully",
  "data": [
    {
      "service_category_id": 15,
      "category_name": "update"
    }
  ]
}
```

**Service Category Not Found Response**

```json
{
  "message": "Service category with service id 11902 not found"
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
      "msg": "category_name is required",
      "path": "category_name",
      "location": "body"
    }
  ]
}
```

### DELETE /service_category/:(id)

**Request Param**

- `service_category id`

**Example Response**

```json
{
  "message": "Service category auh deleted successfully"
}
```

**Service Category Not Found Response**

```json
{
  "message": "Service category not found"
}
```
