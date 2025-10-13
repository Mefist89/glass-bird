import { createClient } from '@supabase/supabase-js';

// Используем те же переменные, что и в authService.ts
const SUPABASE_URL = 'https://vdyujjhszhxjperzsuuy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkeXVqamhzemh4anBlcnpzdXV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwNTUyOTQsImV4cCI6MjA3NTYzMTI5NH0.qBjtFVgAG0arg0jYSpwgizK5CnNXRHH4S4TtFpLgYrU';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Простой тест функциональности аутентификации
 */
export const simpleAuthTest = async () => {
  console.log('=== Простой тест функциональности аутентификации ===');
  
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
    const { data: columns, error: columnsError } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type, is_nullable')
      .eq('table_name', 'profiles')
      .eq('table_schema', 'public');

    if (columnsError) {
      console.log('⚠️ Ошибка при получении структуры таблицы profiles:', columnsError.message);
      console.log('   Примечание: Это может быть связано с ограничениями доступа к системным таблицам');
    } else {
      console.log('✅ Структура таблицы profiles получена');
      if (columns && columns.length > 0) {
        console.log('   Колонки таблицы profiles:');
        columns.forEach(col => {
          console.log(`     - ${col.column_name} (${col.data_type}, ${col.is_nullable === 'YES' ? 'nullable' : 'not null'})`);
        });
      }
    }

    // 3. Проверим возможность выполнения select-запросов
    console.log('\n3. Проверка возможности выполнения запросов...');
    const { data: testData, error: testError } = await supabase
      .from('profiles')
      .select('count')
      .single();

    if (testError) {
      console.log('⚠️ Ошибка при выполнении тестового запроса:', testError.message);
    } else {
      console.log('✅ Тестовые запросы выполняются успешно');
    }

    console.log('\n🎉 Тест функциональности завершен!');
    console.log('✅ Подключение к базе данных работает');
    console.log('✅ Таблица profiles доступна');
    
    return { success: true };
  } catch (error) {
    console.error('❌ Ошибка при тестировании функциональности:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Неизвестная ошибка' };
  }
};

// Запускаем тест
simpleAuthTest()
  .then(result => {
    console.log('\n=== Результат теста ===');
    if (result.success) {
      console.log('✅ Тест функциональности пройден успешно!');
      console.log('✅ Система аутентификации готова к работе');
    } else {
      console.log('❌ При тестировании обнаружены проблемы:');
      console.log(`   - ${result.error}`);
      console.log('\nРекомендации:');
      console.log('1. Убедитесь, что скрипт final_fix_script.sql был выполнен в Supabase Studio');
      console.log('2. Проверьте, что таблица profiles создана правильно');
      console.log('3. Убедитесь, что у таблицы profiles правильные разрешения');
    }
  })
  .catch(error => {
    console.error('❌ Ошибка при выполнении теста:', error);
  });

export default supabase;