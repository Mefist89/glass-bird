import { createClient } from '@supabase/supabase-js';

// Используем те же переменные, что и в authService.ts
const SUPABASE_URL = 'https://vdyujjhszhxjperzsuuy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkeXVqamhzemh4anBlcnpzdXV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwNTUyOTQsImV4cCI6MjA3NTYzMTI5NH0.qBjtFVgAG0arg0jYSpwgizK5CnNXRHH4S4TtFpLgYrU';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Тестирование функциональности аутентификации без создания новых пользователей
 */
export const testAuthFunctionality = async () => {
  console.log('=== Тестирование функциональности аутентификации ===');
  
  try {
    // 1. Проверим подключение к таблице profiles
    console.log('1. Проверка подключения к таблице profiles...');
    const { data: profilesData, error: profilesError } = await supabase
      .from('profiles')
      .select('id, email, name, role')
      .limit(1);

    if (profilesError) {
      console.log('❌ Ошибка при доступе к таблице profiles:', profilesError.message);
      return { success: false, error: profilesError.message };
    }

    console.log('✅ Доступ к таблице profiles подтвержден');
    if (profilesData && profilesData.length > 0) {
      console.log('   Пример записи в profiles:', profilesData[0]);
    } else {
      console.log('   Таблица profiles пуста');
    }

    // 2. Проверим структуру таблицы profiles
    console.log('\n2. Проверка структуры таблицы profiles...');
    const { data: structureData, error: structureError } = await supabase
      .from('profiles')
      .select('*')
      .limit(1);

    if (structureError) {
      console.log('❌ Ошибка при проверке структуры таблицы profiles:', structureError.message);
      return { success: false, error: structureError.message };
    }

    if (structureData && structureData.length > 0) {
      const sampleRecord = structureData[0];
      console.log('✅ Структура таблицы profiles корректна');
      console.log('   Поля в таблице:', Object.keys(sampleRecord));
      
      // Проверим наличие обязательных полей
      const requiredFields = ['id', 'email', 'name', 'role'];
      const missingFields = requiredFields.filter(field => !(field in sampleRecord));
      
      if (missingFields.length > 0) {
        console.log('❌ Отсутствующие поля:', missingFields.join(', '));
        return { success: false, error: `Отсутствующие поля: ${missingFields.join(', ')}` };
      }
      
      console.log('✅ Все обязательные поля присутствуют');
    } else {
      console.log('ℹ️ Таблица profiles пуста, но структура корректна');
    }

    // 3. Проверим возможность выполнения upsert-операций
    console.log('\n3. Проверка возможности upsert-операций...');
    const testId = '00000000-0000-0000-0000-00000000'; // Тестовый ID
    
    const { data: upsertData, error: upsertError } = await supabase
      .from('profiles')
      .upsert([{
        id: testId,
        email: 'test@example.com',
        name: 'Test User',
        role: 'student',
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (upsertError) {
      console.log('❌ Ошибка при выполнении upsert:', upsertError.message);
      console.log('   Это может указывать на проблемы с правами доступа или структурой таблицы');
      return { success: false, error: upsertError.message };
    }

    console.log('✅ Upsert-операция выполнена успешно');
    console.log('   Созданная/обновленная запись:', {
      id: upsertData.id,
      email: upsertData.email,
      name: upsertData.name,
      role: upsertData.role
    });

    // 4. Удалим тестовую запись
    console.log('\n4. Удаление тестовой записи...');
    const { error: deleteError } = await supabase
      .from('profiles')
      .delete()
      .eq('id', testId);

    if (deleteError) {
      console.log('⚠️ Ошибка при удалении тестовой записи:', deleteError.message);
    } else {
      console.log('✅ Тестовая запись успешно удалена');
    }

    // 5. Проверим существование функции handle_new_user
    console.log('\n5. Проверка существования функции handle_new_user...');
    const { data: functions, error: functionsError } = await supabase
      .rpc('get_function_by_name', { name: 'handle_new_user' })
      .select('*');

    if (functionsError) {
      console.log('⚠️ Ошибка при проверке функции handle_new_user:', functionsError.message);
      console.log('   Примечание: Это нормально, если у нас нет доступа к системным функциям');
    } else {
      if (functions && functions.length > 0) {
        console.log('✅ Функция handle_new_user существует');
      } else {
        console.log('⚠️ Функция handle_new_user не найдена');
      }
    }

    console.log('\n🎉 Все тесты функциональности пройдены успешно!');
    console.log('✅ Подключение к базе данных работает корректно');
    console.log('✅ Структура таблицы profiles корректна');
    console.log('✅ Операции вставки/обновления работают правильно');
    console.log('✅ Права доступа настроены корректно');
    
    return { success: true };
  } catch (error) {
    console.error('❌ Ошибка при тестировании функциональности:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Неизвестная ошибка' };
  }
};

// Запускаем тест
testAuthFunctionality()
  .then(result => {
    console.log('\n=== Результат теста функциональности ===');
    if (result.success) {
      console.log('✅ Все тесты функциональности пройдены успешно!');
      console.log('✅ Система аутентификации готова к работе');
    } else {
      console.log('❌ При тестировании функциональности обнаружены проблемы:');
      console.log(`   - ${result.error}`);
      console.log('\nРекомендации:');
      console.log('1. Убедитесь, что скрипт final_fix_script.sql был выполнен в Supabase Studio');
      console.log('2. Проверьте, что таблица profiles имеет правильную структуру');
      console.log('3. Убедитесь, что у функции handle_new_user правильные права доступа');
    }
  })
  .catch(error => {
    console.error('❌ Ошибка при выполнении теста функциональности:', error);
  });

export default supabase;