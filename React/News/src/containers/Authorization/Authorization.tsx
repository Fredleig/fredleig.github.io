import * as React from "react";
import { useCallback, useEffect } from "react";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { connect } from "react-redux";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import withApollo from "../../helpers/Hocs/withApollo/withApollo";
import ButtonSubmit from "../../components/ButtonSubmit/ButtonSubmit";
import InputField from "../../components/Fields/InputField/InputField";
import "./autorization.sass";
import { autorization } from "../../dataBase/Autorization/autorizationMutation";
import { loginAction } from "../../store/auth/authReducer";
import { email, emptyString, minValue4 } from "../../services/validation/validation";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import {
  IAuthorizationProps,
  IAuthorizationReduxFormProps,
  INextStateToPropsIAuthorizationProps,
} from "./Autorization.type";
import { EIdIcon } from "../../components/icons/Icons";

enum ENameField {
  email = "email",
  password = "password"
}

const Authorization: React.FC<IAuthorizationProps> = (props) => {
  const {
    emailValue,
    passwordValue,
    mutation,
    dispatch,
    dataMutation,
    onVisible,
    errorMutation,
    submitting,
  } = props;

  useEffect(() => {
    if (dataMutation) {
      dispatch(loginAction(dataMutation.signinUser));
    }
  }, [dataMutation, dispatch]);

  const submitHandler = useCallback(
    (e: React.MouseEvent<HTMLFormElement>) => {
      e.preventDefault();
      mutation(autorization, { email: emailValue, password: passwordValue });
    },
    [mutation, emailValue, passwordValue]
  );

  return (
    <ModalWindow onVisible={onVisible} justify="center" align="center">
      <div className="wrapper-login">
        <h2>Login to system</h2>
        <ErrorMessage error={errorMutation?.message} />
        <form key="form-login" className="form-login" onSubmit={submitHandler}>
          <Field
            key="email-field"
            component={InputField}
            type="email"
            name={ENameField.email}
            idIcon={EIdIcon.email}
            validate={[email, emptyString]}
            placeholder="email"
          />
          <Field
            key="password-field"
            component={InputField}
            name={ENameField.password}
            type="password"
            idIcon={EIdIcon.password}
            placeholder="password"
            validate={[minValue4, emptyString]}
          />
          <ButtonSubmit key="button-submit" submitting={submitting} caption="Login" />
        </form>
      </div>
    </ModalWindow>
  );
};

const reduxWrap = reduxForm<unknown, IAuthorizationReduxFormProps>({ form: "formLogin" })(
  withApollo(React.memo(Authorization))
);
const selector = formValueSelector("formLogin");
const AuthorizationWrap = connect<INextStateToPropsIAuthorizationProps>((state) => {
  return { emailValue: selector(state, ENameField.email), passwordValue: selector(state, ENameField.password) };
})(reduxWrap);

export default AuthorizationWrap;
