import { useState } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import Header from "./components/Header.jsx";

import PlayerScreen from "./screens/playerScreen.jsx";
import PlayerEditor from "./screens/PlayerEditor.jsx";
import ModScreen from "./screens/ModScreen.jsx";
function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<h1>Nada Aqui Ainda va para Players</h1>} />
        <Route path="/player" element={<PlayerScreen />} />
        <Route path="/ModPack" element={<ModScreen />} />
        {import.meta.env.DEV && (
          <Route path="/Create" element={<PlayerEditor />} />
        )}
      </Routes>
    </>
  );
}

export default App;
