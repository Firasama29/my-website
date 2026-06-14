---
title: "Working with PDF Files in Python"
date: "2025-12-07"
tags: ["Python"]
excerpt: "A practical guide to handling PDF files in Python — merging, splitting, converting to DOCX, and converting images to PDF using PyPDF2 and Pillow."
---

Using Python for everyday tasks is very useful. It's one of the easiest programming languages to work with, not only because of the clear, readable syntax but also because of the wide range of available libraries that you can simply import and utilize in your projects.

### Merge Multiple PDF Files Into One

Multiple PDF files can be combined into a single document — useful for organizing reports, invoices, or scanned documents. This can be done using Python's `PyPDF2` library.

First, install it:

```bash
pip install PyPDF2
```

```python
from PyPDF2 import PdfMerger
import os

folder = input("Enter your folder: ")
output_file = "output.pdf"

if not os.path.exists(folder):
    raise FileNotFoundError("input folder does not exist!")
elif os.path.exists(output_file):
    raise FileExistsError(f"file `{output_file}` already exists!")

merger = PdfMerger()

for file in os.listdir(folder):
    if file.endswith(".pdf"):
        merger.append(os.path.join(folder, file))

merger.write(output_file)
merger.close()
print("pdf merged successfully!")
```

The `append()` function adds files to the merger object and keeps them in memory until they're saved using `write()`. Calling `close()` releases resources and cleans up the merger object.

### Split a PDF Into Single-Page Files

The following script uses `PyPDF2` to load a PDF and save each page as an individual document:

```python
from PyPDF2 import PdfReader, PdfWriter

reader = PdfReader(input("Enter the path where the file is: "))
total_pages = len(reader.pages)

for i in range(total_pages):
    writer = PdfWriter()
    writer.add_page(reader.pages[i])

    output_name = f"page_{i + 1}.pdf"

    with open(output_name, "wb") as output_file:
        writer.write(output_file)

print(f"Files split into {total_pages} pages")
```

### Convert PDF to DOCX

The `pdf2docx` library provides a `Converter.convert()` function for PDF-to-DOCX transformation:

```python
from pdf2docx import Converter
import os

pdf_file = input("Enter your input PDF file: ")
docx_file = input("Enter your output docx file: ")

if not os.path.exists(pdf_file):
    raise FileNotFoundError(f"file `{pdf_file}` does not exist!")
elif os.path.exists(docx_file):
    raise FileExistsError(f"file `{docx_file}` already exists!")
else:
    cv = Converter(pdf_file)
    cv.convert(docx_file)
    cv.close()
    print(f"{pdf_file} converted to {docx_file} successfully")
```

### Convert an Image to PDF

Python's Pillow library makes it simple to convert a single image to PDF:

```python
from PIL import Image
import os

input_image = input("Enter the image file path: ")
output_pdf = input("Enter the pdf file name: ")

if not os.path.exists(input_image):
    raise FileNotFoundError(f"{input_image} does not exist!")
elif os.path.exists(output_pdf):
    raise FileExistsError(f"{output_pdf} already exists!")

image = Image.open(input_image)
image = image.convert("RGB")
image.save(output_pdf)

print("Image converted to PDF successfully")
```

### Convert Multiple Images to a Single PDF

Combining multiple images into one multi-page PDF:

```python
from PIL import Image
import os

folder = input("Enter the folder containing images: ")
output_pdf = input("Enter the output PDF name: ")

images = []

for file in os.listdir(folder):
    if file.lower().endswith((".jpeg", ".jpg", ".png")):
        image = Image.open(os.path.join(folder, file)).convert("RGB")
        images.append(image)

if images:
    first_image = images[0]
    others = images[1:]
    first_image.save(output_pdf, save_all=True, append_images=others)
    print("Images merged into one PDF successfully")
else:
    print("No valid images found")
```

These scripts showcase a glimpse of Python's versatility in automating file and document management tasks.
