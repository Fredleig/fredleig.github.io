//! Синхронная валидация
// Если у функции есть свои аргументы, по документации, в компоненте нужно добавить переменную
// И эту переменную добавлять в Field validate
// Пример let minLength = minLength(6, 'Error text');

const svdForm = (function () {

      //* Минимальная длина
      function minLength(min, errText) {
        return value => value && value.length < min ? errText : !value ? errText: undefined;
      }

      //* Cоответствие пароля
      function matchPassword(errText) {
        return (value, allValues) => allValues.confirmPassword !== allValues.password ? errText : undefined;
      }

      //* Коректность Email
      function svdEmail(errText) {
        return value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? errText : !value ? errText: undefined;
      }

      return {
        minLength,
        matchPassword,
        svdEmail
      }
    }
)();

export default svdForm;