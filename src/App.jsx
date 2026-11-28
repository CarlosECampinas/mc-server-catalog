import { useState } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import Header from "./components/Header.jsx";

import PlayerScreen from "./screens/playerScreen.jsx";
import PlayerEditor from "./screens/PlayerEditor.jsx";
import ModScreen from "./screens/ModScreen.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomeScreen />} />
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
