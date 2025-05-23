# Звіт: CRUD-інтерфейс для сутності Post

## 🔍 Опис реалізованого функціоналу

- **Сторінка колекції** (`/posts`):
  - Виведення списку всіх постів.
  - Кнопка для створення нового поста (веде на `/posts/create`).
  - Кнопки для перегляду, редагування та видалення окремих постів.
  - Підтвердження перед видаленням.

- **Сторінка перегляду та редагування окремого поста** (`/posts/:id`):
  - Повна інформація про пост.
  - Кнопка редагування (переводить у режим форми).
  - Можливість збереження змін.

- **Сторінка створення поста** (`/posts/create`):
  - Форма з порожніми полями.
  - Кнопка для збереження нового екземпляра.

## 🖼️ Скриншоти

### 📄 Список постів

![Список постів](https://github.com/volAndr1/frontend/blob/059f033781fd2063f03844191ab2ce37e6e886d2/Screenshots-lab6/chrome_pz7dSZI4LU.png)

### 📝 Створення нового поста

![Створення поста](https://github.com/volAndr1/frontend/blob/059f033781fd2063f03844191ab2ce37e6e886d2/Screenshots-lab6/chrome_2iUMRptkOC.png)

### ✏️ Редагування поста

![Редагування поста](https://github.com/volAndr1/frontend/blob/059f033781fd2063f03844191ab2ce37e6e886d2/Screenshots-lab6/chrome_MA7MUlzmOf.png)

## 💬 Коментарі

- Навігація реалізована через TanStack Router.
- Компоненти форми використовують React Hook Form для обробки стану.
- Для модального підтвердження видалення використано простий `window.confirm`.
