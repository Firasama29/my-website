---
title: "Renaming Files in Bulk Using Python"
date: "2025-12-12"
tags: ["Python"]
excerpt: "A short Python script that renames image files in bulk using a consistent naming pattern — a practical automation exercise for developers looking to build real coding habits."
---

Manually renaming a large number of files is tedious and error-prone. Python makes it easy to automate this kind of task, and it's a great exercise for developers looking to build practical scripting skills.

### The Script

The script below renames all image files in a given directory using the pattern `image_1`, `image_2`, etc., preserving each file's original extension.

```python
import os

def rename_in_bulk(input_directory):
    try:
        os.chdir(input_directory)

        files = [f for f in os.listdir() if f.endswith((".png", ".jpg", ".jpeg"))]

        if not files:
            print("No images were found in this directory.")
            return

        n = 1
        for old_file in files:
            _, extension = os.path.splitext(old_file)
            new_file = f"image_{n}{extension}"
            n += 1
            os.rename(old_file, new_file)
            print(f"Renamed {old_file} -> {new_file}")

        print(f"File renaming completed. Files renamed: {n - 1}")

    except FileNotFoundError:
        print("Directory not found")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


rename_in_bulk(input("Enter directory path: "))
```

### How It Works

- `os.chdir()` navigates to the target directory
- `os.listdir()` filters files by extension (`.png`, `.jpg`, `.jpeg`)
- `os.path.splitext()` separates the filename from its extension so the extension is preserved during renaming
- A counter tracks the sequential number appended to each filename
- `try-except` handles a missing directory and any unexpected errors

### Running It

Save the script as `bulk_file_rename.py` and run:

```bash
python3 bulk_file_rename.py
```

You'll be prompted to enter the path to your target directory.

Automation like this maximizes productivity by removing repetitive manual work and freeing up time for more meaningful tasks.
