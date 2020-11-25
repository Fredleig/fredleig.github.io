import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import "./DropDown.sass";

type TOption = {
  key: string | number;
  icon?: React.ReactNode;
  title: string | number;
  subTitle?: string | number;
  subText?: string | number;
};

interface IDropDownProps {
  placeholder: string;
  options: TOption[];
}

const DropDown: React.FC<IDropDownProps> = (props) => {
  const { placeholder, options } = props;
  const [isShowMenu, setIsShowMenu] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleBodyClick(ev: MouseEvent) {
      !dropDownRef.current?.contains(ev.target as HTMLElement) && setIsShowMenu(false);
    }

    document.body.addEventListener("click", handleBodyClick);

    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, []);

  const handleInputClick = useCallback(() => {
    setIsShowMenu(true);
  }, []);

  const handleButtonClick = useCallback(() => {
    setIsShowMenu(!isShowMenu);
  }, [isShowMenu]);

  const getList = useMemo(() => {
    return options.map((item: TOption) => (
      <li key={item.key} className="list-item">
        {item.icon && <div className="list-item_icon">{item.icon}</div>}
        <div className="list-item_title">
          <div>
            <span>{item.title}</span>
            {item.subTitle && (
              <span className="list-item_title_sub-title">
                {item.subTitle}
              </span>
            )}
          </div>
          {item.subText && (
            <div className="list-item_sub-text">{item.subText}</div>
          )}
        </div>
        <div className="list-item_check-icon">
          <CheckIcon />
        </div>
      </li>
    ));
  }, [options]);

  const getTags = useMemo(() => {
    const list = []
    for (let index = 0; index < 6; index++) {
      list.push(
          <div key={index} className="tags-item">
            <span>Тест {index + 1}</span>
            <CloseIcon className="tags-item_close-icon" />
          </div>
      )
    }
    return list
  }, [])

  return (
    <div ref={dropDownRef} className={`selection_drop-down ${!isShowMenu ? "selection_drop-down-close" : ""}`}>
      <div className="tags">
        {getTags}
      </div>
      <input
        className="input"
        onClick={handleInputClick}
        placeholder={placeholder ? placeholder : "Поиск..."}
      />
      <ExpandMoreIcon
        className={`expand-more_icon ${
          isShowMenu ? "expand-more_icon-open" : "expand-more_icon-close"
        }`}
        onClick={handleButtonClick}
      />
      {isShowMenu ? <ul className="list">{getList}</ul> : null}
    </div>
  );
};

export default React.memo(DropDown);
