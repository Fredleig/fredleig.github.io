import Database from "../../../Services/Database/Database";

export const submitForm = (props, data) => {
  return props.submitForm({
    variables: {firstName: data.firstName, lastName: data.lastName}
  })
};