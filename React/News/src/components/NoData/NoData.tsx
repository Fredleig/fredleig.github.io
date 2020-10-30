import * as React from "react";
// my import
import { noData } from "../../helpers/configsHelper";
import "./noData.sass";

const NoData: React.FC = () => {
  return (
    <div className="no-data-wrapper">
      <img className="no-data-img" src={noData} alt="no-data" />
    </div>
  );
};

export default NoData;
