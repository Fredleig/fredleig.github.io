//! Нужен в первую очередь для плагина Redux-Form
import React from 'react';
import './layoutInput.sass';

const inputStyle = (function () {

  //? Красим бордер формы
  function _borderStyle(touched, error, color) {
    let style = {borderColor: ''};

    if (touched && error) {
      style.borderColor = color.error
    } else if (!touched) {
      style.borderColor = color.defaultColor
    } else {
      style.borderColor = color.correctly
    }

    return style;
  }

  //? Делаем видимым или скрываем пароль
  function _showPassword(ev) {
    let password = ev.currentTarget.offsetParent.querySelector('input');

    if (password.getAttribute('type') === 'password') {
        password.setAttribute('type', 'text')
    } else {
        password.setAttribute('type', 'password')
    }

  }

  //* Шаблон компонента Field
  function renderField({input, placeholder, type, disabled, meta: {touched, error}, colorsValidate = false}) {
    let classNamePass = 'input-wrap';
    if (type === 'password') classNamePass += ' input-password-wrap';

    return (
        <div className={classNamePass}>
          <input {...input}
                 placeholder={placeholder}
                 type={type}
                 disabled={disabled}
                 style={colorsValidate ? _borderStyle(touched, error, colorsValidate): null}/>

          {type === 'password' ?
              <div className="show-password-wrap" onClick={ev => _showPassword(ev)}>
                <svg viewBox="0 0 12 5" className="show-password-icon" width="12" height="5">
                  <use xlinkHref="/image/icon/sprite.svg#showPassword"/>
                </svg>
              </div> :
              null}

          {touched && error !== 'no text' && <span>{error}</span>}
        </div>
    )
  }

  return {
    renderField
  }

})();

export default inputStyle;


