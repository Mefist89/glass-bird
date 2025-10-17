# Инструкция по исправлению ошибки RLS при регистрации

## Проблема
При регистрации нового пользователя возникает ошибка: "new row violates row-level security policy for table 'profiles'"

## Причина
Проблема связана с неправильно настроенными политиками безопасности (Row Level Security) для таблицы `profiles` в Supabase. При регистрации через `supabase.auth.signUp()` создается пользователь в `auth.users`, и триггер `handle_new_user` должен автоматически создать запись в `profiles`. Однако, при попытке вручную обновить профиль через анонимный ключ возникает конфликт с политиками безопасности.

## Решение

### 1. Обновление структуры таблицы profiles

Выполните следующий SQL-скрипт в SQL-редакторе Supabase (SQL Editor):

```sql
-- Создание таблицы профилей пользователей, связанной с Supabase Auth
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  updated_at TIMESTAMPTZ,
  email TEXT UNIQUE,
  name TEXT DEFAULT 'User',
  role TEXT DEFAULT 'student',
  enrolled_courses TEXT[],
  progress JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Включение Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Создание политик безопасности
-- Разрешаем анонимным и аутентифицированным пользователям вставлять данные
-- Это позволяет создавать профили при регистрации через триггер
CREATE POLICY "Allow insert for all users" ON profiles
  FOR INSERT WITH CHECK (true);

-- Политика для аутентифицированных пользователей - позволяет просматривать и обновлять свой профиль
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Разрешаем анонимным и аутентифицированным пользователям использовать таблицу
GRANT ALL ON profiles TO anon, authenticated;

-- Триггер для автоматического создания профиля при регистрации
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
  BEGIN
    INSERT INTO public.profiles (id, email, name, created_at, updated_at, role)
    VALUES (
      new.id, 
      new.email, 
      COALESCE(new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'full_name', 'User'), 
      NOW(), 
      NOW(),
      'student'
    );
    RETURN new;
  END;
$$ LANGUAGE plpgsql;

-- Привязка триггера к событию создания пользователя
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Функция для безопасного создания/обновления профиля пользователя
CREATE OR REPLACE FUNCTION public.create_or_update_user_profile(
  p_user_id UUID,
  p_email TEXT,
  p_name TEXT
)
RETURNS TABLE(profile_id UUID, profile_email TEXT, profile_name TEXT) AS $$
DECLARE
  result_record RECORD;
BEGIN
 -- Используем INSERT ... ON CONFLICT для безопасного создания или обновления профиля
  INSERT INTO profiles (id, email, name, updated_at)
  VALUES (p_user_id, p_email, p_name, NOW())
  ON CONFLICT (id)
 DO UPDATE SET
    email = EXCLUDED.email,
    name = EXCLUDED.name,
    updated_at = EXCLUDED.updated_at
  RETURNING profiles.id, profiles.email, profiles.name INTO result_record;

  RETURN QUERY SELECT result_record.id, result_record.email, result_record.name;
END;
$$ LANGUAGE plpgsql;

-- Предоставляем права на выполнение функций
GRANT EXECUTE ON FUNCTION create_or_update_user_profile(UUID, TEXT, TEXT) TO anon, authenticated;
```

### 2. Обновление приложения

В приложении теперь используется безопасная функция `create_or_update_user_profile` для создания/обновления профиля при регистрации, что обходит ограничения RLS.

## Проверка

После выполнения этих изменений:
1. Зарегистрируйте нового пользователя
2. Убедитесь, что профиль создается без ошибок
3. Проверьте, что вход в систему работает корректно