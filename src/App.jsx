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
        <Route path="/" element={<h1>Nada Aqui Ainda va para Players</h1>} />
        <Route path="/player" element={<PlayerScreen />} />
        <Route
          path="/ModPack"
          element={<h1>Nada Aqui Ainda va para Players</h1>}
        />
        <Route path="/Create" element={<h1>Nada Aqui</h1>} />
      </Routes>
    </>
  );
}

export default App;
