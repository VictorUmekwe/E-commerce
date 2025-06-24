import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage.tsx";
import ProductPage from "./pages/ProductPage.tsx";



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
         <Route index element={<HomePage/>}/>
         <Route path='product/:slug' element={<ProductPage/>}/>
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder={false} />
    </Provider>
  </StrictMode>
);
