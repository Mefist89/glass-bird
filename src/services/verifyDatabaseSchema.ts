import { createClient } from '@supabase/supabase-js';

// Используем те же переменные, что и в authService.ts
const SUPABASE_URL = 'https://vdyujjhszhxjperzsuuy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkeXVqamhzemh4anBlcnpzdXV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwNTUyOTQsImV4cCI6MjA3NTYzMTI5NH0.qBjtFVgAG0arg0jYSpwgizK5CnNXRHH4S4TtFpLgYrU';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface SchemaVerificationResult {
  connection: {
    status: boolean;
    message: string;
 };
  tableExists: {
    status: boolean;
    message: string;
 };
  tableStructure: {
    status: boolean;
    message: string;
    details?: any;
  };
  foreignKeys: {
    status: boolean;
    message: string;
    details?: any;
  };
  indexes: {
    status: boolean;
    message: string;
    details?: any;
  };
  constraints: {
    status: boolean;
    message: string;
    details?: any;
  };
  functions: {
    status: boolean;
    message: string;
    details?: any;
  };
  triggers: {
    status: boolean;
    message: string;
    details?: any;
  };
  overallStatus: boolean;
  report: string;
}

/**
 * Проверка подключения к Supabase
 */
const checkConnection = async (): Promise<{ status: boolean; message: string }> => {
  try {
    console.log('Проверка подключения к Supabase...');
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);

    if (error) {
      return { status: false, message: `Ошибка подключения: ${error.message}` };
    }

    return { status: true, message: 'Подключение к Supabase успешно установлено' };
  } catch (error) {
    return { status: false, message: `Ошибка подключения: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}` };
  }
};

/**
 * Проверка существования таблицы profiles
 */
const checkTableExists = async (): Promise<{ status: boolean; message: string }> => {
  try {
    console.log('Проверка существования таблицы profiles...');
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_name', 'profiles')
      .eq('table_schema', 'public');

    if (error) {
      return { status: false, message: `Ошибка при проверке существования таблицы: ${error.message}` };
    }

    if (!data || data.length === 0) {
      return { status: false, message: 'Таблица profiles не существует в базе данных' };
    }

    return { status: true, message: 'Таблица profiles существует' };
  } catch (error) {
    return { status: false, message: `Ошибка при проверке существования таблицы: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}` };
  }
};

/**
 * Проверка структуры таблицы profiles
 */
