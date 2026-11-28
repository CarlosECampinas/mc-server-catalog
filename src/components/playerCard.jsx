import { useState } from "react";
import Skin3D from "./playerSkin.jsx";
import ModCard from "./modCard.jsx";
import playersData from "../assets/data/players.json";

export default function PlayerCard({ playerId }) {
  const player = playersData.find((p) => p.id === playerId);
  if (!player) {
    return (
      <div className="rounded-2xl border border-white/10 bg-gray-900 p-5 text-gray-400">
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
      className="flex h-full w-full min-w-0 flex-col items-center gap-5 rounded-2xl border border-white/10 bg-gray-900 p-4 text-white shadow-lg transition hover:border-lime-300/20 sm:p-5 md:flex-row md:items-stretch"
    >
      {/* Skin 3D */}
      <div className="flex min-h-52 w-full shrink-0 items-center justify-center rounded-xl border border-white/5 bg-gradient-to-br from-gray-800 to-gray-950 p-2 md:w-44 lg:w-48">
        <Skin3D skinUrl={skynUrl} capeUrl={capeUrl} />
      </div>

      {/* Info + Mods */}
      <div className="flex-1 min-w-0 w-full flex flex-col justify-between gap-4">
        <div
          id="player-info"
          className="grid grid-cols-1 gap-3 rounded-xl border border-white/10 bg-gray-950/70 p-4 sm:grid-cols-2"
        >
          <div className="min-w-0">
            <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-lime-300/80">
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
            <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-lime-300/80">
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
          <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
            Mods em destaque
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
