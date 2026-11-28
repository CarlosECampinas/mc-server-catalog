import { useState, useMemo } from "react";
import { Search, Package, X } from "lucide-react";
import ModCard from "../components/modCard.jsx";
import modList from "../assets/data/mods.json";

export default function ModScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const mods = Array.isArray(modList?.mods) ? modList.mods : [];

  const filteredMods = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return mods;

    return mods.filter((mod) => {
      const name = (mod?.name || "").toLowerCase();
      const id = (mod?.id || "").toLowerCase();
      const version = (mod?.version || "").toLowerCase();

      return (
        name.includes(query) || id.includes(query) || version.includes(query)
      );
    });
  }, [mods, searchTerm]);

  return (
    <div className="p-4 bg-gray-600 text-white min-h-full">
      {/* Barra superior com contador e pesquisa */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="inline-flex items-center gap-2 bg-gray-700/80 border border-gray-500/50 px-3 py-1.5 rounded-lg text-xs font-semibold w-fit">
          <Package className="w-4 h-4 text-[#b4ee55]" />
          <span>
            {searchTerm.trim()
              ? `${filteredMods.length} de ${mods.length} mods`
              : `${mods.length} ${mods.length === 1 ? "mod cadastrado" : "mods cadastrados"}`}
          </span>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar mod por nome ou versão..."
            className="w-full bg-gray-700 border border-gray-500 focus:border-[#b4ee55] rounded-lg pl-9 pr-8 py-2 text-xs text-white placeholder-gray-400 outline-none"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              title="Limpar pesquisa"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-0.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Grid de Mods */}
      {filteredMods.length === 0 ? (
        <div className="bg-gray-700/60 border border-gray-500/40 rounded-xl p-8 text-center text-sm text-gray-300">
          Nenhum mod encontrado para "{searchTerm}".
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
          {filteredMods.map((mod, index) => (
            <ModCard key={`${mod.id}-${index}`} modId={mod.id} />
          ))}
        </div>
      )}
    </div>
  );
}
