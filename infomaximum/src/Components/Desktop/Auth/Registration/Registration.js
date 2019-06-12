import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {NavLink} from 'react-router-dom';
import {Mutation} from 'react-apollo';

import "./registration.sass";
// import {submit} from "../../../../Controllers/Auth/Login/submit";
import Database from "../../../../Services/Database/Database";
import authField from "../../../../Controllers/FieldsProperties/fieldProperties";

class Registration extends React.Component {
  constructor(props) {
    document.title = 'Регистрация';
    super(props);
    this.signinUser = Database.signinUserDB();
    this.fields = Object.values(authField);
    this.props.initialize({admin: "Администратор"});
  }

  render() {

    return (
        <Mutation mutation={this.signinUser}>
          {(signinUser, {loading, error}) => (
              <form onSubmit={() => this.props.handleSubmit(signinUser)}>
                <div className="header-registration">
                  Задайте электронную почту и пароль администратора системы
                </div>
                <div className="fieldset">

                  {this.fields.map((value, index) => {
                        return (
                            <Field
                                key={index}
                                name={value.name}
                                component={value.component}
                                type={value.type}
                                placeholder={value.placeholder}
                                validate={value.validate}
                                disabled={value.disabled}
                                colorsValidate={value.colorsValidate}
                            />)
                      }
                  )}

                </div>
                <button className="btn-auth">Применить и войти</button>
                <NavLink className="btn-auth" to="/login">Отмена</NavLink>
              </form>
          )}
        </Mutation>
    )

  }

}


// Передаем redux-form
const authRegistration = reduxForm({form: 'auth-registration'})(Registration);
export default authRegistration; // to RegistrationCtn