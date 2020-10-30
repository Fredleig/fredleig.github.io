import { IRoutes } from "../../../routes/routes.type";
import { Location } from "history";

export interface INavigationProps {
  routes: IRoutes[]
  location?: Location;
  title: string
}
