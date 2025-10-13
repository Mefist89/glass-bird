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

-- Индекс для email для ускорения поиска
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles USING btree(email);

-- Индекс для даты создания
CREATE INDEX IF NOT EXISTS idx_profiles_created_at ON profiles USING btree(created_at);

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

-- Роли для безопасности
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL PRIVILEGES ON TABLE profiles TO anon, authenticated;

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

-- Функция для обновления профиля пользователя
CREATE OR REPLACE FUNCTION update_user_profile(
  p_user_id UUID,
  p_name TEXT,
  p_email TEXT
)
RETURNS TABLE(updated_user_id UUID, updated_user_email TEXT, updated_user_name TEXT) AS $$
DECLARE
 updated_profile RECORD;
BEGIN
  INSERT INTO profiles (id, email, name, updated_at)
 VALUES (p_user_id, p_email, p_name, NOW())
  ON CONFLICT (id)
 DO UPDATE SET
     name = EXCLUDED.name,
     email = EXCLUDED.email,
     updated_at = EXCLUDED.updated_at
 RETURNING profiles.id, profiles.email, profiles.name INTO updated_profile;

 RETURN QUERY SELECT updated_profile.id, updated_profile.email, updated_profile.name;
END;
$$ LANGUAGE plpgsql;

-- Функция для получения профиля пользователя
CREATE OR REPLACE FUNCTION get_user_profile(p_user_id UUID)
RETURNS TABLE(user_id UUID, user_email TEXT, user_name TEXT, user_role TEXT, user_progress JSONB) AS $$
BEGIN
  RETURN QUERY
    SELECT p.id, p.email, p.name, p.role, p.progress
    FROM profiles p
    WHERE p.id = p_user_id;
END;
$$ LANGUAGE plpgsql;

-- Предоставляем права на выполнение функций
GRANT EXECUTE ON FUNCTION create_or_update_user_profile(UUID, TEXT, TEXT) TO anon, authenticated;