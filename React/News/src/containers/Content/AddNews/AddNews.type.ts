import { IWithApollo } from "../../../helpers/Hocs/withApollo/withApollo";
import { InjectedFormProps } from "redux-form";

export interface IStateToPropsAddNews {
  titleNews: string;
  newsValue: string;
}

export interface IAddNewsProps
  extends IStateToPropsAddNews,
    IWithApollo,
    Omit<InjectedFormProps, "error" | "submitting"> {}
