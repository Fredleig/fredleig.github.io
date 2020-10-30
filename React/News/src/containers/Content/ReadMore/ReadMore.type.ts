import { IWithApollo } from "../../../helpers/Hocs/withApollo/withApollo";
import { IRouteComponentPropsType } from "../../../routes/RouteComponentProps.type";
import { InjectedFormProps } from "redux-form";

export type TDataPost = {
  updatedAt: string;
  text: string;
  id: string;
  _commentsMeta: {
    count: number;
  };
  title: string;
  // выдуманный тип от базы данных не приходит
  image?: string;
  user: null | { name: string; id: string };
  comments: {
    id: string;
    updatedAt: string;
    user: null | { name: string; id: string };
    text: string;
    // выдуманный тип, от базы данных он не приходит
    avatar: string;
  }[];
};

type TDataPosts = {
  updatedAt: string;
  text: string;
  id: string;
  _commentsMeta: {
    count: number;
  };
  title: string;
  user: null | { id: string; name: string };
  _allPostsMeta: {
    count: number;
  };
};

type TMathParams = { id: string };

export interface IStateToPropsReadMore {
  commentValue: string;
}

export interface IReadMoreProps
  extends IWithApollo<{ Post: TDataPost }>,
    IStateToPropsReadMore,
    IRouteComponentPropsType<TMathParams>,
    Omit<InjectedFormProps, "error" | "submitting"> {}
