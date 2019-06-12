import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {NavLink} from 'react-router-dom';
import {Mutation} from 'react-apollo';

import Database from "../../../../Services/Database/Database";
import authField from "../../../../Controllers/FieldsProperties/fieldProperties";


function Login(props) {
  document.title = 'Войти в систему';

  const signinUser = Database.signinUserDB();
  const fields = [authField.email, authField.password];
  const { handleSubmit, submitting, submitSucceeded } = props;

  return (
        <Mutation mutation={signinUser} variables={{email: "", password: ""}}>
          {(signinUser, {loading, error}) => (
              <form onSubmit={handleSubmit}>
                <div className="fieldset">

                  {fields.map((value, index) => {
                        return (
                            <Field
                                key={index}
                                name={value.name}
                                component={value.component}
                                type={value.type}
                                placeholder={value.placeholder}
                                validate={value.validate}
                                colorsValidate={value.colorsValidate}
                            />)
                      }
                  )}

                </div>
                <button type="submit" className="btn-auth" disabled={submitting}>Войти в систему</button>
                <NavLink to="/registration" className="btn-auth">Регистрация</NavLink>
                { submitSucceeded && <p>Sent!!!</p> }
              </form>
          )}

        </Mutation>
  )
}

// Передаем redux-form
const authFormLogin = reduxForm({form: 'auth-login'})(Login);
export default authFormLogin;