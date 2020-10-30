import { RouteComponentProps } from "react-router";
import { IRoutes } from "./routes.type";

export interface IRouteComponentPropsType<Params extends { [K in keyof Params]?: string } = {}>
  extends RouteComponentProps<Params> {
  route?: IRoutes;
}
