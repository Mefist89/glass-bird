-- Создание таблицы пользователей для аутентификации
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'student',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  email_verified BOOLEAN DEFAULT FALSE,
  last_login TIMESTAMPTZ,
  enrolled_courses TEXT[],
  progress JSONB DEFAULT '{}'
);

-- Индекс для email для ускорения поиска
CREATE INDEX IF NOT EXISTS idx_users_email ON users USING btree(email);

-- Индекс для активных пользователей
CREATE INDEX IF NOT EXISTS idx_users_active ON users USING btree(is_active);

-- Триггер для автоматического обновления поля updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at 
  BEFORE UPDATE ON users 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Функция для регистрации нового пользователя
CREATE OR REPLACE FUNCTION register_user(
  p_email TEXT,
  p_name TEXT,
  p_password_hash TEXT
)
RETURNS TABLE(created_user_id UUID, created_user_email TEXT, created_user_name TEXT) AS $$
DECLARE
 new_user_id UUID;
BEGIN
  -- Проверка, что пользователь с таким email не существует
  IF EXISTS(SELECT 1 FROM users WHERE email = p_email) THEN
    RAISE EXCEPTION 'Пользователь с таким email уже существует';
  END IF;

 -- Создание нового пользователя
  INSERT INTO users (email, name, password_hash)
  VALUES (p_email, p_name, p_password_hash)
  RETURNING id INTO new_user_id;

  -- Возврат информации о созданном пользователе
 RETURN QUERY SELECT new_user_id, p_email, p_name;
END;
$$ LANGUAGE plpgsql;

-- Функция для обновления пароля
CREATE OR REPLACE FUNCTION update_user_password(
  p_user_id UUID,
  p_new_password_hash TEXT
)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE users 
  SET password_hash = p_new_password_hash, 
      updated_at = NOW()
  WHERE id = p_user_id;
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- Роли для безопасности
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL PRIVILEGES ON TABLE users TO anon, authenticated;