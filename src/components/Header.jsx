import { Link } from "react-router";
import { Pickaxe } from "lucide-react";
export default function Header({ inDev = false }) {
  return (
    <header className="flex flex-wrap justify-between items-center gap-3 p-4 bg-gray-900 text-white border-b border-white/10">
      <div id="logo">
        <Link to="/" className="text-lg font-extrabold tracking-tight hover:text-lime-300">CashMine</Link>
      </div>
      <nav id="nav" aria-label="Navegação principal" className="flex gap-4 text-sm text-gray-300">
        <Link className="transition hover:text-lime-300" to="/">Home</Link>
        <Link className="transition hover:text-lime-300" to="/player">Jogadores</Link>
        <Link className="transition hover:text-lime-300" to="/ModPack">Mods</Link>
        {inDev ? <Link className="transition hover:text-lime-300" to="/Create">Admin</Link> : ""}
      </nav>
      <div className="flex items-center gap-2 rounded-full border border-lime-300/20 bg-lime-300/10 px-3 py-1.5 text-xs font-semibold text-lime-200">
        <Pickaxe className="h-4 w-4" /> Minecraft
      </div>
    </header>
  );
}
