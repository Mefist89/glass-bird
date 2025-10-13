# Система аутентификации с Supabase

## Обзор

Система аутентификации включает в себя:

- Компонент формы аутентификации (`AuthForm.tsx`) с возможностью переключения между режимами входа и регистрации
- Универсальные компоненты (`LoginForm.tsx` и `RegistrationForm.tsx`) для отдельных форм
- Сервис аутентификации (`authService.ts`) для взаимодействия с Supabase
- SQL-скрипты для настройки базы данных

## Структура таблицы пользователей

Таблица `profiles` в Supabase:
- `id` - UUID, первичный ключ, связан с auth.users
- `email` - TEXT, уникальный, не null
- `name` - TEXT, не null
- `role` - TEXT, по умолчанию 'student'
- `enrolled_courses` - TEXT[], массив курсов
- `progress` - JSONB, данные о прогрессе пользователя
- `updated_at` - TIMESTAMPTZ
- `created_at` - TIMESTAMPTZ, по умолчанию текущее время

## Установка

1. Установите зависимости:
```bash
npm install @supabase/supabase-js
```

2. Выполните SQL-скрипты из `supabase.sql` в вашей Supabase базе данных

3. Настройте аутентификацию в Supabase Studio:
   - Включите Email и Password Sign Up
   - Настройте триггер для автоматического создания профиля при регистрации

## Использование компонентов

### AuthForm
```tsx
<AuthForm 
  onClose={() => setShowAuth(false)} 
 initialMode="login" // или "register"
/>
```

### LoginForm
```tsx
<LoginForm 
  onClose={() => setShowLogin(false)} 
 onLogin={async (email, password) => {
    // Обработка входа
  }}
/>
```

### RegistrationForm
```tsx
<RegistrationForm 
  onClose={() => setShowRegistration(false)} 
 onRegister={async (name, email, password) => {
    // Обработка регистрации
  }}
/>
```

## Функции аутентификации

- `registerUser(userData)` - регистрация нового пользователя
- `loginUser(email, password)` - вход пользователя в систему
- `logoutUser()` - выход пользователя из системы
- `getCurrentUser()` - получение информации о текущем пользователе

## Безопасность

- Пароли хешируются автоматически Supabase Auth
- Используется Row Level Security для защиты данных профилей
- Все операции требуют аутентификации пользователя