import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

const app = express();
const PORT = process.env.PORT || 3001;

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

// Middleware
app.use(cors());
app.use(express.json());

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
const registerUserOnServer = async (
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

// Endpoint для регистрации пользователя
app.post('/api/auth/register', async (req: any, res: any) => {
  try {
    const { name, email, password } = req.body;

    // Проверяем обязательные поля
    if (!name || !email || !password) {
      return res.status(400).json({ 
        error: 'Имя, email и пароль обязательны для регистрации' 
      });
    }

    // Регистрируем пользователя
    const userData = { name, email, password };
    const user = await registerUserOnServer(userData);

    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Ошибка при регистрации пользователя:', error);
    res.status(500).json({ 
      error: error.message || 'Ошибка при регистрации пользователя' 
    });
  }
});

// Простой health check endpoint
app.get('/api/health', (req: any, res: any) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Сервер аутентификации запущен на порту ${PORT}`);
});

export default app;