import { createClient } from '@supabase/supabase-js';

// Используем те же переменные, что и в authService.ts
const SUPABASE_URL = 'https://vdyujjhszhxjperzsuuy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkeXVqamhzemh4anBlcnpzdXV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwNTUyOTQsImV4cCI6MjA3NTYzMTI5NH0.qBjtFVgAG0arg0jYSpwgizK5CnNXRHH4S4TtFpLgYrU';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Тестовое подключение к Supabase
 */
export const testSupabaseConnection = async () => {
 try {
    console.log('Попытка подключения к Supabase...');
    
    // Проверим, можем ли мы выполнить простой запрос к базе данных
    // Выполним запрос к таблице profiles (если она существует)
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);

    if (error) {
      console.log('Подключение к Supabase установлено, но возникла ошибка при запросе к таблице profiles:');
      console.log('Ошибка:', error.message);
      console.log('Код ошибки:', error.code);
      return { connected: false, error: error.message, code: error.code };
    }

    console.log('Подключение к Supabase успешно!');
    console.log('Запрос к таблице profiles выполнен успешно');
    console.log('Данные:', data);
    
    // Также проверим аутентификацию
    const { data: { user } } = await supabase.auth.getUser();
    console.log('Аутентификация работает, текущий пользователь:', user ? user.email : 'не авторизован');
    
    return { connected: true, data, user: user ? user.email : null };
  } catch (error) {
    console.error('Ошибка при подключении к Supabase:', error);
    return { connected: false, error: error instanceof Error ? error.message : 'Неизвестная ошибка' };
  }
};

// Выполняем тест при импорте модуля
testSupabaseConnection();

export default supabase;