const checkTableStructure = async (): Promise<{ status: boolean; message: string; details?: any }> => {
  try {
    console.log('Проверка структуры таблицы profiles...');
    
    // Получаем информацию о колонках таблицы
    const { data: columns, error: columnsError } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type, is_nullable, column_default')
      .eq('table_name', 'profiles')
      .eq('table_schema', 'public');

    if (columnsError) {
      return { status: false, message: `Ошибка при получении структуры таблицы: ${columnsError.message}`, details: columnsError };
    }

    if (!columns || columns.length === 0) {
      return { status: false, message: 'Не удалось получить информацию о структуре таблицы profiles', details: null };
    }

    // Ожидаемые колонки
    const expectedColumns = [
      { name: 'id', type: 'uuid', nullable: 'NO', default: null },
      { name: 'email', type: 'text', nullable: 'YES', default: null },
      { name: 'name', type: 'text', nullable: 'YES', default: "'User'::text" }, // Значение по умолчанию
      { name: 'role', type: 'text', nullable: 'YES', default: "'student'::text" },
      { name: 'enrolled_courses', type: 'ARRAY', nullable: 'YES', default: null },
      { name: 'progress', type: 'jsonb', nullable: 'YES', default: "'{}'::jsonb" },
      { name: 'created_at', type: 'timestamp with time zone', nullable: 'YES', default: 'now()' },
      { name: 'updated_at', type: 'timestamp with time zone', nullable: 'YES', default: null }
    ];

    const columnMap: { [key: string]: any } = {};
    columns.forEach(col => {
      columnMap[col.column_name] = {
        type: col.data_type,
        nullable: col.is_nullable,
        default: col.column_default
      };
    });

    const missingColumns: string[] = [];
    const incorrectColumns: string[] = [];

    for (const expected of expectedColumns) {
      const actual = columnMap[expected.name];
      if (!actual) {
        missingColumns.push(expected.name);
      } else {
        // Проверяем тип данных (частичное совпадение для некоторых типов)
        let typeMatch = false;
        if (expected.type === 'ARRAY') {
          typeMatch = actual.type.includes('array') || actual.type.includes('ARRAY') || actual.type.includes('text[]');
        } else {
          typeMatch = actual.type.toLowerCase().includes(expected.type.toLowerCase());
        }

        if (!typeMatch) {
          incorrectColumns.push(`Колонка ${expected.name}: ожидался тип ${expected.type}, найден ${actual.type}`);
        }

        // Проверяем nullability
        if (actual.nullable !== expected.nullable && !(expected.nullable === 'YES' && actual.nullable === 'NO')) {
          incorrectColumns.push(`Колонка ${expected.name}: ожидаемая nullability ${expected.nullable}, найдена ${actual.nullable}`);
        }

        // Проверяем значение по умолчанию
        if (expected.default && actual.default !== expected.default) {
          if (!(expected.name === 'name' && actual.default && actual.default.includes('User'))) {
            incorrectColumns.push(`Колонка ${expected.name}: ожидаемое значение по умолчанию ${expected.default}, найдено ${actual.default}`);
          }
        }
      }
    }

    if (missingColumns.length > 0) {
      return { 
        status: false, 
        message: `Отсутствующие колонки в таблице profiles: ${missingColumns.join(', ')}`, 
        details: { missing: missingColumns, incorrect: incorrectColumns } 
      };
    }

    if (incorrectColumns.length > 0) {
      return { 
        status: false, 
        message: `Некорректные колонки в таблице profiles: ${incorrectColumns.join(', ')}`, 
        details: { missing: missingColumns, incorrect: incorrectColumns } 
      };
    }

    return { 
      status: true, 
      message: 'Структура таблицы profiles соответствует ожидаемой', 
      details: { columns: columns.map(c => ({ name: c.column_name, type: c.data_type, nullable: c.is_nullable, default: c.column_default })) } 
    };
  } catch (error) {
    return { 
      status: false, 
      message: `Ошибка при проверке структуры таблицы: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`, 
      details: error 
    };
  }
};

/**
 * Проверка внешних ключей
 */
const checkForeignKeys = async (): Promise<{ status: boolean; message: string; details?: any }> => {
  try {
    console.log('Проверка внешних ключей...');
    
    // Проверим, что есть внешний ключ на auth.users
    // Для этого нужно проверить pg_constraint напрямую
    const { data: pgFkDetails, error: pgFkError } = await supabase
      .from('pg_constraint')
      .select(`
        conname as constraint_name,
        conrelid::regclass as table_name,
        confrelid::regclass as foreign_table_name
      `)
      .eq('conrelid::regclass', 'profiles');
    
    if (pgFkError) {
      return { status: false, message: `Ошибка при проверке внешних ключей: ${pgFkError.message}`, details: pgFkError };
    }
    
    let hasAuthUsersForeignKey = false;
    if (pgFkDetails) {
      hasAuthUsersForeignKey = pgFkDetails.some((fk: any) =>
        fk.foreign_table_name === 'auth.users' || fk.foreign_table_name === 'users'
      );
    }
    
    if (!hasAuthUsersForeignKey) {
      return {
        status: false,
        message: 'Внешний ключ id -> auth.users не найден в таблице profiles',
        details: {
          expected: 'profiles.id -> auth.users.id',
          found_constraints: pgFkDetails
        }
      };
    }
    
    return {
      status: true,
      message: 'Внешние ключи для таблицы profiles корректны',
      details: pgFkDetails
    };
  } catch (error) {
    return {
      status: false,
      message: `Ошибка при проверке внешних ключей: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`,
      details: error
    };
  }
};

/**
 * Проверка индексов
 */
