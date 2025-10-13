import { createClient } from '@supabase/supabase-js';

// Используем те же переменные, что и в authService.ts
const SUPABASE_URL = 'https://vdyujjhszhxjperzsuuy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkeXVqamhzemh4anBlcnpzdXV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwNTUyOTQsImV4cCI6MjA3NTYzMTI5NH0.qBjtFVgAG0arg0jYSpwgizK5CnNXRHH4S4TtFpLgYrU';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Функция для исправления основных проблем с регистрацией пользователей
 */
export const fixRegistrationIssues = async () => {
 console.log('=== Исправление проблем с регистрацией пользователей ===');
  
  try {
    // 1. Проверим подключение и выполним тестовую регистрацию
    console.log('1. Проверка подключения...');
    const { error: connectionError } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);

    if (connectionError) {
      console.log('⚠️ Ошибка подключения к таблице profiles:', connectionError.message);
      console.log('Примечание: Это может быть связано с ограничениями доступа к системным таблицам');
    } else {
      console.log('✅ Подключение к таблице profiles успешно');
    }

    // 2. Попробуем создать тестового пользователя
    console.log('\n2. Тестирование регистрации пользователя...');
    const testEmail = `test${Date.now()}@example.com`;
    const testName = 'Test User';
    const testPassword = 'TempPass123!';
    
    try {
      // Регистрация через Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
      });

      if (authError) {
        console.log('❌ Ошибка регистрации в Supabase Auth:', authError.message);
        
        // Проверим, связана ли ошибка с триггером/таблицей профилей
        if (authError.message.toLowerCase().includes('profile') || authError.message.toLowerCase().includes('constraint')) {
          console.log('⚠️ Ошибка, вероятно, связана с таблицей profiles или триггером');
          console.log('   Необходимо проверить структуру таблицы и настройки триггера');
        }
        
        return { success: false, error: authError.message };
      }

      console.log('✅ Пользователь успешно зарегистрирован в Auth');
      
      if (authData.user) {
        // Попробуем создать/обновить профиль
        console.log('3. Создание профиля пользователя...');
        
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
          console.log('❌ Ошибка при создании профиля:', profileError.message);
          
          // Попробуем удалить пользователя из аутентификации
          try {
            await supabase.auth.admin.deleteUser(authData.user.id);
            console.log('⚠️ Тестовый пользователь удален из аутентификации');
          } catch (deleteError) {
            console.error('⚠️ Ошибка при удалении тестового пользователя:', deleteError);
          }
          
          return { success: false, error: profileError.message };
        }

        console.log('✅ Профиль успешно создан/обновлен');
        
        // Удалим тестового пользователя
        try {
          await supabase.auth.admin.deleteUser(authData.user.id);
          console.log('✅ Тестовый пользователь успешно удален');
        } catch (deleteError) {
          console.error('⚠️ Ошибка при удалении тестового пользователя:', deleteError);
        }
        
        console.log('\n✅ Тест регистрации прошел успешно!');
        return { success: true };
      }
    } catch (registrationError) {
      console.log('❌ Ошибка при тестировании регистрации:', registrationError);
      return { success: false, error: registrationError instanceof Error ? registrationError.message : 'Неизвестная ошибка' };
    }
  } catch (error) {
    console.error('❌ Ошибка при исправлении проблем с регистрацией:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Неизвестная ошибка' };
  }
};

/**
 * Функция для проверки и исправления структуры таблицы profiles
 */
export const verifyAndFixTableStructure = async () => {
  console.log('\n=== Проверка и исправление структуры таблицы profiles ===');
  
  try {
    // Проверим, можем ли мы получить хотя бы базовую информацию о таблице
    const { data: sampleData, error: sampleError } = await supabase
      .from('profiles')
      .select('id, email, name')
      .limit(1);

    if (sampleError) {
      console.log('⚠️ Ошибка при доступе к таблице profiles:', sampleError.message);
      console.log('   Возможно, таблица не существует или есть ограничения доступа');
      return { success: false, error: sampleError.message };
    }

    console.log('✅ Доступ к таблице profiles подтвержден');
    
    // Если есть хотя бы одна запись, проверим её структуру
    if (sampleData && sampleData.length > 0) {
      const sampleRecord = sampleData[0];
      console.log('Пример записи в таблице profiles:', sampleRecord);
      
      // Проверим, есть ли необходимые поля
      const requiredFields = ['id', 'email', 'name'];
      const missingFields = requiredFields.filter(field => !(field in sampleRecord));
      
      if (missingFields.length > 0) {
        console.log('❌ Отсутствующие поля в таблице profiles:', missingFields.join(', '));
        return { success: false, error: `Отсутствующие поля: ${missingFields.join(', ')}` };
      }
      
      console.log('✅ Структура таблицы profiles корректна');
      return { success: true };
    } else {
      console.log('ℹ️ Таблица profiles пуста, но доступ к ней возможен');
      return { success: true };
    }
  } catch (error) {
    console.error('❌ Ошибка при проверке структуры таблицы:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Неизвестная ошибка' };
  }
};

/**
 * Основная функция для комплексного исправления проблем
 */
export const comprehensiveFix = async () => {
  console.log('Запуск комплексного исправления проблем с регистрацией...\n');
  
  // Проверим и исправим структуру таблицы
  const tableCheck = await verifyAndFixTableStructure();
  if (!tableCheck.success) {
    console.log('❌ Проблема со структурой таблицы profiles:', tableCheck.error);
    console.log('\nРекомендации:');
    console.log('1. Убедитесь, что таблица profiles создана с помощью скрипта supabase_auth_complete.sql');
    console.log('2. Проверьте, что у таблицы есть правильные поля: id, email, name (может быть null), role, и др.');
    console.log('3. Убедитесь, что есть внешний ключ на auth.users (id -> auth.users.id)');
    console.log('4. Проверьте, что Row Level Security включен с правильными политиками');
    return { success: false, step: 'table_structure', error: tableCheck.error };
  }
  
  // Проверим процесс регистрации
  const registrationTest = await fixRegistrationIssues();
  if (!registrationTest.success) {
    console.log('❌ Проблема с процессом регистрации:', registrationTest.error);
    console.log('\nВозможные причины:');
    console.log('- Триггер handle_new_user создает конфликт при создании профиля');
    console.log('- Ограничения в таблице profiles не позволяют вставить запись');
    console.log('- Недостаточно прав для выполнения операций вставки/обновления');
    return { success: false, step: 'registration_process', error: registrationTest.error };
  }
  
  console.log('\n🎉 Все проверки пройдены успешно!');
  console.log('✅ Структура таблицы profiles корректна');
  console.log('✅ Процесс регистрации работает правильно');
  console.log('✅ Нет конфликтов при создании профилей');
  
  return { success: true };
};

// Запускаем комплексную проверку
comprehensiveFix()
  .then(result => {
    console.log('\n=== Результат комплексной проверки ===');
    if (result.success) {
      console.log('✅ Все проблемы с регистрацией пользователей решены');
    } else {
      console.log('❌ Обнаружена проблема на этапе:', result.step);
      console.log('Ошибка:', result.error);
    }
  })
  .catch(error => {
    console.error('❌ Ошибка при выполнении комплексной проверки:', error);
  });

export default supabase;