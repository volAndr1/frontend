# Звіт з виконання завдання: Розробка UI для реалізації CRUD-операцій

## Опис реалізованих змін

На основі існуючої кодової бази, створеної для завдання “Розробка UI для реалізації CRUD-операцій”, було додано функціонал для взаємодії з backend через API за допомогою бібліотеки Axios. Реалізовано наступні зміни:
- Налаштовано конфігурацію Axios для роботи з базовим URL та обробки заголовків.
- Додано API-виклики для виконання CRUD-операцій (створення, отримання, оновлення, видалення сутностей).
- Інтегровано виклики API в UI, що дозволяє користувачам взаємодіяти з даними через інтерфейс.
- Додано обробку помилок для API-запитів та відображення відповідних повідомлень у UI.
- [Опціонально] Реалізовано сторінку логіну з автентифікацією через API.

## Приклади коду

### Конфігурація axios.ts


Скріншот: ![Конфігурація axios.ts](https://github.com/volAndr1/frontend/blob/c040f3aa16746072a44f69176d40d41b4f24e22a/Screenshots-lab7/webstorm64_FwPGRpVRwl.png)


### Приклад API-виклику (getAllPost)


Скріншот: ![Приклад API-виклику getAllPost](https://github.com/volAndr1/frontend/blob/c040f3aa16746072a44f69176d40d41b4f24e22a/Screenshots-lab7/webstorm64_QUMucDhC8T.png)


## Скріншоти

### Виконання CRUD-операцій через UI (DevTools → вкладка Network)

- **Створення сутності (POST)**:
  
  Скріншот: ![POST запит](https://github.com/volAndr1/frontend/blob/c040f3aa16746072a44f69176d40d41b4f24e22a/Screenshots-lab7/chrome_LLQCDpuJWt.png)
  

- **Отримання всіх сутностей (GET)**:
  
  Скріншот: ![GET запит](https://github.com/volAndr1/frontend/blob/c040f3aa16746072a44f69176d40d41b4f24e22a/Screenshots-lab7/chrome_Ut6w6ATxdI.png)
  

- **Оновлення сутності (PATCH)**:
  
  Скріншот: ![PATCH запит](https://github.com/volAndr1/frontend/blob/c040f3aa16746072a44f69176d40d41b4f24e22a/Screenshots-lab7/chrome_ORvsHJqoby.png)
  

- **Видалення сутності (DELETE)**:
  
  Скріншот: ![DELETE запит](https://github.com/volAndr1/frontend/blob/c040f3aa16746072a44f69176d40d41b4f24e22a/Screenshots-lab7/chrome_66UT0IYrAl.png)
  

### Вміст .env (без секретів)


Скріншот: ![Вміст .env](https://github.com/volAndr1/frontend/blob/c040f3aa16746072a44f69176d40d41b4f24e22a/Screenshots-lab7/webstorm64_W5aYLRowk0.png)


### [Опціонально] Сторінка логіну та відповідь API

- **Сторінка логіну**:
 
  Скріншот: ![Сторінка логіну](https://github.com/volAndr1/frontend/blob/c040f3aa16746072a44f69176d40d41b4f24e22a/Screenshots-lab7/chrome_Xo41BJBs6S.png)


- **Відповідь API на запит логіну**:
  
  Скріншот: ![API відповідь логіну](https://github.com/volAndr1/frontend/blob/c040f3aa16746072a44f69176d40d41b4f24e22a/Screenshots-lab7/chrome_sYtFhEmL43.png)
 

## Коментарі

* Токен від API приходить у форматі `Bearer ...`, тому його потрібно вручну обрізати перед збереженням (`replace('Bearer ', '')`)
* Axios не оновлює заголовки автоматично при зміні токена після ініціалізації — потрібно або перезавантаження сторінки, або оновлення заголовків вручну після логіну
* Сторінка логіну стилізована за допомогою TailwindCSS
