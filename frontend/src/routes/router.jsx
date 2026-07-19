import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";

import ProjectList from "../pages/projects/ProjectList";
import CreateProject from "../pages/projects/CreateProject";
import EditProject from "../pages/projects/EditProject";
import ProjectDetails from "../pages/projects/ProjectDetails";

import TaskList from "../pages/tasks/TaskList";
import CreateTask from "../pages/tasks/CreateTask";
import EditTask from "../pages/tasks/EditTask";
import TaskDetails from "../pages/tasks/TaskDetails";

import CategoryList from "../pages/categories/CategoryList";
import CreateCategory from "../pages/categories/CreateCategory";
import EditCategory from "../pages/categories/EditCategory";

import UserList from "../pages/users/UserList";
import UserDetails from "../pages/users/UserDetails";
import UserEdit from "../pages/users/UserEdit";

import NotFound from "../pages/NotFound";
import Forbidden from "../pages/Forbidden";

import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" />,
  },

  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },

  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },

      {
        path: "/projects",
        element: <ProjectList />,
      },

      {
        path: "/projects/new",
        element: <CreateProject />,
      },

      {
        path: "/projects/:id",
        element: <ProjectDetails />,
      },

      {
        path: "/projects/edit/:id",
        element: <EditProject />,
      },

      {
        path: "/tasks",
        element: <TaskList />,
      },

      {
        path: "/tasks/new",
        element: <CreateTask />,
      },

      {
        path: "/tasks/:id",
        element: <TaskDetails />,
      },

      {
        path: "/tasks/edit/:id",
        element: <EditTask />,
      },

      {
        path: "/categories",
        element: <CategoryList />,
      },

      {
        path: "/categories/new",
        element: <CreateCategory />,
      },

      {
        path: "/categories/edit/:id",
        element: <EditCategory />,
      },

      {
        path: "/users",
        element: <UserList />,
      },

      {
        path: "/users/:id",
        element: <UserDetails />,
      },

      {
        path: "/users/edit/:id",
        element: <UserEdit />,
      },

      {
        path: "/403",
        element: <Forbidden />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);