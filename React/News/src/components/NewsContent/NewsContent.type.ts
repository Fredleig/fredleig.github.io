import { TCountPosts, TDataNewsPosts } from "../../containers/Content/AllNews/AllNews.type";

export interface INewsContentProps {
  loading: boolean;
  data?: { allPosts: TDataNewsPosts } & TCountPosts;
  onShowButton: () => void;
}
