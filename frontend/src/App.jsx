import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Landingpage/Header";
import Marquee from "./components/Landingpage/Marquee";
import Hero2 from "./components/Landingpage/Hero2";
import Hero3 from "./components/Landingpage/Hero3";
import Award from "./components/Landingpage/Award";
import Contact from "./components/Landingpage/Contact";
import Footer from "./components/Landingpage/Footer";
import Login from "./components/Landingpage/Login";
import Signup from "./components/Landingpage/Signup";
import "./App.css";

// ── Landing page assembled from existing sections ─────────
const HomePage = () => (
  <div className="overflow-x-hidden">
    <Header />
    <Marquee />
    <Hero2 />
    <Hero3 />
    <Award />
    <Contact />
    <Footer />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;