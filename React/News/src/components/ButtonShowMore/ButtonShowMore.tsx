import * as React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
//my import
import Preloader, { ESizePreloader } from "../Preloader/Preloader";
import "./buttonShowMore.sass";
import { IButtonShowMoreProps } from "./ButtonShowMore.type";

//? аналог prevProps, prevState
const usePrevious = (loading: boolean) => {
  const ref = useRef(loading);
  useEffect(() => {
    ref.current = loading;
  });
  return ref.current;
};

const ButtonShowMore: React.FC<IButtonShowMoreProps> = (props) => {
  const { onClick } = props;
  const [loading, setLoading] = useState(false);
  const prevLoading = usePrevious(loading);

  useEffect(() => {
    prevLoading === loading && setLoading(false);
  }, [loading, prevLoading]);

  const handleShowButton = useCallback(() => {
    setLoading(true);
    onClick();
  }, [onClick]);

  if (props.loading && loading) {
    return (
      <div key="show-more-btn" className="show-more-btn-loading">
        <Preloader size={ESizePreloader.small}>
          <span className="button-text-loading">Loading</span>
        </Preloader>
      </div>
    );
  }

  return (
    <div key="show-more-btn" className="show-more-btn" onClick={handleShowButton}>
      Show More
    </div>
  );
};

export default React.memo(ButtonShowMore);
