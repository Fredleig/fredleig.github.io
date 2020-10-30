import * as React from "react";
import NoData from "../NoData/NoData";
import News from "../News/News";
import ButtonShowMore from "../ButtonShowMore/ButtonShowMore";
import Preloader from "../Preloader/Preloader";
import { INewsContentProps } from "./NewsContent.type";
import { useEffect, useState } from "react";

const NewsContent: React.FC<INewsContentProps> = ({ data, loading, onShowButton }) => {
  const [isShowButton, setIsShowButton] = useState(false);

  useEffect(() => {
    if (Array.isArray(data?.allPosts) && data?._allPostsMeta) {
      setIsShowButton(data.allPosts.length < data._allPostsMeta.count) ;
    }
  }, [data?.allPosts, data?._allPostsMeta])

  if (data && data.allPosts && data._allPostsMeta) {
    if (data._allPostsMeta.count === 0) {
      return <NoData />;
    }

    return (
      <>
        <News data={data.allPosts} />
        {isShowButton ? <ButtonShowMore onClick={onShowButton} loading={loading} /> : null}
      </>
    );
  }

  return <Preloader />;
};

export default React.memo(NewsContent);
