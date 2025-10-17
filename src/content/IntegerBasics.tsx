import React from 'react';

const IntegerBasics: React.FC = () => {
  return (
    <div className="integer-basics-content min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-8 rounded-2xl shadow-2xl mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-center">🐍 Integers (int) in Python</h1>
          <p className="text-xl text-center opacity-90">Полное руководство по работе с целыми числами</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 text-indigo-600">📚 Введение</h2>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-xl my-6">
              <p className="text-gray-700 leading-relaxed">Integers are one of the fundamental data types in Python, representing numbers without a decimal point. In this lesson, we will thoroughly examine working with integers in Python, including their creation, operations, and practical applications.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 text-emerald-600">🎯 Основные концепции</h2>

            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Что такое целые числа?</h3>
            
            <p className="mb-4 text-gray-700">Integers in Python are numbers that do not contain a fractional part. They can be positive, negative, or zero.</p>

            <h4 className="text-xl font-medium mb-3 text-gray-700">Примеры целых чисел:</h4>

            <div className="flex flex-wrap gap-3 my-6">
              <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition-shadow">42</span>
              <span className="text-sm self-center text-gray-600">положительное число</span>
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition-shadow">-17</span>
              <span className="text-sm self-center text-gray-600">отрицательное число</span>
              <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition-shadow">0</span>
              <span className="text-sm self-center text-gray-600">ноль</span>
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition-shadow">10000</span>
              <span className="text-sm self-center text-gray-600">большое число</span>
            </div>

            <h3 className="text-2xl font-semibold mb-4 text-gray-800 mt-8">Создание целых чисел</h3>

            <p className="mb-4 text-gray-700">В Python целые числа создаются несколькими способами:</p>

            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border-l-4 border-cyan-500 p-6 rounded-r-xl my-6">
              <h4 className="text-cyan-700 font-bold text-lg mb-3">1. Прямое присваивание:</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-2 overflow-x-auto">
                <code>{`age = 25
temperature = -10
zero = 0`}</code>
              </pre>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 rounded-r-xl my-6">
              <h4 className="text-blue-700 font-bold text-lg mb-3">2. Через арифметические операции:</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-2 overflow-x-auto">
                <code>{`result = 10 + 5  # result будет равно 15
difference = 20 - 7  # difference будет равно 13`}</code>
              </pre>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-6 rounded-r-xl my-6">
              <h4 className="text-indigo-700 font-bold text-lg mb-3">3. Преобразование из других типов:</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-2 overflow-x-auto">
                <code>{`# Преобразование строки в целое число
number_str = "42"
number_int = int(number_str) # number_int будет равно 42

# Преобразование числа с плавающей точкой
float_number = 3.14
int_number = int(float_number)  # int_number будет равно 3`}</code>
              </pre>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 text-amber-600">⚙️ Операции с целыми числами</h2>

            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Арифметические операции</h3>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl my-6">
              <p className="text-gray-700">Python поддерживает все базовые арифметические операции:</p>
            </div>

            <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl mt-4 overflow-x-auto shadow-lg">
              <code>{`a = 10
b = 3

# Сложение
sum_result = a + b  # 13

# Вычитание
diff_result = a - b  # 7

# Умножение
mult_result = a * b  # 30

# Деление (возвращает float)
div_result = a / b  # 3.333333

# Целочисленное деление
floor_div_result = a // b  # 3

# Остаток от деления
mod_result = a % b  # 1

# Возведение в степень
power_result = a ** b  # 1000`}</code>
            </pre>

            <h3 className="text-2xl font-semibold mb-4 text-gray-800 mt-8">Операции сравнения</h3>

            <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl mt-4 overflow-x-auto shadow-lg">
              <code>{`x = 5
y = 10

print(x == y)  # False (равно)
print(x != y)  # True (не равно)
print(x < y)   # True (меньше)
print(x > y)   # False (больше)
print(x <= y)  # True (меньше или равно)
print(x >= y)  # False (больше или равно)`}</code>
            </pre>

            <h3 className="text-2xl font-semibold mb-4 text-gray-800 mt-8">Побитовые операции</h3>

            <div className="bg-gradient-to-r from-violet-50 to-purple-50 border-l-4 border-violet-500 p-6 rounded-r-xl my-6">
              <p className="text-gray-700">Python также поддерживает побитовые операции с целыми числами:</p>
            </div>

            <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl mt-4 overflow-x-auto shadow-lg">
              <code>{`a = 5  # В двоичной системе: 101
b = 3  # В двоичной системе: 011

# Побитовое И
bitwise_and = a & b  # 1 (в двоичной: 001)

# Побитовое ИЛИ
bitwise_or = a | b   # 7 (в двоичной: 111)

# Побитовое исключающее ИЛИ
bitwise_xor = a ^ b  # 6 (в двоичной: 110)

# Побитовое НЕ
bitwise_not = ~a     # -6

# Сдвиг влево
left_shift = a << 1  # 10 (в двоичной: 1010)

# Сдвиг вправо
right_shift = a >> 1 # 2 (в двоичной: 10)`}</code>
            </pre>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 text-rose-600">🔄 Преобразование типов</h2>

            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Преобразование в целое число</h3>

            <div className="bg-gradient-to-r from-rose-50 to-pink-50 border-l-4 border-rose-500 p-6 rounded-r-xl my-6">
              <p className="text-gray-700">Функция <code className="bg-rose-100 px-3 py-1 rounded-lg text-rose-700 font-mono text-sm">int()</code> используется для преобразования других типов данных в целое число:</p>
            </div>

            <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl mt-4 overflow-x-auto shadow-lg">
              <code>{`# Из строки
num_str = "123"
num_int = int(num_str)  # 123

# Из числа с плавающей точкой
num_float = 3.14
num_int = int(num_float)  # 3

# Из булевого значения
bool_true = True
bool_false = False
int_true = int(bool_true)   # 1
int_false = int(bool_false) # 0

# С указанием системы счисления
binary_str = "1010"
decimal_num = int(binary_str, 2)  # 10`}</code>
            </pre>

            <h3 className="text-2xl font-semibold mb-4 text-gray-800 mt-8">Преобразование из целого числа</h3>

            <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl mt-4 overflow-x-auto shadow-lg">
              <code>{`num = 42

# В строку
num_str = str(num) # "42"

# В число с плавающей точкой
num_float = float(num)  # 42.0

# В булевое значение
num_bool = bool(num)  # True
zero_bool = bool(0)   # False`}</code>
            </pre>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 text-teal-600">💡 Практические примеры</h2>

            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-6 rounded-xl shadow-xl my-6">
              <h3 className="text-2xl font-bold mb-4">Пример 1: Калькулятор простых операций</h3>
              <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg mt-4 overflow-x-auto">
                <code>{`def simple_calculator():
    print("Простой калькулятор")
    print("Введите два целых числа:")
    
    num1 = int(input("Первое число: "))
    num2 = int(input("Второе число: "))
    
    print(f"\\nРезультаты операций с {num1} и {num2}:")
    print(f"Сложение: {num1} + {num2} = {num1 + num2}")
    print(f"Вычитание: {num1} - {num2} = {num1 - num2}")
    print(f"Умножение: {num1} * {num2} = {num1 * num2}")

simple_calculator()`}</code>
              </pre>
            </div>

            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-6 rounded-xl shadow-xl my-6">
              <h3 className="text-2xl font-bold mb-4">Пример 2: Проверка чётности числа</h3>
              <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg mt-4 overflow-x-auto">
                <code>{`def check_even_odd():
    number = int(input("Введите целое число: "))
    
    if number % 2 == 0:
        print(f"{number} - чётное число")
    else:
        print(f"{number} - нечётное число")

check_even_odd()`}</code>
              </pre>
            </div>

            <div className="bg-gradient-to-r from-violet-500 to-purple-500 text-white p-6 rounded-xl shadow-xl my-6">
              <h3 className="text-2xl font-bold mb-4">Пример 3: Работа с диапазонами чисел</h3>
              <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg mt-4 overflow-x-auto">
                <code>{`def number_range_analysis():
    start = int(input("Введите начало диапазона: "))
    end = int(input("Введите конец диапазона: "))
    
    # Подсчёт суммы чисел в диапазоне
    total_sum = sum(range(start, end + 1))
    print(f"Сумма чисел от {start} до {end}: {total_sum}")
    
    # Подсчёт чётных и нечётных чисел
    even_count = 0
    odd_count = 0
    
    for num in range(start, end + 1):
        if num % 2 == 0:
            even_count += 1
        else:
            odd_count += 1
    
    print(f"Количество чётных чисел: {even_count}")
    print(f"Количество нечётных чисел: {odd_count}")

number_range_analysis()`}</code>
              </pre>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 text-orange-600">📝 Практические задания</h2>

            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-500 p-6 rounded-r-xl my-6">
              <h3 className="text-yellow-700 font-bold text-xl mb-3">⚡ Задание 1: Калькулятор факториала</h3>
              <p className="text-gray-700 mb-4">Напишите программу, которая вычисляет факториал заданного числа. Факториал числа n (обозначается как n!) - это произведение всех положительных целых чисел от 1 до n.</p>
              <p className="text-sm text-gray-600 mb-3"><strong>Пример:</strong> 5! = 5 × 4 × 3 × 2 × 1 = 120</p>

              <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg mt-4 overflow-x-auto">
                <code>{`def factorial(n):
    # Ваш код здесь
    pass

# Тестирование
print(factorial(5))  # Должно вывести 120
print(factorial(0))  # Должно вывести 1`}</code>
              </pre>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500 p-6 rounded-r-xl my-6">
              <h3 className="text-orange-700 font-bold text-xl mb-3">⚡ Задание 2: Определение простого числа</h3>
              <p className="text-gray-700 mb-4">Напишите функцию, которая проверяет, является ли заданное число простым. Простое число - это натуральное число больше 1, которое имеет ровно два делителя: 1 и само себя.</p>

              <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg mt-4 overflow-x-auto">
                <code>{`def is_prime(n):
    # Ваш код здесь
    pass

# Тестирование
print(is_prime(17))  # Должно вывести True
print(is_prime(15))  # Должно вывести False`}</code>
              </pre>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-rose-50 border-l-4 border-pink-500 p-6 rounded-r-xl my-6">
              <h3 className="text-pink-700 font-bold text-xl mb-3">⚡ Задание 3: Преобразование систем счисления</h3>
              <p className="text-gray-700 mb-4">Напишите программу, которая преобразует десятичное число в двоичное и наоборот.</p>

              <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg mt-4 overflow-x-auto">
                <code>{`def decimal_to_binary(decimal):
    # Ваш код здесь
    pass

def binary_to_decimal(binary):
    # Ваш код здесь
    pass

# Тестирование
print(decimal_to_binary(10))  # Должно вывести "1010"
print(binary_to_decimal("1010"))  # Должно вывести 10`}</code>
              </pre>
            </div>

            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border-l-4 border-teal-500 p-6 rounded-r-xl my-6">
              <h3 className="text-teal-700 font-bold text-xl mb-3">⚡ Задание 4: Числа Фибоначчи</h3>
              <p className="text-gray-700 mb-4">Напишите функцию, которая возвращает n-ное число Фибоначчи. Последовательность Фибоначчи начинается с 0 и 1, и каждое последующее число равно сумме двух предыдущих.</p>
              <p className="text-sm text-gray-600 mb-3"><strong>Последовательность:</strong> 0, 1, 1, 2, 3, 5, 8, 13, 21, ...</p>

              <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg mt-4 overflow-x-auto">
                <code>{`def fibonacci(n):
    # Ваш код здесь
    pass

# Тестирование
print(fibonacci(0))  # Должно вывести 0
print(fibonacci(1))  # Должно вывести 1
print(fibonacci(6))  # Должно вывести 8`}</code>
              </pre>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white p-8 rounded-2xl shadow-2xl my-8">
            <h2 className="text-3xl font-bold mb-6 text-center">📌 Резюме</h2>
            <h3 className="text-2xl font-bold mb-6 text-center">🎓 Что мы изучили</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white bg-opacity-20 p-5 rounded-xl backdrop-blur-sm hover:bg-opacity-30 transition-all">
                <h4 className="font-bold text-lg mb-2">✓ Основные концепции</h4>
                <p className="text-sm text-gray-100">Что такое целые числа и как их создавать</p>
              </div>
              
              <div className="bg-white bg-opacity-20 p-5 rounded-xl backdrop-blur-sm hover:bg-opacity-30 transition-all">
                <h4 className="font-bold text-lg mb-2">✓ Арифметические операции</h4>
                <p className="text-sm text-gray-100">Сложение, вычитание, умножение, деление</p>
              </div>
              
              <div className="bg-white bg-opacity-20 p-5 rounded-xl backdrop-blur-sm hover:bg-opacity-30 transition-all">
                <h4 className="font-bold text-lg mb-2">✓ Операции сравнения</h4>
                <p className="text-sm text-gray-100">Как сравнивать целые числа между собой</p>
              </div>
              
              <div className="bg-white bg-opacity-20 p-5 rounded-xl backdrop-blur-sm hover:bg-opacity-30 transition-all">
                <h4 className="font-bold text-lg mb-2">✓ Побитовые операции</h4>
                <p className="text-sm text-gray-100">Работа с битами целых чисел</p>
              </div>
              
              <div className="bg-white bg-opacity-20 p-5 rounded-xl backdrop-blur-sm hover:bg-opacity-30 transition-all">
                <h4 className="font-bold text-lg mb-2">✓ Преобразование типов</h4>
                <p className="text-sm text-gray-100">Конвертация между типами данных</p>
              </div>
              
              <div className="bg-white bg-opacity-20 p-5 rounded-xl backdrop-blur-sm hover:bg-opacity-30 transition-all">
                <h4 className="font-bold text-lg mb-2">✓ Практические примеры</h4>
                <p className="text-sm text-gray-100">Реальные случаи использования целых чисел</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-slate-100 to-gray-100 p-6 rounded-xl text-center my-8 shadow-md">
            <p className="text-gray-800 text-lg font-semibold">🐍 Python Programming Tutorial | Integers (int) Data Type</p>
            <p className="text-gray-600 mt-2">Целые числа — фундаментальный тип данных в Python</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegerBasics;