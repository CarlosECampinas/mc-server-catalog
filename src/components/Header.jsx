import React from "react";
import { Link } from "react-router";
export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div id="logo">
        <h1>CashMine</h1>
      </div>
      <div id="nav" className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/player">player</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div>Server is online</div>
    </header>
  );
}
