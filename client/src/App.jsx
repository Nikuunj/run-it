import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Header from './component/Header';
import Footer from './component/Footer';
import OnlyJs from './pages/OnlyJs';
import ThreeInOne from './pages/ThreeInOne';
import { useRef } from "react";
import AppContext from './component/AppContext';
import AnimatedComponent from './pages/AnimatedComponent';

function App() {
  const constraintsRef = useRef(null);

  const Layout = () => (
    <div className='bg-zinc-800 overflow-hidden max-h-fit text-slate-200'>
      <Header />
    <div className="container overflow-hidden" ref={constraintsRef}>
      <AppContext.Provider value={constraintsRef}>
        <Outlet />
      </AppContext.Provider>
    </div>
      <Footer />
    </div>
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <p>Error.....</p>,
      children: [
        {
          path: "/",
          element: <OnlyJs />
        },
        {
          path: "/3",
          element: <ThreeInOne />
        },
        {
          path:'/a',
          element:<AnimatedComponent/>
        },
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