const checkIndexes = async (): Promise<{ status: boolean; message: string; details?: any }> => {
  try {
    console.log('Проверка индексов...');
    
    // Получаем информацию об индексах для таблицы profiles
    const { data: indexes, error: indexesError } = await supabase
      .from('pg_indexes')
      .select('indexname, tablename, indexdef')
      .ilike('tablename', 'profiles');

    if (indexesError) {
      return { status: false, message: `Ошибка при получении информации об индексах: ${indexesError.message}`, details: indexesError };
    }

    if (!indexes) {
      return { 
        status: false, 
        message: 'Не удалось получить информацию об индексах для таблицы profiles', 
        details: null 
      };
    }

    // Ожидаемые индексы
    const expectedIndexes = [
      'idx_profiles_email',  // индекс по email
      'idx_profiles_created_at'  // индекс по дате создания
    ];

    // Проверяем, есть ли ожидаемые индексы (с частичным совпадением по названию)
    const foundIndexNames = indexes.map(idx => idx.indexname);
    const missingIndexes = expectedIndexes.filter(expected => 
      !foundIndexNames.some(found => found.toLowerCase().includes(expected.toLowerCase().replace('idx_', '').replace('profiles_', ''))
    ));

    if (missingIndexes.length > 0) {
      return { 
        status: false, 
        message: `Отсутствующие индексы: ${missingIndexes.join(', ')}`, 
        details: { expected: expectedIndexes, found: foundIndexNames } 
      };
    }

    // Также проверим, что индекс на email существует (даже если он создан автоматически для UNIQUE)
    const hasEmailIndex = indexes.some(idx => 
      idx.indexdef.toLowerCase().includes('email') || 
      idx.indexname.toLowerCase().includes('email') ||
      idx.indexdef.toLowerCase().includes('unique') // уникальное ограничение создает индекс
    );

    if (!hasEmailIndex) {
      return { 
        status: false, 
        message: 'Отсутствует индекс для поля email (может быть автоматически создан уникальным ограничением)', 
        details: { found: foundIndexNames } 
      };
    }

    return { 
      status: true, 
      message: 'Индексы для таблицы profiles корректны', 
      details: indexes.map(idx => ({ name: idx.indexname, definition: idx.indexdef })) 
    };
  } catch (error) {
    return { 
      status: false, 
      message: `Ошибка при проверке индексов: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`, 
      details: error 
    };
  }
};

/**
 * Проверка ограничений
 */
const checkConstraints = async (): Promise<{ status: boolean; message: string; details?: any }> => {
  try {
    console.log('Проверка ограничений...');
    
    // Получаем информацию об ограничениях для таблицы profiles
    const { data: constraints, error: constraintsError } = await supabase
      .from('information_schema.table_constraints')
      .select('constraint_name, constraint_type, table_name')
      .eq('table_name', 'profiles');

    if (constraintsError) {
      return { status: false, message: `Ошибка при получении информации об ограничениях: ${constraintsError.message}`, details: constraintsError };
    }

    if (!constraints) {
      return { 
        status: false, 
        message: 'Не удалось получить информацию об ограничениях для таблицы profiles', 
        details: null 
      };
    }

    // Проверяем наличие основных типов ограничений
    const constraintTypes = constraints.map(c => c.constraint_type);
    const hasPrimaryKey = constraintTypes.includes('PRIMARY KEY');
    const hasUnique = constraintTypes.some(type => type.includes('UNIQUE'));
    
    // Проверяем уникальность email
    const { data: uniqueColumns, error: uniqueError } = await supabase
      .from('information_schema.constraint_column_usage')
      .select('column_name')
      .in('constraint_name', constraints.filter(c => c.constraint_type.includes('UNIQUE')).map(c => c.constraint_name));
    
    let hasEmailUniqueConstraint = false;
    if (!uniqueError && uniqueColumns) {
      hasEmailUniqueConstraint = uniqueColumns.some(col => col.column_name === 'email');
    }

    const issues: string[] = [];
    if (!hasPrimaryKey) {
      issues.push('Отсутствует PRIMARY KEY');
    }
    if (!hasEmailUniqueConstraint) {
      issues.push('Отсутствует UNIQUE ограничение для поля email');
    }

    if (issues.length > 0) {
      return { 
        status: false, 
        message: `Нарушения ограничений: ${issues.join(', ')}`, 
        details: { constraints, issues } 
      };
    }

    return { 
      status: true, 
      message: 'Ограничения для таблицы profiles корректны', 
      details: constraints 
    };
  } catch (error) {
    return { 
      status: false, 
      message: `Ошибка при проверке ограничений: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`, 
      details: error 
    };
  }
};

/**
 * Проверка функций
 */
