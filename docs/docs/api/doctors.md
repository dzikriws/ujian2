---
sidebar_position: 3
---

# Doctors API

## Doctors Endpoint

### GET /doctors

**Success Response**

```json
{
  "message": "Success getting doctors",
  "data": [
    {
      "doctor_id": 1,
      "address": "123 Main St, Jakarta",
      "city": "Jakarta",
      "country": "Indonesia",
      "kategori": "Umum",
      "contact_phone": "+62 812-3456-7890",
      "doctor_name": "Dr Mahendra"
    },
    {
      "doctor_id": 2,
      "address": "45 Orchard Rd, Singapore",
      "city": "Singapore",
      "country": "Singapore",
      "kategori": "Umum",
      "contact_phone": "+65 9876-5432",
      "doctor_name": "Dr Agung"
    }
  ]
}
```

### POST /doctors

**Request Body**

```json
{
  "doctor_name": "dzikri",
  "address": "jl",
  "city": "kota",
  "country": "Indonesia",
  "kategori": "Umum",
  "contact_phone": "+62 85691919544"
}
```

**Example Success Response**

```json
{
  "message": "Doctor dzikri created successfully",
  "data": {
    "doctor_id": 15,
    "doctor_name_name": "dzikri",
    "address": "jl",
    "city": "kota",
    "country": "Indonesia",
    "kategori": "Umum",
    "contact_phone": "+62 85691919544"
  }
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
      "msg": "doctor_name is required",
      "path": "doctor_name",
      "location": "body"
    },
    {
      "type": "field",
      "value": "",
      "msg": "address is required",
      "path": "address",
      "location": "body"
    },
    {
      "type": "field",
      "value": "",
      "msg": "city is required",
      "path": "city",
      "location": "body"
    },
    {
      "type": "field",
      "value": "",
      "msg": "country is required",
      "path": "country",
      "location": "body"
    },
    {
      "type": "field",
      "value": "",
      "msg": "kategori is required",
      "path": "kategori",
      "location": "body"
    },
    {
      "type": "field",
      "value": "",
      "msg": "contact_phone is required",
      "path": "contact_phone",
      "location": "body"
    }
  ]
}
```

### PUT /doctors/:(id)

**Request Param**

- `doctor_id`

**Request Body**

```json
{
  "doctor_name": "dzikri update",
  "address": "jl update",
  "city": "kota update",
  "country": "malaysia",
  "kategori": "Umum",
  "contact_phone": "+62 85691919544"
}
```

**Success Response**

```json
{
  "message": "Doctor dzikri update updated successfully",
  "data": {
    "doctor_id": 15,
    "doctor_name_name": "dzikri update",
    "address": "jl update",
    "city": "kota update",
    "country": "malaysia",
    "kategori": "Umum",
    "contact_phone": "+62 85691919544"
  }
}
```

**Missing Field Response**
-same as post

### DELETE /doctors/:(id)

**Response Success**

```json
{
  "message": "Doctor dzikri update deleted successfully"
}
```