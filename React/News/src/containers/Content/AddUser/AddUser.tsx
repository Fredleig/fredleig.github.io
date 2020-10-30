import * as React from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
//my import
import withApollo from "../../../helpers/Hocs/withApollo/withApollo";
import ButtonSubmit from "../../../components/ButtonSubmit/ButtonSubmit";
import InputField from "../../../components/Fields/InputField/InputField";
import { addUser } from "../../../dataBase/addUser/addUser";
import { IAddUserProps, IStateToPropsAddUser } from "./AddUser.type";
import { useCallback } from "react";
import { EIdIcon } from "../../../components/icons/Icons";

enum ENameField {
  nameNewUser= "nameNewUser",
  newUserEmail = "newUserEmail"
}

const AddUser: React.FC<IAddUserProps> = (props) => {
  const { mutation, nameFieldValue, emailFieldValue, submitting } = props;

  const handleAddUser = useCallback(
    (e: React.MouseEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Нужна отправка пароля на почту
      const variables = {
        name: nameFieldValue,
        authProvider: {
          email: {
            email: emailFieldValue,
            password: "1234",
          },
        },
      };
      mutation(addUser, variables);
    },
    [mutation, emailFieldValue, nameFieldValue]
  );

  return (
    <>
      <h1 key="title_add-new-user" className="title_add-news">
        Add new User
      </h1>
      <form key="form-add-news" onSubmit={handleAddUser}>
        <Field
          component={InputField}
          key="name-new-user"
          name={ENameField.nameNewUser}
          type="text"
          idIcon={EIdIcon.user}
          placeholder="Name new user"
        />
        <Field
          component={InputField}
          key="new-user-email"
          name={ENameField.newUserEmail}
          type="email"
          idIcon={EIdIcon.email}
          placeholder="New user email"
        />
        <ButtonSubmit key="button-submit" submitting={submitting} caption="Register" />
      </form>
    </>
  );
};

const reduxWrap = reduxForm({ form: "addNews" })(withApollo(React.memo(AddUser)));

const selector = formValueSelector("addNews");
const AddUserWrap = connect<IStateToPropsAddUser>((state) => ({
    nameFieldValue: selector(state, ENameField.nameNewUser),
    emailFieldValue: selector(state, ENameField.newUserEmail)
  })
)(reduxWrap);

export default AddUserWrap;
