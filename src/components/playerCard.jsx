import { useState } from "react";
import Skin3D from "./playerSkin.jsx";
import ModCard from "./modCard.jsx";
import playersData from "../assets/data/players.json";

export default function PlayerCard({ playerId }) {
  const player = playersData.find((p) => p.id === playerId);
  if (!player) {
    return (
      <div className="p-4 bg-gray-700 text-white rounded-lg shadow-lg">
        Player not found
      </div>
    );
  }

  const {
    nickname,
    name,
    playerSkinImage,
    PlayerSkinAltImage,
    capeUrl,
    mod1,
    mod2,
  } = player;

  const [skynUrl] = useState(
    playerSkinImage && Math.random() < 1 / 5
      ? PlayerSkinAltImage || playerSkinImage
      : playerSkinImage,
  );

  return (
    <div
      id="player-card"
      className="flex flex-col md:flex-row items-center md:items-stretch gap-4 p-4 bg-gray-700 text-white rounded-xl shadow-lg w-full min-w-0 h-full"
    >
      {/* Skin 3D */}
      <div className="shrink-0 flex items-center justify-center bg-gray-800/70 rounded-xl p-2 w-full md:w-44 lg:w-48 min-h-52">
        <Skin3D skinUrl={skynUrl} capeUrl={capeUrl} />
      </div>

      {/* Info + Mods */}
      <div className="flex-1 min-w-0 w-full flex flex-col justify-between gap-4">
        <div
          id="player-info"
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-800/40 p-3 rounded-xl border border-gray-600/40"
        >
          <div className="min-w-0">
            <span className="block text-xs font-bold uppercase tracking-wider text-gray-400">
              Nickname
            </span>
            <h2
              className="text-base sm:text-lg font-bold text-white truncate"
              title={nickname}
            >
              {nickname}
            </h2>
          </div>

          <div className="min-w-0">
            <span className="block text-xs font-bold uppercase tracking-wider text-gray-400">
              Name
            </span>
            <h3
              className="text-base sm:text-lg font-semibold text-gray-200 truncate"
              title={name}
            >
              {name}
            </h3>
          </div>
        </div>

        <div id="player-mods" className="flex flex-col gap-2 min-w-0">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Mods:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 min-w-0">
            {mod1 && <ModCard modId={mod1} />}
            {mod2 && <ModCard modId={mod2} />}
          </div>
        </div>
      </div>
    </div>
  );
}
