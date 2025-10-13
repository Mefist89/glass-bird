import { createClient } from '@supabase/supabase-js';

// Используем переменные из файла supabase.txt
const SUPABASE_URL = 'https://vdyujjhszhxjperzsuuy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkeXVqamhzemh4anBlcnpzdXV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwNTUyOTQsImV4cCI6MjA3NTYzMTI5NH0.qBjtFVgAG0arg0jYSpwgizK5CnNXRHH4S4TtFpLgYrU';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface UserRegistrationData {
  name: string;
  email: string;
  password: string;
}

interface UserRegistrationResponse {
  id: string;
  email: string;
 name: string;
}

/**
 * Регистрация нового пользователя
 * @param userData Данные пользователя для регистрации
 * @returns Объект с информацией о зарегистрированном пользователе
 */
export const registerUser = async (userData: UserRegistrationData): Promise<UserRegistrationResponse> => {
  try {
    // Регистрируем пользователя в Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
    });

    if (authError) {
      throw new Error(authError.message);
    }

    // Если аутентификация прошла успешно, сохраняем дополнительные данные в таблице profiles
    if (authData.user) {
      // Создаем запись в таблице profiles
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .insert([{
          id: authData.user.id,
          email: userData.email,
          name: userData.name,
        }])
        .select()
        .single();

      if (profileError) {
        // Если не удалось создать профиль, удаляем пользователя из аутентификации
        await supabase.auth.admin.deleteUser(authData.user.id);
        throw new Error(`Ошибка создания профиля пользователя: ${profileError.message}`);
      }

      return {
        id: profileData.id,
        email: profileData.email,
        name: profileData.name,
      };
    } else {
      throw new Error('Не удалось завершить регистрацию пользователя');
    }
  } catch (error) {
    console.error('Ошибка регистрации пользователя:', error);
    throw error;
 }
};

/**
 * Вход пользователя в систему
 * @param email Email пользователя
 * @param password Пароль пользователя
 * @returns Объект с информацией о пользователе или ошибкой
 */
export const loginUser = async (email: string, password: string): Promise<any> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
 } catch (error) {
    console.error('Ошибка входа пользователя:', error);
    throw error;
 }
};

/**
 * Выход пользователя из системы
 */
export const logoutUser = async (): Promise<void> => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw new Error(error.message);
    }
 } catch (error) {
    console.error('Ошибка выхода пользователя:', error);
    throw error;
 }
};

/**
 * Получение текущего пользователя
 */
export const getCurrentUser = async () => {
 try {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      // Получаем также данные профиля из таблицы profiles
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error('Ошибка получения профиля пользователя:', error);
        return { ...user, profile: null };
      }
      
      return { ...user, profile };
    }
    return null;
  } catch (error) {
    console.error('Ошибка получения текущего пользователя:', error);
    return null;
  }
};

export default supabase;