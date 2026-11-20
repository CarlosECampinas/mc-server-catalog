import { useState } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import Header from "./components/Header.jsx";

import PlayerScreen from "./screens/playerScreen.jsx";
function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/player" element={<PlayerScreen />} />
        <Route path="/contact" element={<h1>Contact Page</h1>} />
      </Routes>
    </>
  );
}

export default App;
