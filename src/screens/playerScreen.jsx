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
    <div className="grid grid-cols-2 gap-4  justify-center items-center p-4 bg-gray-600 text-white h-full">
      <div className="col-span-2 flex row w-full h-10">
        <div className="bg-gray-700 flex items-center justify-center rounded-2xl w-2/3 relative p-2">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar por nome ou nick..."
            className=" bg-gray-700 border w-full border-transparent focus:border-gray-500 rounded-lg pl-9 pr-8 py-2 text-xs text-white placeholder-gray-400 outline-none"
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
        <div className="bg-gray-700 flex items-center justify-center rounded-2xl w-1/3 gap-2">
          <Users className="w-4 h-4 text-[#ffffff]" />
          <p>
            <span>{playersData.length}</span>/15
          </p>
        </div>
      </div>

      {filtredPlayers.length === 0 ? (
        <div className="bg-gray-700/60 border border-gray-500/40 rounded-xl p-8 text-center text-sm text-gray-300">
          Nenhum player encontrado para "{searchTerm}".
        </div>
      ) : (
        filtredPlayers.map((player, index) => (
          <PlayerCard key={`${player.id}-${index}`} playerId={player.id} />
        ))
      )}
    </div>
  );
}
