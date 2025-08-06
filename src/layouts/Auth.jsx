import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// components
import Navbar from "components/Navbars/AuthNavbar.jsx";
import FooterSmall from "components/Footers/FooterSmall.jsx";

// views
import Login from "views/auth/Login.jsx";
import Register from "views/auth/Register.jsx";

export default function Auth() {
  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                "url(" + require("assets/img/register_bg_2.png") + ")",
            }}
          ></div>
          <Routes>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth" element={<Navigate to="/auth/login" />} />
          </Routes>
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
