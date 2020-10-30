import * as React from "react";
import { renderRoutes } from "react-router-config";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { push } from "connected-react-router";
// import { createSelector } from "reselect";
import { withRouter } from "react-router";
// my import
import { isToken } from "../../helpers/configsHelper";
import { addNews, addUser, pageNotFound, rootAllNews } from "../../routes/path";
import { routes } from "../../routes/routes";
import { loginModalAction } from "../../store/loginModalReducer/loginModalReducer";
import PageNotFound from "../../containers/PageNotFound/PageNotFound";
import { IRenderRoutesProps } from "./RenderRoutes.type";
import { IRoutes } from "../../routes/routes.type";

const RenderRoute: React.FC<IRenderRoutesProps> = (props) => {
  const { location } = props;
  const dispatch = useDispatch()

  useEffect(() => {
    const pathNotAccess = [addNews, addUser];
    const currentPathNotAccess = pathNotAccess.includes(location.pathname);

    if (!isToken && currentPathNotAccess) {
      dispatch(push(rootAllNews));
      dispatch(loginModalAction(true));
    }
  }, [dispatch, location.pathname])

  if (location.pathname === pageNotFound) {
    return <PageNotFound />;
  }

  return renderRoutes(routes as IRoutes[]);
};

export default withRouter(RenderRoute);

//! Отказался от данного функционала по причине того, что он при переходе на страницу addNews при разлогине
//! редиректил на 404 а должен был открывать модалку
// Удаляем из роутов роуты для которых нужен доступ (pathNotAccess)
//? createSelector работает следующим образом - принимает в аргументы до 12 селекторов,
//? Последний аргумент всегда будет combiner который принимает все селекторы
// const filterRoute = createSelector(
//     ({ routesList, pathNotAccess }) => ({ routesList, pathNotAccess }),
//     ({ routesList, pathNotAccess }) => routesList.filter(value => !pathNotAccess.includes(value.path))
// );

// if (!isToken()) {
//   routes[0].routes = filterRoute({routesList: routes[0].routes, pathNotAccess});
//   return renderRoutes(routes)
// }
