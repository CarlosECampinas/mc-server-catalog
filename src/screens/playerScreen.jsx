import PlayerCard from "../components/playerCard.jsx";
import playersData from "../assets/data/players.json";
import { Search, Users, X, UserRound } from "lucide-react";
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
    <main className="min-h-[calc(100vh-68px)] bg-gray-950 px-4 py-8 text-white sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <section className="mb-6 rounded-3xl border border-lime-300/15 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-lime-300">
                <UserRound className="h-4 w-4" /> Comunidade CashMine
              </div>
              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Jogadores</h1>
              <p className="mt-2 text-sm leading-6 text-gray-400">Conheça a comunidade, seus nicks e skins.</p>
            </div>
            <div className="flex items-center gap-2 self-start rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold sm:self-auto">
              <Users className="h-4 w-4 text-lime-300" />
              <span>{playersData.length} jogadores</span>
            </div>
          </div>
        </section>

        <div className="relative mb-6 max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nome ou nickname..."
            className="w-full rounded-xl border border-white/10 bg-gray-900 py-3 pl-11 pr-10 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-lime-300/50 focus:ring-2 focus:ring-lime-300/10"
          />
          {searchTerm && (
            <button type="button" onClick={() => setSearchTerm("")} title="Limpar busca" className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-gray-400 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {filtredPlayers.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-gray-900 p-10 text-center text-sm text-gray-400">
            Nenhum jogador encontrado para “{searchTerm}”.
          </div>
        ) : (
          <div className="grid w-full grid-cols-1 items-stretch gap-4 xl:grid-cols-2">
            {filtredPlayers.map((player, index) => <PlayerCard key={`${player.id}-${index}`} playerId={player.id} />)}
          </div>
        )}
      </div>
    </main>
  );
}
