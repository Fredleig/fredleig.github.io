import { IWithApollo } from "../../helpers/Hocs/withApollo/withApollo";
import { Dispatch } from "redux";
import { InjectedFormProps } from "redux-form";

export interface INextStateToPropsIAuthorizationProps {
  emailValue: string;
  passwordValue: string;
}

export interface IAuthorizationReduxFormProps {
  onVisible: () => void;
  dispatch?: Dispatch;
}

export interface IAuthorizationProps
  extends INextStateToPropsIAuthorizationProps,
    IWithApollo,
    Omit<InjectedFormProps, "error" | "submitting">,
    IAuthorizationReduxFormProps {}
