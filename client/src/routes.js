import React from "react";
const Login = React.lazy(() => import("./pages/login"));
const Register = React.lazy(() => import("./pages/register"));
const Admin = React.lazy(() => import("./pages/admin"));
const Account = React.lazy(() => import("./pages/account"));
const Dashboard = React.lazy(() => import("./pages/dashboard"));
const routes = [
  {
    enabled: true,
    path: "/login",
    component: Login,
    header: null,
  },
  {
    enabled: true,
    path: "/register",
    component: Register,
    header: null,
  },
  {
    enabled: true,
    path: "/admin",
    component: Admin,
    header: null,
  },
  {
    enabled: true,
    path: "/account",
    component: Account,
    header: null,
  },
  {
    enabled: true,
    path: "/dashboard",
    component: Dashboard,
    header: null,
  },
];

export default routes.filter((route) => route.enabled);