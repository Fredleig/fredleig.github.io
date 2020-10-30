import { renderRoutes } from "react-router-config";
import * as React from "react";
import { IRouteComponentPropsType } from "../../routes/RouteComponentProps.type";

export const Content: React.FC<IRouteComponentPropsType> = ({ route }) =>
  renderRoutes(route.routes);
