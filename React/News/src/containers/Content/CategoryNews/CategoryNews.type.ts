import { IWithApollo } from "../../../helpers/Hocs/withApollo/withApollo";
import { IRouteComponentPropsType } from "../../../routes/RouteComponentProps.type";
import { TCountPosts, TDataNewsPosts } from "../AllNews/AllNews.type";

export interface ICategoryNewsProps extends IWithApollo<{ allPosts: TDataNewsPosts } & TCountPosts>,
  IRouteComponentPropsType{}
