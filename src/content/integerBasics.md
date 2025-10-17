# Integers (int) in Python

## Introduction

Integers are one of the fundamental data types in Python, representing numbers without a decimal point. In this lesson, we will thoroughly examine working with integers in Python, including their creation, operations, and practical applications.

## Basic Concepts

### What are integers?

Integers in Python are numbers that do not contain a fractional part. They can be positive, negative, or zero.

Examples of integers:
- 42 (положительное число)
- -17 (отрицательное число)
- 0 (ноль)
- 1000000 (большое число)

### Creating integers

In Python, integers are created in several ways:

1. **Direct assignment:**
```python
age = 25
temperature = -10
zero = 0
```

2. **Through arithmetic operations:**
```python
result = 10 + 5  # result будет равно 15
difference = 20 - 7  # difference будет равно 13
```

3. **Converting from other types:**
```python
# Converting a string to an integer
number_str = "42"
number_int = int(number_str)  # number_int will equal 42

# Converting a floating-point number to an integer
float_number = 3.14
int_number = int(float_number)  # int_number will equal 3 (fractional part is discarded)
```

## Operations with integers

### Arithmetic operations

Python supports all basic arithmetic operations with integers:

```python
a = 10
b = 3

# Сложение
sum_result = a + b  # 13

# Вычитание
diff_result = a - b  # 7

# Умножение
mult_result = a * b  # 30

# Деление (возвращает float)
div_result = a / b  # 3.33333335

# Целочисленное деление
floor_div_result = a // b  # 3

# Остаток от деления
mod_result = a % b  # 1

# Возведение в степень
power_result = a ** b  # 1000
```

### Comparison operations

Integers can be compared with each other:

```python
x = 5
y = 10

print(x == y)  # False (equal)
print(x != y)  # True (not equal)
print(x < y)   # True (less than)
print(x > y)   # False (greater than)
print(x <= y)  # True (less than or equal)
print(x >= y) # False (greater than or equal)
```

### Bitwise operations

Python also supports bitwise operations with integers:

```python
a = 5 # In binary: 101
b = 3 # In binary: 011

# Bitwise AND
bitwise_and = a & b  # 1 (in binary: 001)

# Bitwise OR
bitwise_or = a | b   # 7 (in binary: 111)

# Bitwise exclusive OR
bitwise_xor = a ^ b # 6 (in binary: 10)

# Bitwise NOT
bitwise_not = ~a     # -6

# Left bitwise shift
left_shift = a << 1  # 10 (in binary: 1010)

# Right bitwise shift
right_shift = a >> 1 # 2 (in binary: 10)
```

## Type conversion

### Converting to integer

The `int()` function is used to convert other data types to an integer:

```python
# From string
num_str = "123"
num_int = int(num_str)  # 123

# From floating-point number
num_float = 3.14
num_int = int(num_float)  # 3 (fractional part is discarded)

# From boolean value
bool_true = True
bool_false = False
int_true = int(bool_true)   # 1
int_false = int(bool_false) # 0

# With number base specified
binary_str = "1010"
decimal_num = int(binary_str, 2)  # 10 (binary 1010 in decimal system)
```

### Converting from integer

Integers can be converted to other data types:

```python
num = 42

# To string
num_str = str(num)  # "42"

# To floating-point number
num_float = float(num)  # 42.0

# To boolean value
num_bool = bool(num)  # True (any non-zero number gives True)
zero_bool = bool(0)   # False (zero gives False)
```

## Practical examples

### Example 1: Simple operations calculator

```python
def simple_calculator():
    print("Simple calculator")
    print("Enter two integers:")
    
    # Get numbers from user
    num1 = int(input("First number: "))
    num2 = int(input("Second number: "))
    
    # Perform operations
    print(f"\nResults of operations with {num1} and {num2}:")
    print(f"Addition: {num1} + {num2} = {num1 + num2}")
    print(f"Subtraction: {num1} - {num2} = {num1 - num2}")
    print(f"Multiplication: {num1} * {num2} = {num1 * num2}")
    print(f"Division: {num1} / {num2} = {num1 / num2}")
    print(f"Integer division: {num1} // {num2} = {num1 // num2}")
    print(f"Remainder: {num1} % {num2} = {num1 % num2}")
    print(f"Exponentiation: {num1} ** {num2} = {num1 ** num2}")

# Call function
simple_calculator()
```

### Example 2: Number parity check

```python
def check_even_odd():
    number = int(input("Enter an integer: "))
    
    if number % 2 == 0:
        print(f"{number} - even number")
    else:
        print(f"{number} - odd number")

# Call function
check_even_odd()
```

### Example 3: Working with number ranges

```python
def number_range_analysis():
    start = int(input("Enter the start of the range: "))
    end = int(input("Enter the end of the range: "))
    
    # Counting sum of numbers in range
    total_sum = sum(range(start, end + 1))
    print(f"Sum of numbers from {start} to {end}: {total_sum}")
    
    # Counting even and odd numbers
    even_count = 0
    odd_count = 0
    
    for num in range(start, end + 1):
        if num % 2 == 0:
            even_count += 1
        else:
            odd_count += 1
    
    print(f"Number of even numbers: {even_count}")
    print(f"Number of odd numbers: {odd_count}")

# Call function
number_range_analysis()
```

## Practical assignments

### Assignment 1: Factorial calculator
Write a program that calculates the factorial of a given number. The factorial of number n (denoted as n!) is the product of all positive integers from 1 to n.

Example:
- 5! = 5 × 4 × 3 × 2 × 1 = 120

```python
def factorial(n):
    # Your code here
    pass

# Testing
print(factorial(5))  # Should output 120
print(factorial(0))  # Should output 1 (by definition 0! = 1)
```

### Assignment 2: Prime number determination
Write a function that checks if a given number is prime. A prime number is a natural number greater than 1 that has exactly two divisors: 1 and itself.

```python
def is_prime(n):
    # Your code here
    pass

# Testing
print(is_prime(17))  # Should output True
print(is_prime(15))  # Should output False
```

### Assignment 3: Converting numbers between number systems
Write a program that converts a decimal number to binary and vice versa.

```python
def decimal_to_binary(decimal):
    # Your code here
    pass

def binary_to_decimal(binary):
    # Your code here
    pass

# Testing
print(decimal_to_binary(10))  # Should output "1010"
print(binary_to_decimal("1010"))  # Should output 10
```

### Assignment 4: Fibonacci numbers
Write a function that returns the nth Fibonacci number. The Fibonacci sequence starts with 0 and 1, and each subsequent number equals the sum of the two preceding numbers.

Sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, ...

```python
def fibonacci(n):
    # Your code here
    pass

# Testing
print(fibonacci(0))  # Should output 0
print(fibonacci(1))  # Should output 1
print(fibonacci(6))  # Should output 8
```

## Summary

In this lesson, we covered:

1. **Basic concepts** - what integers are and how to create them
2. **Arithmetic operations** - addition, subtraction, multiplication, division and other operations
3. **Comparison operations** - how to compare integers with each other
4. **Bitwise operations** - working with integer bits
5. **Type conversion** - how to convert integers to other types and vice versa
6. **Practical examples** - real cases of using integers
7. **Practical assignments** - exercises to reinforce the material

Integers are a fundamental data type in Python, and understanding how they work is necessary for any programmer. In the following lessons, we will examine other data types and more complex structures.