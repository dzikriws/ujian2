---
sidebar_position: 5
---

# Transaction API

## Transaction Endpoint

### GET /transactions

**Optional Query Request**

- `doctor_name`
- `patient_name`
- `service_category`
- `service_group`
- `service_name`
- `start_date`
- `end_date`
- `max_grandtotal`
- `min_grandtotal`

**How to use**

```bash
`/transactions?doctor_name=dr mahendra&patient_name=Dzikri&service_group=poli spesialis&start_date=2025-03-15&end_date=2025-03-17&min_grand_total=10000&max_grand_total=6000000`
```

**Success Response**

```json
{
  "message": "Success getting transactions",
  "data": [
    {
      "transaction_id": 38,
      "doctor_name": "Dr Mahendra",
      "username": "dzikri",
      "patient_name": "Dzikri",
      "transaction_date": "2025-03-16T17:00:00.000Z",
      "service_group": "Poli Spesialis",
      "tax_rate": "0.10",
      "sub_total": "435000.00",
      "grand_total": "478500.0000",
      "transaction_detail": [
        {
          "price": 150000,
          "amount": 300000,
          "quantity": null,
          "service_name": "Konsul Dr Spesialis",
          "category_name": "Perusahaan (Mitra)"
        },
        {
          "price": 135000,
          "amount": 135000,
          "quantity": null,
          "service_name": "Konsul Dr Spesialis",
          "category_name": "Asuransi Admedika"
        }
      ]
    }
  ]
}
```

### GET /transactions/:(transaction_id)

**Request Param**

- `transaction_id` : transaction id

**Success Response**

```json
{
  "message": "Success getting transaction",
  "data": {
    "transaction_id": 1,
    "doctor_name": null,
    "username": "johndoe",
    "patient_name": "Alice",
    "transaction_date": "2024-12-09T17:00:00.000Z",
    "service_group": "Laboratorium",
    "tax_rate": "0.15",
    "sub_total": "595000.00",
    "grand_total": "684250.0000",
    "transaction_detail": [
      {
        "price": 320000,
        "amount": 320000,
        "quantity": 1,
        "service_name": "Pemeriksaan Urin",
        "category_name": "BPJS"
      },
      {
        "price": 275000,
        "amount": 275000,
        "quantity": 1,
        "service_name": "Pemeriksaan Darah",
        "category_name": "BPJS"
      }
    ]
  }
}
```

### POST /transactions

**Example Request Body**

```json
{
  "doctor_id": 11,
  "patient_name": "aw",
  "date": "2002-12-12",
  "tax_rate": 0.15,
  "username": "dzikri",
  "details": [
    {
      "service_id": 1,
      "category_id": 1,
      "qty": 1
    },
    {
      "service_id": 1,
      "category_id": 2,
      "qty": 1
    }
  ]
}
```

**Example Success Response**

```json
{
  "message": "Transaction for aw handled by dzikri created successfully"
}
```

**Missing Field Response**

````json
{
  "message": "Request validation failed",
  "errors": [
    {
      "type": "field",
      "msg": "doctor_id is required",
      "path": "doctor_id",
      "location": "body"
    },
    {
      "type": "field",
      "msg": "doctor_id must be a positive integer",
      "path": "doctor_id",
      "location": "body"
    },
    {
      "type": "field",
      "value": "",
      "msg": "patient_name is required",
      "path": "patient_name",
      "location": "body"
    },
    {
      "type": "field",
      "value": "",
      "msg": "username is required",
      "path": "username",
      "location": "body"
    },
    {
      "type": "field",
      "msg": "details must be a non-empty array",
      "path": "details",
      "location": "body"
    }
  ]
}
```s
````
