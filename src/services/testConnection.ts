import supabase from './authService.ts';

const testConnection = async () => {
  try {
    console.log('Проверка подключения к базе данных...');
    
    // Попытка выполнить простой запрос к базе данных
    const { data, error } = await supabase
      .from('profiles') // предполагаем, что таблица profiles существует
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

// Запуск проверки подключения
testConnection()
  .then(success => {
    if (success) {
      console.log('Проверка подключения завершена успешно');
    } else {
      console.log('Проверка подключения выявила проблемы');
    }
  })
  .catch(error => {
    console.error('Критическая ошибка при проверке подключения:', error);
  });