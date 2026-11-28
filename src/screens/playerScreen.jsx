import PlayerCard from "../components/playerCard.jsx";
import playersData from "../assets/data/players.json";
import { Search, Users, X } from "lucide-react";
import { useMemo, useState } from "react";

export default function PlayerScreen() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtredPlayers = useMemo(() => {
    const query = searchTerm.trim().toLocaleLowerCase();
    if (!query) return playersData;

    return playersData.filter((player) => {
      const name = (player?.name || "").toLocaleLowerCase();
      const nickname = (player?.nickname || "").toLocaleLowerCase();
      const id = (player?.id || "").toLocaleLowerCase();

      return (
        name.includes(query) || nickname.includes(query) || id.includes(query)
      );
    });
  }, [searchTerm]);

  return (
    <div className="flex flex-col gap-4 p-3 sm:p-4 bg-gray-600 text-white min-h-full w-full">
      {/* Barra de pesquisa e contador */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full">
        <div className="bg-gray-700 flex items-center rounded-xl flex-1 min-w-0 relative px-3 py-2 border border-gray-600/60 focus-within:border-gray-400">
          <Search className="w-4 h-4 text-gray-400 shrink-0 mr-2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar por nome ou nick..."
            className="bg-transparent w-full text-xs sm:text-sm text-white placeholder-gray-400 outline-none pr-6"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              title="Limpar pesquisa"
              className="text-gray-400 hover:text-white p-0.5 cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="bg-gray-700 flex items-center justify-center rounded-xl px-4 py-2.5 sm:py-2 gap-2 shrink-0 border border-gray-600/60 text-xs sm:text-sm font-semibold">
          <Users className="w-4 h-4 text-white shrink-0" />
          <p className="whitespace-nowrap">
            <span>{playersData.length}</span>/15
          </p>
        </div>
      </div>

      {/* Lista de jogadores */}
      {filtredPlayers.length === 0 ? (
        <div className="bg-gray-700/70 border border-gray-500/40 rounded-xl p-8 text-center text-sm text-gray-300">
          Nenhum player encontrado para "{searchTerm}".
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 items-stretch w-full">
          {filtredPlayers.map((player, index) => (
            <PlayerCard key={`${player.id}-${index}`} playerId={player.id} />
          ))}
        </div>
      )}
    </div>
  );
}
