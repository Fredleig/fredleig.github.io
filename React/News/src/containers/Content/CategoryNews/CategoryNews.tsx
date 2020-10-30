import * as React from "react";
//my import
import pagination from "../../../services/pagination/pagination";
import withApollo from "../../../helpers/Hocs/withApollo/withApollo";
import { getCountPosts, getPosts } from "../../../dataBase/allNews/newsCategoryQuery";
import { paginationNum } from "../../../helpers/configsHelper";
import { boundMethod } from "autobind-decorator";
import { ICategoryNewsProps } from "./CategoryNews.type";
import NewsContent from "../../../components/NewsContent/NewsContent";
import withError from "../../../helpers/Hocs/withError/withError";

class CategoryNews extends React.PureComponent<ICategoryNewsProps> {
  public componentDidMount() {
    const { query } = this.props;

    query(getPosts, { first: paginationNum, ...this.imitationCategoryName() });
    query(getCountPosts, { ...this.imitationCategoryName() });
  }

  public componentWillUnmount() {
    this.props.removeData();
  }

  private imitationCategoryName() {
    switch (this.props.route.name) {
      case "Frontend":
        return { category: "My great Vacation" };
      case "Backend":
        return { category: "new posts" };
      case "Design":
        return { category: "test title" };
      default:
        return null;
    }
  }

  @boundMethod
  private handleButtonShowMore() {
    this.props.query(getPosts, {
      first: pagination.first(paginationNum),
      ...this.imitationCategoryName(),
    });
  }

  public render() {
    const { data, loading } = this.props;
    return <NewsContent data={data} onShowButton={this.handleButtonShowMore} loading={loading} />;
  }
}

export default withApollo(withError(CategoryNews));
