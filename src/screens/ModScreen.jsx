import { useState, useMemo } from "react";
import { Search, Package, X, Blocks } from "lucide-react";
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
    <main className="min-h-[calc(100vh-68px)] bg-gray-950 px-4 py-8 text-white sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <section className="mb-6 rounded-3xl border border-lime-300/15 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-lime-300">
                <Blocks className="h-4 w-4" /> Catálogo CashMine
              </div>
              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Mods do servidor</h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-400">
                Consulte versões e explore addons, dependências e compatibilidades relacionados.
              </p>
            </div>
            <div className="flex items-center gap-2 self-start rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold sm:self-auto">
              <Package className="h-4 w-4 text-lime-300" />
              <span>{searchTerm.trim() ? `${filteredMods.length} de ${mods.length} mods` : `${mods.length} mods cadastrados`}</span>
            </div>
          </div>
        </section>

        <div className="relative mb-6 max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nome, ID ou versão..."
            className="w-full rounded-xl border border-white/10 bg-gray-900 py-3 pl-11 pr-10 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-lime-300/50 focus:ring-2 focus:ring-lime-300/10"
          />
          {searchTerm && (
            <button type="button" onClick={() => setSearchTerm("")} title="Limpar busca" className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-gray-400 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {filteredMods.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-gray-900 p-10 text-center text-sm text-gray-400">
            Nenhum mod encontrado para “{searchTerm}”.
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMods.map((mod, index) => <ModCard key={`${mod.id}-${index}`} modId={mod.id} />)}
          </div>
        )}
      </div>
    </main>
  );
}
