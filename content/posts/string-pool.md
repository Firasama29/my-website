---
title: "String Pool In Java"
date: "2025-10-13"
tags: ["Java","Memory Management"]
excerpt: "Photo by [Bernd 📷 Dittrich](https://unsplash.com/@hdbernd?utmcontent=creditCopyText&utmmedium=referral&utmsource=unsplash) on [Unsplash](https://unsplash.com/p"
---
Press enter or click to view image in full size

Photo by [Bernd 📷 Dittrich](https://unsplash.com/@hdbernd?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/a-laptop-computer-sitting-on-top-of-a-table-PKqxOOQqN64?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

String is one of the most widely used classes in Java. All types of programs rely heavily on Strings — for user input, logging, communication and more. Because Strings are so central, the way they are created and stored has an impact on performance and memory usage.

As a way to optimization, Java introduced two key concepts in relation to String: **immutability** and **String pool**. In this article we’ll mainly focus on the concept of String pool and explore how Strings are created, stored and compared.

### How to Create a String Object?

There are two ways you can create a String object:

* **Using double quotes (String literal):**


     String test = "Test";

* **Using the**`new`**keyword (calling String constructor):**


     String test = new String("Test");

> **What’s the difference between the two?**

Let’s compare two Strings with the == operator to demonstrate the difference:

* When you create a String literal, JVM searches in the **_String pool_**. 
  If a String with the same value already exists in the String pool, it returns a reference to its address without allocating additional memory, otherwise it creates a new String in the pool and returns its reference.
* On the other hand, using `new` keyword **creates a new String** whether it exists in the pool.

So the first line of code is **true** because both compared literals will point to the same object in the pool, while `test1` and `test2` are pointing to two distinct objects, so it’s **false**.

> What exactly is the purpose of String pool?

- **_String pool_** is essentially a pool of Strings in the heap space where Strings with identical values are stored. 
- It’s a technique to **optimize memory usage**. This is because **String in Java is immutable**, that is, any attempt to modify its value (via concatenation) results in creating a new String, which leads to increased memory usage.

Here's an example:

        String output = "";
        for(int i = 0; i < 100; i++) {
            output += i;
        }

We're trying to concatenate a String 100 times. This creates a hundred Strings, which will be stored in the heap space. So a hundred objects obviously put a heavy load on the memory.

String pool helps reduce unnecessary memory consumption by reusing references for objects of the same values.

As a best practice, we should use String literals (double quotes) rather than `new String().`It’s cleaner and much more readable and allows the JVM to optimize the code.

### Comparing Strings with == vs. .equals()

* Simply put, the `==` operator compares references of objects to check if both point to the same object in memory.
* `equals()` compares the values — whether the content of the two Strings is the same:



Press enter or click to view image in full size

### **Bonus Question:**

> How many Strings are created with the following statement if the String does not already exist in the pool?  
> `String city = new String( "Istanbul")`

The above statement creates **two** objects. Here’s a breakdown:

* Since the literal “`Istanbul`” does not exist in the pool, it gets added in the pool. T**his creates a pooled String object (first object)**.
* Next, the `new` keyword calls the String constructor and **creates a new String object on the heap (second object)**.



If `Istanbul` already exists in the pool, only one String object is created in the heap.

Thanks for reading!