import { RouteConfig } from "react-router-config";

export interface IRoutes extends Omit<RouteConfig, "routes"> {
  // Имя страницы
  name?: string;
  // Роуты навигационного меню (слева)
  navMenu?: boolean;
  // Роуты меню пользователя (сверху)
  userMenu?: boolean;
  routes?: IRoutes[];
}
