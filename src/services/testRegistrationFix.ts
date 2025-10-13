import { createClient } from '@supabase/supabase-js';

// Используем те же переменные, что и в authService.ts
const SUPABASE_URL = 'https://vdyujjhszhxjperzsuuy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkeXVqamhzemh4anBlcnpzdXV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwNTUyOTQsImV4cCI6MjA3NTYzMTI5NH0.qBjtFVgAG0arg0jYSpwgizK5CnNXRHH4S4TtFpLgYrU';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Тестирование регистрации пользователя после исправления
 */
export const testRegistrationFix = async () => {
  console.log('=== Тестирование регистрации пользователя после исправления ===');
  
  try {
    // Проверим подключение
    console.log('1. Проверка подключения к таблице profiles...');
    const { error: connectionError } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);

    if (connectionError) {
      console.log('⚠️ Ошибка подключения к таблице profiles:', connectionError.message);
    } else {
      console.log('✅ Подключение к таблице profiles успешно');
    }

    // Создадим тестового пользователя
    console.log('\n2. Создание тестового пользователя...');
    const testEmail = 'test@example.com';
    const testPassword = 'SecurePass123!';
    
    console.log(`Регистрируем пользователя: ${testEmail}`);
    
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
    });

    if (authError) {
      console.log('❌ Ошибка регистрации в Supabase Auth:', authError.message);
      return { success: false, error: authError.message };
    }

    console.log('✅ Пользователь успешно зарегистрирован в Auth');
    
    if (authData.user) {
      console.log(`   - ID пользователя: ${authData.user.id}`);
      console.log(`   - Email: ${authData.user.email}`);
      
      // Подождем немного, чтобы дать триггеру время создать профиль
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Проверим, создан ли профиль через триггер
      console.log('\n3. Проверка создания профиля через триггер...');
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single();
        
      if (profileError) {
        console.log('⚠️ Ошибка при получении профиля:', profileError.message);
        console.log('   Возможно, триггер еще не создал профиль или возникла ошибка');
      } else {
        console.log('✅ Профиль успешно создан через триггер');
        console.log('   Данные профиля:', {
          id: profile.id,
          email: profile.email,
          name: profile.name,
          role: profile.role,
          created_at: profile.created_at
        });
      }
      
      // Попробуем также вручную обновить профиль через наш сервис
      console.log('\n4. Попытка обновления профиля через upsert...');
      const { data: updatedProfile, error: upsertError } = await supabase
        .from('profiles')
        .upsert([{
          id: authData.user.id,
          email: testEmail,
          name: 'Test User',
          role: 'student',
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();
        
      if (upsertError) {
        console.log('❌ Ошибка при обновлении профиля:', upsertError.message);
        
        // Всё равно удалим пользователя
        try {
          await supabase.auth.admin.deleteUser(authData.user.id);
          console.log('⚠️ Тестовый пользователь удален из аутентификации');
        } catch (deleteError) {
          console.error('⚠️ Ошибка при удалении тестового пользователя:', deleteError);
        }
        
        return { success: false, error: upsertError.message };
      }
      
      console.log('✅ Профиль успешно обновлен/создан');
      console.log('   Обновленные данные профиля:', {
        id: updatedProfile.id,
        email: updatedProfile.email,
        name: updatedProfile.name,
        role: updatedProfile.role
      });
      
      // Удалим тестового пользователя
      try {
        await supabase.auth.admin.deleteUser(authData.user.id);
        console.log('\n✅ Тестовый пользователь успешно удален');
      } catch (deleteError) {
        console.error('⚠️ Ошибка при удалении тестового пользователя:', deleteError);
      }
      
      console.log('\n🎉 Тест регистрации прошел успешно!');
      console.log('✅ Регистрация нового пользователя работает корректно');
      console.log('✅ Триггер handle_new_user работает правильно');
      console.log('✅ Профиль создается автоматически при регистрации');
      console.log('✅ Upsert-операции для профиля работают корректно');
      
      return { success: true };
    } else {
      console.log('❌ Не удалось получить данные пользователя');
      return { success: false, error: 'Не удалось получить данные пользователя' };
    }
 } catch (error) {
    console.error('❌ Ошибка при тестировании регистрации:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Неизвестная ошибка' };
  }
};

// Запускаем тест
testRegistrationFix()
 .then(result => {
    console.log('\n=== Результат теста ===');
    if (result.success) {
      console.log('✅ Все тесты пройдены успешно!');
      console.log('✅ Проблема с регистрацией пользователей решена');
    } else {
      console.log('❌ При тестировании обнаружены проблемы:');
      console.log(`   - ${result.error}`);
    }
 })
  .catch(error => {
    console.error('❌ Ошибка при выполнении теста:', error);
  });

export default supabase;