const checkFunctions = async (): Promise<{ status: boolean; message: string; details?: any }> => {
  try {
    console.log('Проверка функций...');
    
    // Получаем информацию о функциях
    const { data: functions, error: functionsError } = await supabase
      .from('information_schema.routines')
      .select('routine_name, routine_type')
      .eq('routine_schema', 'public')
      .ilike('routine_name', '%profile%');

    if (functionsError) {
      return { status: false, message: `Ошибка при получении информации о функциях: ${functionsError.message}`, details: functionsError };
    }

    // Ожидаемые функции
    const expectedFunctions = [
      'update_user_profile',
      'get_user_profile', 
      'get_user_course_progress',
      'update_user_course_progress'
    ];

    if (!functions) {
      return { 
        status: false, 
        message: 'Не удалось получить информацию о функциях', 
        details: null 
      };
    }

    const foundFunctionNames = functions.map(f => f.routine_name);
    const missingFunctions = expectedFunctions.filter(expected => 
      !foundFunctionNames.some(found => found.toLowerCase().includes(expected.toLowerCase()))
    );

    if (missingFunctions.length > 0) {
      return { 
        status: false, 
        message: `Отсутствующие функции: ${missingFunctions.join(', ')}`, 
        details: { expected: expectedFunctions, found: foundFunctionNames } 
      };
    }

    return { 
      status: true, 
      message: 'Функции для управления профилями существуют', 
      details: functions.filter(f => f.routine_type === 'FUNCTION').map(f => f.routine_name) 
    };
  } catch (error) {
    return { 
      status: false, 
      message: `Ошибка при проверке функций: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`, 
      details: error 
    };
  }
};

/**
 * Проверка триггеров
 */
const checkTriggers = async (): Promise<{ status: boolean; message: string; details?: any }> => {
  try {
    console.log('Проверка триггеров...');
    
    // Получаем информацию о триггерах для таблицы profiles
    const { data: triggers, error: triggersError } = await supabase
      .from('information_schema.triggers')
      .select('trigger_name, event_manipulation, event_object_table')
      .eq('event_object_table', 'profiles');
 
    if (triggersError) {
      // Пробуем альтернативный способ через pg_trigger
      const { data: pgTriggers, error: pgTriggersError } = await supabase
        .from('pg_trigger')
        .select('tgname, tgrelid')
        .ilike('tgrelid::regclass::text', 'profiles');
        
      if (pgTriggersError) {
        return { status: false, message: `Ошибка при получении информации о триггерах: ${pgTriggersError.message}`, details: pgTriggersError };
      }
      
      if (!pgTriggers) {
        return {
          status: false,
          message: 'Не удалось получить информацию о триггерах',
          details: null
        };
      }

      // Ожидаемый триггер
      const expectedTrigger = 'on_auth_user_created';
      const foundTriggerNames = pgTriggers.map(t => t.tgname);
      const hasExpectedTrigger = foundTriggerNames.some(name => name.toLowerCase().includes(expectedTrigger.toLowerCase()));
 
      if (!hasExpectedTrigger) {
        return {
          status: false,
          message: `Ожидаемый триггер ${expectedTrigger} не найден. Найденные триггеры: ${foundTriggerNames.join(', ')}`,
          details: { expected: expectedTrigger, found: foundTriggerNames }
        };
      }

      return {
        status: true,
        message: 'Триггеры для управления профилями существуют',
        details: pgTriggers.map(t => ({ name: t.tgname, table: t.tgrelid }))
      };
    }
 
    if (!triggers) {
      return {
        status: false,
        message: 'Не удалось получить информацию о триггерах',
        details: null
      };
    }
 
    // Ожидаемый триггер
    const expectedTrigger = 'on_auth_user_created';
    const foundTriggerNames = triggers.map(t => t.trigger_name);
    const hasExpectedTrigger = foundTriggerNames.some(name => name.toLowerCase().includes(expectedTrigger.toLowerCase()));
 
    if (!hasExpectedTrigger) {
      return {
        status: false,
        message: `Ожидаемый триггер ${expectedTrigger} не найден. Найденные триггеры: ${foundTriggerNames.join(', ')}`,
        details: { expected: expectedTrigger, found: foundTriggerNames }
      };
    }
 
    return {
      status: true,
      message: 'Триггеры для управления профилями существуют',
      details: triggers.map(t => ({ name: t.trigger_name, event: t.event_manipulation, table: t.event_object_table }))
    };
  } catch (error) {
    return {
      status: false,
      message: `Ошибка при проверке триггеров: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`,
      details: error
    };
  }
};

