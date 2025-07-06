# Name Input Validation Component

Полнофункциональный компонент валидации полей ввода имени и фамилии с JavaScript, созданный по методологии БЭМ с поддержкой всех аспектов валидации.

## 🚀 Особенности

- **Семантическая разметка** - правильное использование HTML5 тегов
- **БЭМ методология** - четкая структура CSS классов
- **SVG иконки** - векторные иконки с поддержкой изменения цвета
- **JavaScript валидация** - кастомная валидация с детальными сообщениями об ошибках
- **Автоматическое форматирование** - первая буква заглавная, удаление лишних пробелов
- **Многоязычная поддержка** - русские и английские буквы
- **Доступность** - поддержка screen readers и клавиатурной навигации
- **Адаптивность** - корректное отображение на всех устройствах
- **Темная тема** - автоматическое переключение согласно системным настройкам
- **Анимации** - плавные переходы и эффекты для лучшего UX

## 📁 Структура файлов

```
input/
├── README.md
├── index.html
├── validation.js
├── name-input.html
└── name-validation.js
```

## 🎨 Состояния компонента

### Основные состояния
- **Normal** - стандартное состояние поля
- **Hover** - при наведении курсора
- **Focus** - при фокусе (включая клавиатурную навигацию)
- **Active** - при нажатии

### Состояния валидации
- **Valid** - корректное имя (зеленая рамка)
- **Invalid** - некорректное имя (красная рамка + анимация)
- **Empty** - пустое поле (нейтральная рамка)

### Дополнительные состояния
- **Disabled** - отключенное поле
- **Read-only** - только для чтения

## 🛠 Технические детали

### HTML структура
```html
<form class="form">
  <div class="form__group">
    <label class="form__label">Имя</label>
    <div class="form__input-wrapper">
      <input class="form__input" type="text" name="firstName" required>
      <svg class="form__icon">...</svg>
    </div>
    <div class="form__error">Сообщение об ошибке</div>
    <div class="form__success">Сообщение об успехе</div>
  </div>
  <button class="form__button">Отправить</button>
</form>
```

### CSS классы (БЭМ)
- `form` - блок формы
- `form__group` - элемент группы полей
- `form__label` - элемент лейбла
- `form__input-wrapper` - элемент обертки input
- `form__input` - элемент поля ввода
- `form__icon` - элемент иконки
- `form__error` - элемент сообщения об ошибке
- `form__success` - элемент сообщения об успехе
- `form__button` - элемент кнопки
- `form__row` - элемент строки (для сетки)

### JavaScript API

#### Основные методы
```javascript
// Проверка имени строки
const isValid = window.nameValidator.validateNameString('Иван', 'firstName');

// Получение состояния валидации поля
const state = window.nameValidator.getValidationState(inputElement);
// Возвращает: 'empty', 'valid', 'invalid'

// Сброс валидации поля
window.nameValidator.resetValidation(inputElement);

// Настройка валидации
window.nameValidator.setConfig({
  minLength: 2,
  maxLength: 30,
  allowNumbers: false,
  allowSpecialChars: false,
  allowMultipleSpaces: false,
  trimSpaces: true
});

// Получение настроек
const config = window.nameValidator.getConfig();
```

#### События валидации
- `blur` - валидация при потере фокуса
- `input` - валидация в реальном времени
- `keyup` - валидация при нажатии Enter/Escape
- `paste` - валидация при вставке текста
- `submit` - валидация при отправке формы

#### Типы полей
- `firstName` - имя
- `lastName` - фамилия
- `name` - общий тип

#### Кастомные сообщения об ошибках
- **tooShort** - "Имя должен содержать минимум 2 символа"
- **tooLong** - "Имя не должен превышать 50 символов"
- **noNumbers** - "Имя не должен содержать цифры"
- **noSpecialChars** - "Имя не должен содержать специальные символы"
- **noMultipleSpaces** - "Имя не должен содержать множественные пробелы"
- **invalidFormat** - "Пожалуйста, введите корректное имя"

### Настройки валидации

```javascript
const config = {
  minLength: 2,              // Минимальная длина
  maxLength: 50,             // Максимальная длина
  allowNumbers: false,       // Разрешить цифры
  allowSpecialChars: false,  // Разрешить спецсимволы
  allowMultipleSpaces: false, // Разрешить множественные пробелы
  trimSpaces: true,          // Убирать пробелы в начале/конце
  caseSensitive: false       // Регистрозависимость
};
```

### Регулярные выражения

```javascript
// Имя и фамилия: 2-50 символов, буквы, пробелы, дефисы, апострофы
const nameRegex = /^[а-яёa-z\s\-']{2,50}$/i;

// Имя и фамилия: 2-50 символов, буквы, пробелы, дефисы, апострофы
const nameRegex = /^[а-яёa-z\s\-']{2,50}$/i;
```

