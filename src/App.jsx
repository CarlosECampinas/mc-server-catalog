import { useState } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import Header from "./components/Header.jsx";
import playerCard from "./components/playerCard.jsx";
import playerSkinImage from "./assets/imgs/skins/0f71df3f2c33584b.png";
function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route
          path="/player"
          element={playerCard(
            "SolApollo_21",
            "Carlos Eduardo",
            playerSkinImage,
          )}
        />
        <Route path="/contact" element={<h1>Contact Page</h1>} />
      </Routes>
    </>
  );
}

export default App;
