---
title: "Python's Requests Module"
date: "2025-12-05"
tags: ["Python", "Requests", "Modules"]
excerpt: "An introduction to Python's popular Requests library for making HTTP requests — covering GET, POST, headers, query parameters, and error handling."
---

Python's Requests module serves as one of the most popular libraries for making HTTP requests. The library offers an accessible API supporting major HTTP operations including `GET`, `POST`, `PUT`, and `DELETE` without requiring developers to manage low-level networking details.

### Syntax

```
requests.methodname(params)
```

### Core Features

The library includes several key capabilities:

- Functions simplifying HTTP requests like `get()`, `post()`, `put()`, `delete()`, `patch()`
- Clean management of headers, parameters, and cookies
- Support for sessions, timeouts, error handling, and authentication
- Built-in JSON parsing

### Examples

**Simple GET and POST Requests:**

```python
import requests

# GET request
get_response = requests.get("https://restcountries.com/v3.1/name/malaysia")
country = get_response.json()[0]

print(f"Country: {country['name']['common']}")
print(f"Capital: {country['capital'][0]}")

# POST request
payload = {"name": "User", "email": "user@example.com"}
post_response = requests.post("https://httpbin.org/post", json=payload)
print(f"status code: {post_response.status_code}")
print(f"response: {post_response.json()}")
```

**Handling Headers, Query Parameters, and Errors:**

```python
headers = {"Accept": "application/vnd.github+json"}
params = {"q": "python", "sort": "stars", "order": "desc"}

try:
    response = requests.get("https://api.github.com/search/repositories",
                           headers=headers, params=params)
    data = response.json()
    top_repo = data["items"][0]
    print("Name:", top_repo["full_name"])
    print("Stars:", top_repo["stargazers_count"])
    print("URL:", top_repo["html_url"])
except requests.exceptions.Timeout:
    print("Request timed out. The server took too long to respond.")
except requests.exceptions.JSONDecoderError:
    print("Response returned but could not be decoded as JSON.")
except Exception as e:
    print(f"An unexpected error occurred: {e}")
```
