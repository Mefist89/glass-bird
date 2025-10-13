import { createClient } from '@supabase/supabase-js';

// Используем переменные из файла supabase.txt
const SUPABASE_URL = 'https://vdyujjhszhxjperzsuuy.supabase.co';
// Для серверной стороны можно использовать SERVICE_ROLE_KEY, но не в браузере
// В реальном приложении этот ключ должен быть передан из переменных окружения
const SUPABASE_SERVICE_ROLE_KEY = 'sb_secret_ln0p8-dwHLGBZU21rpbqgw_IRFFH546';

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
 }
});

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
 * Регистрация нового пользователя на серверной стороне
 * @param userData Данные пользователя для регистрации
 * @returns Объект с информацией о зарегистрированном пользователе
 */
export const registerUserOnServer = async (
  userData: UserRegistrationData
): Promise<UserRegistrationResponse> => {
  try {
    console.log('Начало регистрации пользователя на сервере:', userData.email);

    // Регистрируем пользователя в Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: userData.email,
      password: userData.password,
      email_confirm: true, // Подтверждаем email сразу
    });

    if (authError) {
      console.error('Ошибка при регистрации в Supabase Auth:', authError);
      throw new Error(`Ошибка при регистрации в Supabase Auth: ${authError.message}`);
    }

    console.log('Пользователь успешно зарегистрирован в Supabase Auth:', authData.user?.id);

    if (authData.user) {
      // Обновляем профиль в таблице profiles
      const { data: profileData, error: profileError } = await supabaseAdmin
        .from('profiles')
        .upsert({
          id: authData.user.id,
          email: userData.email,
          name: userData.name,
          updated_at: new Date().toISOString()
        })
        .eq('id', authData.user.id)
        .select()
        .single();

      if (profileError) {
        console.error('Ошибка при сохранении профиля в таблице profiles:', profileError);

        // Если не удалось создать/обновить профиль, удаляем пользователя из аутентификации
        try {
          await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
          console.log('Пользователь удален из аутентификации из-за ошибки профиля');
        } catch (deleteError) {
          console.error('Ошибка при удалении пользователя из аутентификации:', deleteError);
        }

        throw new Error(`Ошибка сохранения профиля пользователя: ${profileError.message}`);
      }

      console.log('Профиль успешно сохранен/обновлен:', profileData);

      return {
        id: profileData.id,
        email: profileData.email,
        name: profileData.name,
      };
    } else {
      throw new Error('Не удалось завершить регистрацию пользователя');
    }
  } catch (error) {
    console.error('Ошибка регистрации пользователя на сервере:', error);
    throw error;
  }
};

/**
 * Проверка подключения к базе данных на серверной стороне
 */
export const testServerConnection = async () => {
  try {
    console.log('Проверка подключения к базе данных на серверной стороне...');
    
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .limit(1);

    if (error) {
      console.error('Ошибка при подключении к базе данных:', error.message);
      return false;
    }

    console.log('Подключение к базе данных успешно установлено');
    console.log('Тестовый запрос выполнен, получено записей:', data?.length || 0);
    return true;
  } catch (error) {
    console.error('Ошибка при выполнении тестового запроса:', error);
    return false;
  }
};