---
title: "HTTP"
date: "2025-12-09"
tags: ["HTTP", "Tech", "Backend"]
excerpt: "A concise overview of HTTP — the foundation of web communication. Covers the request-response model, HTTP methods, request/response structure, status codes, HTTPS, and idempotency."
---

HTTP (Hypertext Transfer Protocol) is the foundation of web communication between client and server. It follows a request-response model where the web browser — acting as the client — sends an HTTP request to a server hosting a website, and the server processes the request and sends back an HTTP response.

HTTP is a stateless protocol, meaning each request is treated independently and the server does not remember anything about previous requests. This reduces server load and keeps the protocol simple and scalable.

### Common HTTP Methods

- **GET** — retrieve resources from the server (HTML, JSON, images, etc.)
- **POST** — send data to the server, usually to create a new resource
- **PUT** — update or replace an existing resource on the server
- **PATCH** — partially update an existing resource
- **DELETE** — delete a resource from the server

### HTTP Request Structure

An HTTP request includes:

- **Request method** — GET, POST, PUT, DELETE, etc.
- **Headers** — key-value pairs for additional information like `Content-Type`
- **Body** — mainly used with POST, PUT, or PATCH to send data

Example request:

```
GET /api/users/1 HTTP/1.1
Host: example.com
Accept: application/json
```

### HTTP Response Structure

The server returns a response including:

- **Status** — a status code such as `200 OK` or `400 Bad Request`
- **Headers** — metadata such as `Content-Type`, `Content-Length`
- **Body** — the content returned by the server (HTML, JSON, etc.)

Example response:

```
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 38

{ "id": 1, "name": "User" }
```

### Status Code Categories

| Range | Meaning |
|---|---|
| 1xx | Informational |
| 2xx | Success (e.g., 200 OK, 201 Created) |
| 3xx | Redirection |
| 4xx | Client errors (e.g., 400 Bad Request, 404 Not Found) |
| 5xx | Server errors (e.g., 500 Internal Server Error) |

### HTTPS (HTTP + TLS)

Modern websites use HTTPS to protect sensitive data. It encrypts communication between the client and server using TLS (Transport Layer Security), preventing attackers from reading or tampering with data in transit.

### Idempotent Methods

GET, PUT, and DELETE are idempotent — performing the same operation multiple times produces the same result. POST differs: each request may create a new resource, so repeated calls have different effects.

### Testing with cURL

You can send an HTTP request directly from the terminal:

```shell
curl -i https://jsonplaceholder.typicode.com/posts/1
```

Example response body:

```json
{
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
}
```
