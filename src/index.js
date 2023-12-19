// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import VisitRequest from "./page/VisitRequest.js";
import CheckboxComponent from "./page/CheckboxComponent.js";
import ApplicationContextProvider from "./context/ApplicationContextProvider.js";
import reportWebVitals from "./reportWebVitals";
import ThankYou from "./page/Thanks.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/visit-request",
    element: <VisitRequest />,
  },
  {
    path: "/drinks-snacks",
    element: <CheckboxComponent />,
  },
  {
    path: "/thank-you",
    element: <ThankYou />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApplicationContextProvider>
      <RouterProvider router={router} />
    </ApplicationContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
