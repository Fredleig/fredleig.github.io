//! Свойства комонента Field (redux-form)
import svdForm from '../../Services/Validation/SyncValidation';
import inputStyle from '../../Services/LayoutInput/layoutInput';

//* Валидация
const emailValid = svdForm.svdEmail('no text');
const length8 = svdForm.minLength(3, 'no text');
const matchPassword = svdForm.matchPassword('no text');


//* Свойства input
function authField() {

  //? Цвета бордера при валидации
  const colorsValidate  = {
    error: '#EE4141',
    defaultColor: 'D6DCE9',
    correctly: 'green'
  };

  const admin = {
    name: "admin",
    component: inputStyle.renderField,
    type:"text",
    disabled: true,
  };

  const email = {
    name: "email",
    component: inputStyle.renderField,
    type:"email",
    placeholder:"Электронная почта",
    validate: [emailValid],
    colorsValidate: colorsValidate
  };

  const password = {
    name: "password",
    component: inputStyle.renderField,
    type:"password",
    placeholder:"Введите пароль",
    validate: [length8],
    colorsValidate: colorsValidate
  };

  const confirmPassword = {
    name: "confirmPassword",
    component: inputStyle.renderField,
    type:"password",
    placeholder:"Поторите пароль",
    validate: [matchPassword, length8],
    colorsValidate: colorsValidate
  };

  return {
    admin,
    email,
    password,
    confirmPassword
  }
}

export default authField()