import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react"
import Header from './component/Header';
import Footer from './component/Footer';
import OnlyJs from './pages/OnlyJs';
import ThreeInOne from './pages/ThreeInOne';
import { useRef } from "react";
import AppContext from './component/AppContext';
import { motion } from 'framer-motion';

function App() {
  const constraintsRef = useRef(null);

  const Layout = () => (
    <div className='bg-zinc-800 text-slate-200'>
      <Header />
    <motion.div className="container overflow-hidden mt-[9.5vh]" ref={constraintsRef}>
      <AppContext.Provider value={constraintsRef}>
        <Outlet />
      </AppContext.Provider>
    </motion.div>
      <Footer />
      <Analytics />
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
          path: "/merge",
          element: <ThreeInOne />
        },
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