/**
 * Основная функция проверки схемы базы данных
 */
export const verifyDatabaseSchema = async (): Promise<SchemaVerificationResult> => {
  console.log('=== Начало проверки схемы базы данных ===');
  
  const connection = await checkConnection();
  if (!connection.status) {
    console.log('❌ Подключение к базе данных не установлено. Прекращение проверки.');
    return {
      connection,
      tableExists: { status: false, message: 'Проверка не выполнена из-за ошибки подключения' },
      tableStructure: { status: false, message: 'Проверка не выполнена из-за ошибки подключения' },
      foreignKeys: { status: false, message: 'Проверка не выполнена из-за ошибки подключения' },
      indexes: { status: false, message: 'Проверка не выполнена из-за ошибки подключения' },
      constraints: { status: false, message: 'Проверка не выполнена из-за ошибки подключения' },
      functions: { status: false, message: 'Проверка не выполнена из-за ошибки подключения' },
      triggers: { status: false, message: 'Проверка не выполнена из-за ошибки подключения' },
      overallStatus: false,
      report: `Проверка схемы базы данных не выполнена: ${connection.message}`
    };
  }

  const tableExists = await checkTableExists();
  const tableStructure = await checkTableStructure();
  const foreignKeys = await checkForeignKeys();
  const indexes = await checkIndexes();
  const constraints = await checkConstraints();
  const functions = await checkFunctions();
  const triggers = await checkTriggers();

  const allChecksPassed = [
    connection.status,
    tableExists.status,
    tableStructure.status,
    foreignKeys.status,
    indexes.status,
    constraints.status,
    functions.status,
    triggers.status
  ].every(status => status === true);

  const report = `
# Отчет о проверке схемы базы данных

## Статус подключения
- Статус: ${connection.status ? '✅ Подключено' : '❌ Ошибка'}
- Сообщение: ${connection.message}

## Существование таблицы
- Статус: ${tableExists.status ? '✅ Существует' : '❌ Не существует'}
- Сообщение: ${tableExists.message}

## Структура таблицы
- Статус: ${tableStructure.status ? '✅ Корректна' : '❌ Ошибки'}
- Сообщение: ${tableStructure.message}

## Внешние ключи
- Статус: ${foreignKeys.status ? '✅ Корректны' : '❌ Ошибки'}
- Сообщение: ${foreignKeys.message}

## Индексы
- Статус: ${indexes.status ? '✅ Корректны' : '❌ Ошибки'}
- Сообщение: ${indexes.message}

## Ограничения
- Статус: ${constraints.status ? '✅ Корректны' : '❌ Ошибки'}
- Сообщение: ${constraints.message}

## Функции
- Статус: ${functions.status ? '✅ Существуют' : '❌ Отсутствуют'}
- Сообщение: ${functions.message}

## Триггеры
- Статус: ${triggers.status ? '✅ Существуют' : '❌ Отсутствуют'}
- Сообщение: ${triggers.message}

## Общий статус
- Схема базы данных: ${allChecksPassed ? '✅ Полностью корректна' : '❌ Требует исправлений'}

${allChecksPassed 
  ? '✅ Все проверки пройдены успешно. Схема базы данных соответствует ожидаемой.' 
  : '❌ Обнаружены расхождения между ожидаемой и фактической схемой базы данных.'}
`;

  console.log('=== Проверка схемы базы данных завершена ===');
  
  return {
    connection,
    tableExists,
    tableStructure,
    foreignKeys,
    indexes,
    constraints,
    functions,
    triggers,
    overallStatus: allChecksPassed,
    report
  };
};

// Выполняем проверку при импорте модуля
verifyDatabaseSchema()
  .then(result => {
    console.log('\nСгенерированный отчет:');
    console.log(result.report);
    
    if (!result.overallStatus) {
      console.log('\nРекомендации:');
      console.log('- Проверьте, что SQL-скрипт supabase_auth_complete.sql был выполнен в базе данных');
      console.log('- Убедитесь, что все зависимости и расширения установлены');
      console.log('- При необходимости выполните скрипт complete_fix.sql для исправления структуры');
    }
  })
  .catch(error => {
    console.error('Ошибка при выполнении проверки схемы:', error);
  });

export default supabase;