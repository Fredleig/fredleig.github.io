import { Dispatch } from "redux";
import { IRoutes } from "../../routes/routes.type";

export interface INextStatePropsUserMenu {
  isOpenLoginModal: boolean;
  access: boolean;
}

export interface IUserMenuProps extends INextStatePropsUserMenu {
  dispatch?: Dispatch;
  title: string;
  routes: IRoutes[];
}
