import { paginationNum } from "../../helpers/configsHelper";
import { TPaginationReturn } from "./pagination.type";

const pagination = (function (): TPaginationReturn {
  let skipItem = 0;
  let firstItem = paginationNum;

  const skip = (plusNum: number) => {
    skipItem += plusNum;
    return skipItem;
  };

  const first = (plusNum: number) => {
    firstItem += plusNum;
    return firstItem;
  };

  return {
    skip,
    first,
  };
})();

export default pagination;
