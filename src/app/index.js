import React from 'react';
import { createRoot } from 'react-dom/client';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import { BlogLandingPage } from "./components/BlogLanding";
import { Header } from "./components/Header";
import { SiteLandingPage } from "./components/SiteLandingPage";

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <BrowserRouter>
        <Header />

        <Routes>
            <Route path="/blog/:id" element={<BlogLandingPage />}/>
            <Route path="/" element={<SiteLandingPage />}/>
        </Routes>
    </BrowserRouter>
);