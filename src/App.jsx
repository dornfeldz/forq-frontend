import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Dashboard from "./dashboard/Dashboard.jsx";
import AppLayout from "./AppLayout.jsx";
import { SignedIn, SignedOut} from "@clerk/clerk-react";
import LandingPage from "./landing/LandingPage.jsx";

function App() {

  const router = createBrowserRouter([
    {
      element: <AppLayout/>,
      children: [
        {
          path: '/',
          element: <Dashboard/>
        }
      ]
    },
      {
          path: '/landing',
          element: <LandingPage/>,
      }
  ])

  return (
      <>
          <SignedOut>
              <LandingPage />
          </SignedOut>

          <SignedIn>
              <RouterProvider router={router} />
          </SignedIn>
      </>
  )
}

export default App
