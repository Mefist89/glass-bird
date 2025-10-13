import { createClient } from '@supabase/supabase-js';

// Используем те же переменные, что и в authService.ts
const SUPABASE_URL = 'https://vdyujjhszhxjperzsuuy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkeXVqamhzemh4anBlcnpzdXV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwNTUyOTQsImV4cCI6MjA3NTYzMTI5NH0.qBjtFVgAG0arg0jYSpwgizK5CnNXRHH4S4TtFpLgYrU';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Отладка процесса регистрации
 */
export const debugRegistration = async () => {
  try {
    console.log('=== Начало отладки процесса регистрации ===');
    
    // 1. Проверим, существует ли таблица profiles и какова её структура
    console.log('1. Проверка структуры таблицы profiles...');
    const { data: tableInfo, error: tableInfoError } = await supabase
      .from('profiles')
      .select('id, email, name')
      .limit(1);

    if (tableInfoError) {
      console.log('Ошибка при получении информации о таблице:', tableInfoError.message);
    } else {
      console.log('Таблица profiles доступна, пример записи:', tableInfo?.[0] || 'пустая таблица');
    }

    // 2. Попробуем выполнить регистрацию тестового пользователя
    console.log('2. Регистрация тестового пользователя...');
    const testEmail = `test${Date.now()}@example.com`;
    const testName = 'Test User';
    const testPassword = 'TestPass123!';
    
    console.log(`Регистрируем пользователя: ${testEmail}`);
    
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
    });

    if (authError) {
      console.log('Ошибка при регистрации в Supabase Auth:', authError.message);
      return { success: false, error: authError.message };
    }

    console.log('Пользователь успешно зарегистрирован в Auth:', authData.user?.id);

    if (authData.user) {
      console.log('3. Попытка создания/обновления профиля...');
      
      // Проверим, существует ли уже профиль
      const { data: existingProfile, error: existingProfileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single();
        
      if (existingProfileError && existingProfileError.code !== 'PGRST116') { // PGRST116 означает "Row not found"
        console.log('Ошибка при проверке существующего профиля:', existingProfileError.message);
      } else if (existingProfile) {
        console.log('Профиль уже существует:', existingProfile);
      } else {
        console.log('Профиль не найден, будет создаваться новый');
      }

      // Попробуем выполнить upsert
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .upsert([{
          id: authData.user.id,
          email: testEmail,
          name: testName,
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (profileError) {
        console.log('Ошибка при создании/обновлении профиля:', profileError.message);
        console.log('Код ошибки:', profileError.code);
        
        // Попробуем удалить пользователя из аутентификации
        try {
          await supabase.auth.admin.deleteUser(authData.user.id);
          console.log('Тестовый пользователь удален из аутентификации');
        } catch (deleteError) {
          console.error('Ошибка при удалении тестового пользователя:', deleteError);
        }
        
        return { success: false, error: profileError.message };
      }

      console.log('Профиль успешно создан/обновлен:', profileData);
      
      // 4. Удалим тестового пользователя
      try {
        await supabase.auth.admin.deleteUser(authData.user.id);
        console.log('Тестовый пользователь успешно удален');
      } catch (deleteError) {
        console.error('Ошибка при удалении тестового пользователя:', deleteError);
      }
      
      return { success: true, profile: profileData };
    } else {
      console.log('Не удалось получить данные пользователя из Auth');
      return { success: false, error: 'Не удалось получить данные пользователя' };
    }
  } catch (error) {
    console.error('Ошибка в процессе отладки регистрации:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Неизвестная ошибка' };
  }
};

// Выполняем отладку
debugRegistration()
  .then(result => console.log('Результат отладки:', result))
  .catch(err => console.error('Ошибка выполнения отладки:', err));

export default supabase;