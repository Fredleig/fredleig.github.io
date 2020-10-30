import { IWithApollo } from "../../../helpers/Hocs/withApollo/withApollo";

export type TDataPosts = {
  updatedAt: string;
  text: string;
  id: string;
  _commentsMeta: {
    count: number;
  };
  title: string;
  // выдуманный тип от базы данных не приходит
  image?: string;
  user: null | { id: string; name: string };
  _allPostsMeta: {
    count: number;
  };
};

export type TCountPosts = {
  _allPostsMeta: {
    count: number;
  };
};

export type TDataNewsPosts = TDataPosts | TDataPosts[];

export interface IAllNewsProps extends IWithApollo<{ allPosts: TDataNewsPosts } & TCountPosts> {}
