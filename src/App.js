// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HeroSection from "./components/HeroSection";
import WhyChoose from "./components/WhyChoose";
import PopularItems from "./components/PopularItems";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";
import MenuPage from "./components/MenuPage";
import AuthPage from "./components/AuthPage";
import NormalUserPage from "./components/NormalUserPage";
import CartPage from "./components/CartPage";
import Navbar from "./components/Navbar"; // 👈 import it

function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyChoose />
      <PopularItems />
      <HowItWorks />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Navbar /> {/* 👈 use it once, it appears on all pages */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/AuthPage" element={<AuthPage />} />
        <Route path="/cartPage" element={<CartPage />} />
        <Route path="/user" element={<NormalUserPage />} />
      </Routes>
    </Router>
  );
}

export default App;
