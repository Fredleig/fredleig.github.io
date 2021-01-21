import React from "react";
import Users from "../containers/Users/Users";
import Albums from "../containers/Albums/Albums";
import Photos from "../containers/Photos/Photos";

export type TRoutes = {
  key: string;
  staticName?: ENamesRoute;
  dynamicName?: ENamesRoute;
  path: string;
  exact?: boolean;
  component: React.ComponentType<any> | React.FunctionComponent<any>;
};

export enum ENamesRoute {
  home = "Home",
  userName = "userName",
  albumName = "albumName",
}

export const rootPath = "/";
export const albumsPath = `${rootPath}users/:id_user/albums`;
export const photosPath = `${albumsPath}/:id_album/photos`;

export const routes: TRoutes[] = [
  {
    key: "home",
    staticName: ENamesRoute.home,
    path: rootPath,
    exact: true,
    component: Users,
  },
  {
    key: "user",
    dynamicName: ENamesRoute.userName,
    exact: true,
    path: albumsPath,
    component: Albums,
  },
  {
    key: "photos",
    dynamicName: ENamesRoute.albumName,
    path: photosPath,
    component: Photos,
  },
];
