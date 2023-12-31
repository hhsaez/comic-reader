import React from 'react';
import ReactGA from "react-ga4";
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import Library from './routes/Library';
import Reader, { readerLoader } from './routes/Reader';

// Initialize GA
ReactGA.initialize("G-G5JX7T81HT");

// Use a hash router in order to make it work with Github pages
const router = createHashRouter([
  { path: '/', element: <Library /> },
  { path: '/library', element: <Library /> },
  { path: '/reader/:id/:chapter', element: <Reader />, loader: readerLoader },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
