import { IWithApollo } from "../../../helpers/Hocs/withApollo/withApollo";
import { InjectedFormProps } from "redux-form";

export interface IStateToPropsAddUser {
  nameFieldValue: string;
  emailFieldValue: string;
}

export interface IAddUserProps
  extends IStateToPropsAddUser,
    IWithApollo,
    Omit<InjectedFormProps, "error" | "submitting"> {}
