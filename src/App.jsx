import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import DashboardPage from '@/pages/Dashboard';
import NotFoundPage from '@/pages/NotFound';
import SigninPage from '@/pages/Signin';
import SignupPage from '@/pages/Signup';
import LoggedInLayout from '@/components/layout/LoggedInLayout';

const router = createBrowserRouter([
  {
    path: "",
    element: <LoggedInLayout/>,
    children: [
      {
        path: '/',
        element: <DashboardPage />
      }
    ]
  },
  {
    path: "/auth/signin",
    element: <SigninPage />,
  },
  {
    path: '/auth/signup',
    element: <SignupPage />
  },
  {
    path: '*',
    element: <NotFoundPage />
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
