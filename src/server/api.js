import express from 'express';
import cors from 'cors';
import { registerUserOnServer } from '../services/userRegistrationService.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint для регистрации пользователя
app.post('/api/auth/register', async (req, res) => {
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
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Сервер аутентификации запущен на порту ${PORT}`);
});

module.exports = app;