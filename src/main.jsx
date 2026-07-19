import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import Home from "./pages/Home/Home.jsx";
import MovieDetails from "./pages/MovieDetails/MovieDetails.jsx";
import App from "./App";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes >
         <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="movie/:id" element={<MovieDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
