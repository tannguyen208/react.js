import React from "react";

/**
 * @constant
 * @type {React.ReactElement}
 */
import Error from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import AboutPage from "../pages/AboutPage";

const routes = [
  {
    path: "/",
    exact: true,
    component: HomePage
  },

  {
    path: "/login",
    exact: true,
    component: LoginPage
  },
  {
    path: "/about",
    component: AboutPage
  }
];

export default routes;
