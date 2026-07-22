import { createBrowserRouter, Navigate } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/dashboard/Dashboard";

import ProjectList from "../pages/projects/ProjectList";
import CreateProject from "../pages/projects/CreateProject";
import EditProject from "../pages/projects/EditProject";
import ProjectDetails from "../pages/projects/ProjectDetails";

import CategoryList from "../pages/categories/CategoryList";
import CreateCategory from "../pages/categories/CreateCategory";
import EditCategory from "../pages/categories/EditCategory";

import TaskList from "../pages/tasks/TaskList";
import CreateTask from "../pages/tasks/CreateTask";
import EditTask from "../pages/tasks/EditTask";
import TaskDetails from "../pages/tasks/TaskDetails";

import UserList from "../pages/users/UserList";
import CreateUser from "../pages/users/CreateUser";
import EditUser from "../pages/users/EditUser";
import UserDetails from "../pages/users/UserDetails";

import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUsers from "../pages/admin/AdminUsers";

import Forbidden from "../pages/Forbidden";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },

  // Public Routes
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

// Protected Routes
{
  element: (
    <ProtectedRoute>
      <AppLayout />
    </ProtectedRoute>
  ),
  children: [

    // ================= Dashboard =================

    {
      path: "/dashboard",
      element: <Dashboard />,
    },

    // ================= Admin =================

    {
      path: "/admin/dashboard",
      element: (
        <ProtectedRoute roles={["ADMIN"]}>
          <AdminDashboard />
        </ProtectedRoute>
      ),
    },

    {
      path: "/admin/users",
      element: (
        <ProtectedRoute roles={["ADMIN"]}>
          <AdminUsers />
        </ProtectedRoute>
      ),
    },

    // ================= Projects =================

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

    // ================= Categories =================

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

    // ================= Tasks =================

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

    // ================= Users =================

    {
      path: "/users",
      element: <UserList />,
    },

    {
      path: "/users/new",
      element: <CreateUser />,
    },

    {
      path: "/users/:id",
      element: <UserDetails />,
    },

    {
      path: "/users/edit/:id",
      element: <EditUser />,
    },

    // ================= Others =================

    {
      path: "/403",
      element: <Forbidden />,
    },
  ],
},
]);