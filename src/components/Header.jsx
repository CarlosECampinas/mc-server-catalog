import React from "react";
import { Link } from "react-router";
import { GlobeOff, GlobeCheck } from "lucide-react";
let serverStatus = "offline"; // This should be dynamically fetched from your server status API
export default function Header({ inDev = false }) {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div id="logo">
        <h1>CashMine</h1>
      </div>
      <div id="nav" className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/player">player</Link>
        <Link to="/ModPack">Mods</Link>
        {inDev ? <Link to="/Create">Admin</Link> : ""}
      </div>
      <div className="flex gap-1">
        Server is{" "}
        {serverStatus == "online" ? (
          <GlobeCheck color="oklch(72.3% 0.219 149.579)" />
        ) : (
          <GlobeOff color="oklch(57.7% 0.245 27.325)" />
        )}
      </div>
    </header>
  );
}
