import { RouteComponentProps } from "react-router";

type TLocationState = {
  currentPath: string;
};

export interface IPageNotFoundProps extends RouteComponentProps<{}, undefined, TLocationState> {}
