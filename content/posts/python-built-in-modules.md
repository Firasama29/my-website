---
title: "Built-in Modules in Python"
date: "2025-12-08"
tags: ["Python"]
excerpt: "An overview of Python's built-in modules — what they are, why they're useful, and a tour of the most commonly used ones like os, sys, datetime, math, and calendar."
---

A module in Python refers to a file containing reusable code, while a library is a collection of modules. These can be imported from external providers or come pre-packaged with Python itself. Modules contain files and classes with utility functions ready for use in your applications.

Creating a module is as simple as writing functions in a Python file:

```python
# file name: my_module.py
def display_message():
    print("Hello world!")
```

To use this module:

```python
# file name: example.py
import my_module

my_module.display_message()
```

Unlike external modules that require installation, built-in modules come pre-installed with Python and offer a wide range of functionalities — from file operations and web services to system-related tasks.

**Advantages of built-in modules:**

- **Reliability** — rigorously tested by the Python core team
- **Standardization** — part of Python's official Standard Library
- **Documentation** — comprehensive official docs maintained consistently
- **Maintenance** — regularly updated by the Python community

### Common Built-in Modules

**`os` module**

Provides OS-level functionality for interacting with the operating system — directory operations, environment variables, file path manipulation, and launching applications.

**`sys` module**

Enables interaction with the Python interpreter itself — inspecting the Python version, modifying the module search path, and accessing command-line arguments.

**`datetime` module**

Handles everything date and time related — formatting, timestamps, parsing date strings, and calculating time differences.

**`math` module**

Offers mathematical functions and constants beyond basic arithmetic — square roots, trigonometry, logarithms, and constants like `pi` and `e`.

**`calendar` module**

Provides calendar generation utilities — printing month/year calendars, checking for leap years, and computing weekdays.

For a complete reference, see Python's official module index at [https://docs.python.org/3/py-modindex.html](https://docs.python.org/3/py-modindex.html).
