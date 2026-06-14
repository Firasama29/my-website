---
title: "Why do we need to override equals() and hashcode()?"
date: "2025-10-03"
tags: ["Java"]
excerpt: "### Why does the default equals() method of Object return false when two objects have the same value?"
---
or

## `equals()` method

### Why does the default `equals()` method of `Object` return false when two objects have the same value?
We will understand the reason if we look at the method's body:

```java
	public boolean equals(Object obj) {
		return (this == obj);
	}
```
As you can see, by default the method simply compares object's references. It does not compare what's inside the objects - it only checks if both references point to the same object in memory.
It therefore behaves the same as comparison by `==`.

The result is the same for any class since every class in Java implicitly extends the Object class:
```java
public class Device {

    private String name;

    public Device(String name) {
        this.name = name;
    }
}


public class Main {

	public static void main(String[] args) {
            Device laptop = new Device("Apple");
            Device phone = new Device("Apple");

            System.out.println(laptop.equals(phone));	// false
    }
}
```
Even though `laptop` and `phone` are created with the same name field, they're pointing to two different objects.

**When does it return true?**
It can return `true` if both references point to the same object:
```java
	public class Main {
            public static void main(String[] args) {
                Device phone = new Device("Apple");
                Device smartPhone = phone;
        
                System.out.println(phone.equals(smartPhone));	// true
            }
}
```

**But why is the default implementation of equals only compares references?**

This should be obvious, because at Object's level - that is, the root Object - Java does not know what makes objects "equal", it has no idea what an object contains.
It only knows that each object has a memory address, so it checks if two references point to the same memory location. (`this == obj`).
This is the only equality that the `Object` class can guarantee.
Anything more specific must be defined by the class itself by overriding the `equals()` method.

### Overriding equals():
To compare the contents of objects, the `equals()` method has to be overridden:

```java
public class Device {

    private String name;

    public Device(String name) {
        this.name = name;
    }
	
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;		// compares references
        
        if (o == null || getClass() != o.getClass()) return false;
        
        Device device = (Device) o;
        return Objects.equals(name, device.name);	// compares contents
    }
	
    @Override
    public int hashCode() {
        return Objects.hashCode(name);
    }
}
```

- In our implementation, we're first comparing by references, then we're performing _type checking_ - `if (o == null || getClass() != o.getClass()) return false;` - before finally comparing the contents of `laptop` and `phone`, which results in `true`.
  **What's the purpose of type checking in  `equals()`?**
- Type checking in `equals()` simply refers to a way to ensure both compared objects are of the same type, because the input `o` can be any object, so we need to make sure we're passing
  the object of the **right type**, or else a `ClassCastException` could occur.
- This is achieved by checking what type `o` actually is:

    -- Using `getClass()`:

      `if (o == null || getClass() != o.getClass()) return false;`
    - It returns `true` if both objects are of the exact same class.
    - This is a strict check and more common. Subclasses are not allowed.

    -- Using `instanceof`:

      `if (!(o instanceof Device)) return false;`
    - It returns true if the object is of the current class or any of its subclasses.
    - It's more flexible but can cause problems if subclasses override `equals()`, as this can easily break the symmetry rule of the `equals()` contract.
    - The symmetry rule is one of the key rules of `equals()` contract defined by the Object class. It essentially states that equality must be mutual.
      
            if `A` is equals to `B`, then `B` should be equal `A`.
    - This rule is often violated when comparing a superclass to a subclass that introduces additional fields. To solve this we can simply make `equals()` method final.
      This will ensure that no subclass overrides equals() and violates symmetry rule.

-- Notice that we've also overridden `hashcode()` method. We'll discuss why we need it in the later sections.

-- `String` class is an example of a class that has its own implementation of the `equals()` method.

### The equals() contract

We breifly talked about the symmetry rule. Let's briefly discuss the other important aspects `equals()` contract, which essentially states that the `equals()` method must satisfy the following rules:
- Reflexive: `x.equals(x)` must return true.
- Symmetric: if `x.equals(y)` is true then `y.equals(x)` must also be true.
- Transitive: for `x`, `y` and `z`, if `x.equals(y)` and `y.equals(z)` is true, then `x.equals(z)` must also be true.
- Consistent: multiple invocations of `x.equals(y)` must return the same result, unless object data changes.
- non-null: `x.equals(null)` must always return false.

### Common Mistake: Missing `null` Check in `equals()`
A common mistake when implementing `equals()` method is forgetting to handle `null`:
```java
	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		Device device = (Device) o; // ❌ Throws NullPointerException if o is null
		return Objects.equals(name, device.name);
	}
```
This causes a `NullPointerException` when `equals()` is called with a `null` argument:
```java
	public static void main(String[] args) {
        Device phone = new Device("Apple");
        Device anotherDevice = null;

        System.out.println(phone.equals(anotherDevice));	// throws NullPointerException
    }
```

**Fix**: Add a `null` and type check before casting:
```java
	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;	// this prevents NPE
		Device device = (Device) o;
		return Objects.equals(name, device.name);
	}
```
By checking `o == null`, the method safely returns `false` instead of throwing an exception.

**Tip: When to use Objects.equals(a, b) instead of a.equals(b):**
- Use `Objects.equals(a, b)` when either side can be null, because it handles `NullPointerException`.
- Use `a.equals(b)` only when you're certain that `a` is not null.

```java
	Device a = null;
	Device b = new Device();
	
	System.out.println(Objects.equals(a, b));	        // false
	System.out.println(a.equals(b));			// NullPointerException
```

**Tip: When `Objects.equals()` Can Still Throw a NullPointerException**

`Objects.equals()` itself doesn’t throw a `NullPointerException`, unless the overridden `equals()` method of the first `non-null` argument does.
Q: But if `Objects.equals()` belongs to the `Objects` class, why does our custom `equals()` in our class affects its null safety?
- If you look at Objects.equals() implementation:
  ```java
      public static boolean equals(Object a, Object b) {
          return (a == b) || (a != null && a.equals(b));
      }
  ```
  Notice that it's internally invoking `a.equals(b)` when `a` is not null.
  So if `a` is an instance of our class `Device` then it's actually calling our overridden `equals()` method
  Therefore if our `equals()` implementation does not handle null safely, then `Objects.equals(a, b)` will throw an NPE.
  In short, `Objects.equals()` is only as safe as our `equals()` implementation — it can still throw an exception if that implementation itself doesn't handle null safely.

## `hashcode()` method
- Similar to `equals`, this method is provided in the `Object` class and returns an integer has code value of an object.
- The general contract of `hashcode` is:
  - multiple invocations of `hashcode()` should return the same integer.
- As defined in the `hashcode()` method contract, when a Java class overrides the equals method, it should override the hashCode method as well.


### Common problems of not overriding either equals() or hashcode() (check medium article - ticktick)
- duplicate objects in HashSet: duplicates won't be detected.
- contains() fails in HashSet or ArrayList even when logically equal.
- remove() not working properly.
- HashMap lookup fail: keys that seem equal won't match
- HashMap stores duplicate keys: overwrites or duplicates behave unpredictably.
- Inconsistent behavior accross collection.
- Hard-trace bugs: objects appear missing in sets/maps even though they're there.