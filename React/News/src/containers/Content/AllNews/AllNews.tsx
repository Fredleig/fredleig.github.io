import * as React from "react";
//my import
import pagination from "../../../services/pagination/pagination";
import withApollo from "../../../helpers/Hocs/withApollo/withApollo";
import { getCountPosts, getPosts } from "../../../dataBase/allNews/newsCategoryQuery";
import { paginationNum } from "../../../helpers/configsHelper";
import { IAllNewsProps } from "./AllNews.type";
import NewsContent from "../../../components/NewsContent/NewsContent";
import { useCallback, useEffect } from "react";
import withError from "../../../helpers/Hocs/withError/withError";

const AllNews: React.FC<IAllNewsProps> = (props) => {
  const { query, data, loading, removeData } = props;

  useEffect(() => {
    query(getPosts, { first: paginationNum });
    query(getCountPosts);

    return () => {
      removeData();
    };
  }, [query, removeData]);

  const handleShowButton = useCallback(() => {
    query(getPosts, { first: pagination.first(paginationNum) });
  }, [query]);

  return <NewsContent data={data} onShowButton={handleShowButton} loading={loading} />;
};

export default withApollo(withError(React.memo(AllNews)));
