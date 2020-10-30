import * as React from "react";
import { Redirect } from "react-router";
// import components
import BaseLayout from "../layouts/BaseLayout";
import AllNews from "../containers/Content/AllNews/AllNews";
import ReadMore from "../containers/Content/ReadMore/ReadMore";
import { Content } from "../layouts/Content/Content";
import CategoryNews from "../containers/Content/CategoryNews/CategoryNews";
import AddNews from "../containers/Content/AddNews/AddNews";
import AddUser from "../containers/Content/AddUser/AddUser";
import {
  rootAllNews,
  readMore,
  frontend,
  frontendReadMore,
  backend,
  backendReadMore,
  design,
  designReadMore,
  addNews,
  addUser,
  pageNotFound,
} from "./path";

const categories = [
  // Все новости
  {
    key: "all-news",
    name: "All news",
    path: rootAllNews,
    exact: true,
    component: AllNews,
  },
  {
    key: "all-news-empty",
    component: Content,
    path: "/news",
    routes: [
      {
        key: "news-more-all",
        path: readMore,
        component: ReadMore,
      },
    ],
  },
  // Фронтэнд
  {
    key: frontend,
    name: "Frontend",
    path: "/frontend",
    exact: true,
    navMenu: true,
    component: CategoryNews,
  },
  {
    key: "frontend-empty",
    path: "/frontend/news",
    component: Content,
    routes: [
      {
        key: "news-more-frontend",
        path: frontendReadMore,
        component: ReadMore,
      },
    ],
  },

  // Бэкенд
  {
    key: "backend",
    name: "Backend",
    path: backend,
    navMenu: true,
    exact: true,
    component: CategoryNews,
  },
  {
    key: "backend-empty",
    component: Content,
    path: "/backend/news",
    routes: [
      {
        key: "news-more-backend",
        path: backendReadMore,
        component: ReadMore,
      },
    ],
  },

  // Дизайн
  {
    key: "design",
    name: "Design",
    path: design,
    navMenu: true,
    exact: true,
    component: CategoryNews,
  },
  {
    key: "design-empty",
    component: Content,
    path: "/design/news",
    routes: [
      {
        key: "news-more-design",
        path: designReadMore,
        component: ReadMore,
      },
    ],
  },
];

const userMenu = [
  {
    key: "addNews",
    name: "Add news",
    path: addNews,
    userMenu: true,
    component: AddNews,
  },
  {
    key: "addUser",
    name: "Add user",
    path: addUser,
    userMenu: true,
    component: AddUser,
  },
];

const notFoundRedirect = {
  key: "redirect-404",
  component: () => (
    <Redirect to={{ pathname: pageNotFound, state: { currentPath: window.location.href } }} />
  ),
};

export const routes = [
  {
    key: "base-layout",
    component: BaseLayout,
    path: "/",
    routes: [...categories, ...userMenu, notFoundRedirect],
  },
];
