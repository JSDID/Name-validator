/**
 * Name Input Validation
 * Валидация полей ввода имени и фамилии с кастомными сообщениями и анимациями
 */

class NameValidator {
  constructor() {
    // Регулярные выражения для валидации
    this.nameRegex = /^[а-яёa-z\s\-']{2,50}$/i; // Имя: 2-50 символов, буквы, пробелы, дефисы, апострофы
    this.lastNameRegex = /^[а-яёa-z\s\-']{2,50}$/i; // Фамилия: 2-50 символов
    
    // Настройки валидации
    this.config = {
      minLength: 2,
      maxLength: 50,
      allowNumbers: false,
      allowSpecialChars: false,
      allowMultipleSpaces: false,
      trimSpaces: true,
      caseSensitive: false
    };

    this.inputs = document.querySelectorAll('.form__input[name*="name"], .form__input[name*="first"], .form__input[name*="last"]');
    this.init();
  }

  init() {
    this.inputs.forEach(input => {
      this.setupValidation(input);
    });
  }

  setupValidation(input) {
    const wrapper = input.closest('.form__group');
    const errorElement = wrapper.querySelector('.form__error');
    const successElement = wrapper.querySelector('.form__success');
    const icon = wrapper.querySelector('.form__icon');

    // События для валидации
    input.addEventListener('blur', () => this.validateName(input, errorElement, successElement, icon));
    input.addEventListener('input', () => this.handleInput(input, errorElement, successElement, icon));
    input.addEventListener('keyup', (e) => this.handleKeyup(e, input, errorElement, successElement, icon));
    input.addEventListener('paste', (e) => this.handlePaste(e, input, errorElement, successElement, icon));

    // Предотвращение отправки формы с невалидным именем
    const form = input.closest('form');
    if (form) {
      form.addEventListener('submit', (e) => this.handleSubmit(e, input, errorElement, successElement, icon));
    }
  }

  validateName(input, errorElement, successElement, icon) {
    const name = this.config.trimSpaces ? input.value.trim() : input.value;
    const isEmpty = name === '';
    const fieldType = this.getFieldType(input);
    
    // Очищаем предыдущие состояния
    this.clearValidationStates(input, errorElement, successElement, icon);

    if (isEmpty) {
      this.setNeutralState(input, icon);
      return false;
    }

    // Проверяем длину
    if (name.length < this.config.minLength) {
      this.setInvalidState(input, errorElement, icon, 'tooShort', fieldType);
      return false;
    }

    if (name.length > this.config.maxLength) {
      this.setInvalidState(input, errorElement, icon, 'tooLong', fieldType);
      return false;
    }

    // Проверяем на цифры
    if (!this.config.allowNumbers && /\d/.test(name)) {
      this.setInvalidState(input, errorElement, icon, 'noNumbers', fieldType);
      return false;
    }

    // Проверяем на специальные символы
    if (!this.config.allowSpecialChars && /[!@#$%^&*()_+=<>?:"{}|\\[\]`~]/.test(name)) {
      this.setInvalidState(input, errorElement, icon, 'noSpecialChars', fieldType);
      return false;
    }

    // Проверяем множественные пробелы
    if (!this.config.allowMultipleSpaces && /\s{2,}/.test(name)) {
      this.setInvalidState(input, errorElement, icon, 'noMultipleSpaces', fieldType);
      return false;
    }

    // Проверяем по регулярному выражению
    const regex = this.getRegexForField(fieldType);
    const isValid = regex.test(name);

    if (isValid) {
      this.setValidState(input, successElement, icon, fieldType);
      return true;
    } else {
      this.setInvalidState(input, errorElement, icon, 'invalidFormat', fieldType);
      return false;
    }
  }

  handleInput(input, errorElement, successElement, icon) {
    const name = input.value;
    
    // Если поле пустое, убираем все состояния
    if (name === '') {
      this.clearValidationStates(input, errorElement, successElement, icon);
      this.setNeutralState(input, icon);
      return;
    }

    // Автоматическое форматирование
    this.autoFormat(input);

    // Проверяем валидность в реальном времени
    const fieldType = this.getFieldType(input);
    const regex = this.getRegexForField(fieldType);
    const isValid = regex.test(name);
    
    if (isValid && name.length >= this.config.minLength) {
      this.setValidState(input, successElement, icon, fieldType);
    } else {
      this.setInvalidState(input, errorElement, icon, 'invalidFormat', fieldType);
    }
  }

  handleKeyup(event, input, errorElement, successElement, icon) {
    // Валидация при нажатии Enter
    if (event.key === 'Enter') {
      this.validateName(input, errorElement, successElement, icon);
    }

    // Очистка при нажатии Escape
    if (event.key === 'Escape') {
      input.blur();
    }

    // Предотвращение ввода недопустимых символов
    if (event.key.length === 1) {
      const char = event.key;
      if (!this.config.allowNumbers && /\d/.test(char)) {
        event.preventDefault();
        return;
      }
      if (!this.config.allowSpecialChars && /[!@#$%^&*()_+=<>?:"{}|\\[\]`~]/.test(char)) {
        event.preventDefault();
        return;
      }
    }
  }

  handlePaste(event, input, errorElement, successElement, icon) {
    // Обработка вставки текста
    setTimeout(() => {
      this.validateName(input, errorElement, successElement, icon);
    }, 0);
  }

  handleSubmit(event, input, errorElement, successElement, icon) {
    const isValid = this.validateName(input, errorElement, successElement, icon);
    
    if (!isValid) {
      event.preventDefault();
      this.showSubmitError(input, errorElement);
      return false;
    }

    console.log('Форма отправлена с именем:', input.value);
    return true;
  }

  setValidState(input, successElement, icon, fieldType) {
    input.classList.add('form__input--valid');
    input.classList.remove('form__input--invalid');
    
    if (successElement) {
      successElement.style.display = 'block';
      successElement.textContent = this.getSuccessMessage(fieldType);
    }

    if (icon) {
      icon.style.fill = '#28a745';
    }

    this.addSuccessAnimation(input);
  }

  setInvalidState(input, errorElement, icon, errorType, fieldType) {
    input.classList.add('form__input--invalid');
    input.classList.remove('form__input--valid');
    
    if (errorElement) {
      errorElement.style.display = 'block';
      errorElement.textContent = this.getErrorMessage(errorType, fieldType);
    }

    if (icon) {
      icon.style.fill = '#dc3545';
    }

    this.addErrorAnimation(input);
  }

  setNeutralState(input, icon) {
    input.classList.remove('form__input--valid', 'form__input--invalid');
    
    if (icon) {
      icon.style.fill = '#6c757d';
    }
  }

  clearValidationStates(input, errorElement, successElement, icon) {
    input.classList.remove('form__input--valid', 'form__input--invalid');
    
    if (errorElement) {
      errorElement.style.display = 'none';
    }
    
    if (successElement) {
      successElement.style.display = 'none';
    }
  }

  showSubmitError(input, errorElement) {
    if (errorElement) {
      errorElement.style.display = 'block';
      errorElement.textContent = 'Пожалуйста, исправьте ошибки перед отправкой';
      
      input.focus();
      this.addSubmitErrorAnimation(input);
    }
  }

  getFieldType(input) {
    const name = input.name.toLowerCase();
    const id = input.id.toLowerCase();
    
    if (name.includes('first') || id.includes('first') || name.includes('имя')) {
      return 'firstName';
    } else if (name.includes('last') || id.includes('last') || name.includes('фамилия')) {
      return 'lastName';
    } else {
      return 'name';
    }
  }

  getRegexForField(fieldType) {
    switch (fieldType) {
      case 'firstName':
        return this.nameRegex;
      case 'lastName':
        return this.lastNameRegex;
      default:
        return this.nameRegex;
    }
  }

  getErrorMessage(errorType, fieldType) {
    const fieldName = this.getFieldName(fieldType);
    
    switch (errorType) {
      case 'tooShort':
        return `${fieldName} должен содержать минимум ${this.config.minLength} символа`;
      case 'tooLong':
        return `${fieldName} не должен превышать ${this.config.maxLength} символов`;
      case 'noNumbers':
        return `${fieldName} не должен содержать цифры`;
      case 'noSpecialChars':
        return `${fieldName} не должен содержать специальные символы`;
      case 'noMultipleSpaces':
        return `${fieldName} не должен содержать множественные пробелы`;
      case 'invalidFormat':
        return `Пожалуйста, введите корректный ${fieldName.toLowerCase()}`;
      default:
        return `Пожалуйста, введите корректный ${fieldName.toLowerCase()}`;
    }
  }

  getSuccessMessage(fieldType) {
    const fieldName = this.getFieldName(fieldType);
    return `✓ ${fieldName} корректен`;
  }

  getFieldName(fieldType) {
    switch (fieldType) {
      case 'firstName':
        return 'Имя';
      case 'lastName':
        return 'Фамилия';
      default:
        return 'Имя';
    }
  }

  autoFormat(input) {
    let value = input.value;
    
    // Убираем множественные пробелы
    if (!this.config.allowMultipleSpaces) {
      value = value.replace(/\s{2,}/g, ' ');
    }
    
    // Первая буква заглавная
    if (value.length > 0) {
      value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
    
    // Убираем пробелы в начале и конце
    if (this.config.trimSpaces) {
      value = value.trim();
    }
    
    input.value = value;
  }

  addSuccessAnimation(input) {
    input.style.animation = 'none';
    input.offsetHeight; // Trigger reflow
    input.style.animation = 'successPulse 0.6s ease-in-out';
  }

  addErrorAnimation(input) {
    input.style.animation = 'none';
    input.offsetHeight; // Trigger reflow
    input.style.animation = 'shake 0.5s ease-in-out';
  }

  addSubmitErrorAnimation(input) {
    input.style.animation = 'none';
    input.offsetHeight; // Trigger reflow
    input.style.animation = 'attentionPulse 1s ease-in-out';
  }

  // Публичные методы для внешнего использования
  validateNameString(name, fieldType = 'name') {
    const regex = this.getRegexForField(fieldType);
    return regex.test(name.trim());
  }

  getValidationState(input) {
    const name = input.value.trim();
    if (name === '') return 'empty';
    
    const fieldType = this.getFieldType(input);
    const regex = this.getRegexForField(fieldType);
    return regex.test(name) ? 'valid' : 'invalid';
  }

  resetValidation(input) {
    const wrapper = input.closest('.form__group');
    const errorElement = wrapper.querySelector('.form__error');
    const successElement = wrapper.querySelector('.form__success');
    const icon = wrapper.querySelector('.form__icon');
    
    this.clearValidationStates(input, errorElement, successElement, icon);
    this.setNeutralState(input, icon);
  }

  // Методы для настройки валидации
  setConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
  }

  getConfig() {
    return { ...this.config };
  }
}

// Добавляем CSS анимации
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }

  @keyframes successPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
  }

  @keyframes attentionPulse {
    0%, 100% { box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1); }
    50% { box-shadow: 0 0 0 6px rgba(220, 53, 69, 0.2); }
  }

  .form__input--valid {
    border-color: #28a745 !important;
    box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.1) !important;
  }

  .form__input--invalid {
    border-color: #dc3545 !important;
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1) !important;
  }
`;
document.head.appendChild(style);

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
  window.nameValidator = new NameValidator();
});

// Экспорт для использования в модулях
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NameValidator;
} 
