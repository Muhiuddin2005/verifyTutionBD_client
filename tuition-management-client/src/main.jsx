import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import './index.css'
import RootLayout from './layouts/RootLayout.jsx';
import Home from './pages/Home/Home.jsx';
import Coverage from './pages/Coverage/Coverage.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';
import Login from './pages/Auth/Login/Login.jsx';
import Register from './pages/Auth/Register/Register.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, element: <Home /> },
      { path: "coverage", element: <Coverage /> }
    ]
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
