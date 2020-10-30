import { TDataNewsPosts } from "../../containers/Content/AllNews/AllNews.type";
import { RouteComponentProps } from "react-router";
import { TDataPost } from "../../containers/Content/ReadMore/ReadMore.type";

export interface INewsProps extends RouteComponentProps {
  data: TDataNewsPosts | TDataPost;
  footer?: boolean;
}
