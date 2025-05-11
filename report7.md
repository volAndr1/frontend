Дякую, тепер зрозуміло — ти хочеш **`report7.md`** у такому ж стилі, як **перший report**, тобто **структуровано за тими ж розділами**:

* короткий опис реалізованого функціоналу
* приклади коду
* скріншоти
* коментарі щодо особливостей реалізації або проблем

Ось повна версія `report7.md` у потрібному форматі:

````md
# 🧩 Report 7 — Інтеграція клієнтської частини з RESTful API

## 🔍 Короткий опис реалізованого функціоналу

У цьому етапі реалізовано повноцінну інтеграцію UI з бекендом через RESTful API:

- Налаштовано `.env` для зберігання конфігураційних змінних (`VITE_API_BASE_URL`, токен).
- Axios винесено в окремий конфігураційний модуль.
- Додано інтерцептор для автоматичного додавання JWT у заголовки запитів.
- Усі CRUD-операції для сутності `Post` переписано з використанням HTTP-запитів до реального API.
- Реалізовано сторінку логіну з авторизацією (отримання токена, збереження у `localStorage`, перенаправлення).
- Тестування виконувалося через DevTools → Network.

---

## 💻 Приклади коду

### ⚙️ Конфігурація `.env`

```env
VITE_API_BASE_URL=http://localhost:4000/v1
VITE_API_AUTH_TOKEN=your_jwt_token_here
````

### 📦 Axios — `src/api/axios.ts`

```ts
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
```

### 📡 API-функції — `src/api/posts.ts`

```ts
import api from './axios';
import { Post } from '../types';

export const getAllPosts = async (): Promise<Post[]> => {
  const response = await api.get<{ message: string; data: Post[] }>('/posts');
  return response.data.data;
};

export const getPostById = async (id: number): Promise<Post> => {
  const response = await api.get<{ message: string; data: Post }>(`/posts/${id}`);
  return response.data.data;
};

export const createPost = async (data: Partial<Post>): Promise<void> => {
  await api.post('/posts', data);
};

export const updatePost = async (id: number, data: Partial<Post>): Promise<void> => {
  await api.put(`/posts/${id}`, data);
};

export const deletePost = async (id: number): Promise<void> => {
  await api.delete(`/posts/${id}`);
};
```

### 🔑 Авторизація — `src/api/auth.ts`

```ts
import api from './axios';

export const login = async (email: string, password: string): Promise<void> => {
  const response = await api.post('/auth/login', { email, password });
  const token = response.data.data.replace('Bearer ', '');
  localStorage.setItem('token', token);
};
```

---

## 🖼️ Скріншоти

### 📃 1. Виконання CRUD-запитів (DevTools → Network)

* GET /posts
* POST /posts
* PUT /posts/\:id
* DELETE /posts/\:id

![GET /posts](screenshots/network-get.png)
![POST /posts](screenshots/network-post.png)

### 🔐 2. Сторінка логіну та отримання токена

![Login UI](screenshots/login.png)

---

## 💬 Коментарі щодо особливостей реалізації

* Використання інтерцептора спростило додавання токена до кожного запиту.
* Збереження токена в `localStorage` дозволяє використовувати його між сесіями, але не є найзахищенішим методом.
* Було важливо оновлювати заголовки `Authorization` при кожному запиті після логіну.
* Проблеми виникли при першому коміті через `commitlint` (вимога форматованих повідомлень комітів) — довелося адаптувати шаблон.
* Усі мок-функції видалено, код повністю перейшов на роботу з бекендом.

---

## ✅ Висновок

Проєкт оновлено для роботи з реальним API. Усі CRUD-операції, а також логін реалізовані через Axios із підтримкою JWT. Структура коду дозволяє масштабувати додаток, додавати нові сутності та підтримувати безпеку через токен-авторизацію.

```

Хочеш — можу також створити файл `report7.md` в canvas, якщо ти хочеш його редагувати чи доповнити прямо тут.
```