### Поддерживаемые браузеры
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🎯 Использование

### Базовое использование
```html
<div class="form__group">
  <label for="firstName" class="form__label">Имя</label>
  <input class="form__input" type="text" id="firstName" name="firstName" required>
</div>
```

### Сетка полей
```html
<div class="form__row">
  <div class="form__group">
    <label for="firstName" class="form__label">Имя</label>
    <input class="form__input" type="text" id="firstName" name="firstName">
  </div>
  <div class="form__group">
    <label for="lastName" class="form__label">Фамилия</label>
    <input class="form__input" type="text" id="lastName" name="lastName">
  </div>
</div>
```

### С кастомной иконкой
```html
<div class="form__input-wrapper">
  <input class="form__input" type="text" name="firstName">
  <svg class="form__icon" viewBox="0 0 24 24">
    <!-- Ваша SVG иконка -->
  </svg>
</div>
```

## 🎨 Кастомизация

### Изменение цветов
```css
.form__input:focus {
  border-color: #your-color;
  box-shadow: 0 0 0 3px rgba(your-color, 0.1);
}
```

### Изменение размеров
```css
.form__input {
  padding: 16px 20px 16px 50px; /* Увеличенные отступы */
  font-size: 18px; /* Больший шрифт */
}
```

### Кастомные анимации
```css
.form__input:invalid {
  animation: your-custom-animation 0.3s ease-in-out;
}
```

### Настройка валидации
```javascript
// Разрешить цифры в именах
window.nameValidator.setConfig({ allowNumbers: true });

// Увеличить максимальную длину
window.nameValidator.setConfig({ maxLength: 100 });

// Разрешить специальные символы
window.nameValidator.setConfig({ allowSpecialChars: true });
```

## ♿ Доступность

### ARIA атрибуты
- `aria-hidden="true"` для декоративных иконок
- Правильная связь label-input через `for` и `id`
- Семантические HTML5 теги

### Клавиатурная навигация
- Поддержка Tab для навигации
- Enter для отправки формы
- Escape для сброса фокуса
- Предотвращение ввода недопустимых символов

### Screen Reader поддержка
- Описательные лейблы
- Сообщения об ошибках и успехе
- Правильная структура заголовков

## 📱 Адаптивность

### Мобильные устройства
- Предотвращение зума на iOS (font-size: 16px)
- Оптимизированные touch targets
- Адаптивные отступы
- Сетка переключается в одну колонку

### Планшеты
- Оптимальные размеры для touch интерфейса
- Сохранение читаемости текста

## 🌙 Темная тема

Автоматическое переключение согласно системным настройкам:
```css
@media (prefers-color-scheme: dark) {
  .form__input {
    background-color: #2d3748;
    border-color: #4a5568;
    color: #e2e8f0;
  }
}
```

## 🔧 Производительность

### Оптимизации
- CSS transitions вместо JavaScript анимаций
- Hardware acceleration для плавных переходов
- Минимальное количество DOM элементов
- Эффективные CSS селекторы
- Debounced валидация в реальном времени

### Размер
- Минифицированный CSS: ~8KB
- JavaScript валидация: ~8KB
- SVG иконки: ~2KB
- Общий размер: ~18KB

## 🧪 Тестирование

### Ручное тестирование
- [ ] Валидация корректных имен
- [ ] Валидация некорректных имен
- [ ] Работа с пустыми полями
- [ ] Автоматическое форматирование
- [ ] Клавиатурная навигация
- [ ] Screen reader совместимость
- [ ] Адаптивность на разных устройствах
- [ ] Темная тема
- [ ] Вставка текста
- [ ] Предотвращение недопустимых символов

### Автоматизированное тестирование
```javascript
describe('Name Validator', () => {
  it('should validate correct names', () => {
    expect(window.nameValidator.validateNameString('Иван', 'firstName')).toBe(true);
    expect(window.nameValidator.validateNameString('Smith', 'lastName')).toBe(true);
  });
  
  it('should reject names with numbers', () => {
    expect(window.nameValidator.validateNameString('Иван123', 'firstName')).toBe(false);
  });
  
  it('should format names correctly', () => {
    const input = document.querySelector('#firstName');
    input.value = 'иван';
    input.dispatchEvent(new Event('input'));
    expect(input.value).toBe('Иван');
  });
});
```

## 📄 Лицензия

MIT License - свободное использование в коммерческих и некоммерческих проектах.

## 🤝 Вклад в проект

1. Fork репозитория
2. Создайте feature branch (`git checkout -b feature/amazing-feature`)
3. Commit изменения (`git commit -m 'Add amazing feature'`)
4. Push в branch (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

