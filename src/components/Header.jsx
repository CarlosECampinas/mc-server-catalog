import React from "react";
import { Link } from "react-router";
let serverStatus = "offline"; // This should be dynamically fetched from your server status API
export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div id="logo">
        <h1>CashMine</h1>
      </div>
      <div id="nav" className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/player">player</Link>
        <Link to="/ModPack">Mods</Link>
      </div>
      <div>
        Server is{" "}
        <span
          className={
            serverStatus === "online" ? "text-green-500" : "text-red-500"
          }
        >
          {serverStatus}
        </span>
      </div>
    </header>
  );
}
