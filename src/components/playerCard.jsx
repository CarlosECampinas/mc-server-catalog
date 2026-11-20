import React from "react";
import Skin3D from "./playerSkin.jsx";
import ModCard from "./modCard.jsx";
import playersData from "../assets/data/players.json";
export default function PlayerCard({ playerId }) {
  const player = playersData.find((p) => p.id === playerId);
  if (!player) {
    return <div>Player not found</div>;
  }
  const { nickname, name, playerSkinImage, mod1, mod2 } = player;
  console.log("Player Data:", player);
  return (
    <div
      id="player-card"
      className=" grid grid-cols-2 grid-rows-2 justify-center items-center p-4 bg-gray-700 text-white rounded-lg shadow-lg h-100"
    >
      <Skin3D skinUrl={playerSkinImage} className="row-span-2" />
      <div id="player-info" className="flex flex-col justify-center ">
        <h2 className="text-lg font-bold text-gray-400">Nickname:</h2>
        <h2>{nickname}</h2>
        <h3 className="text-lg font-bold text-gray-400">Name:</h3>
        <h3>{name}</h3>
      </div>
      <div id="player-mods" className="flex flex-col justify-center">
        <h4 className="text-md font-bold text-gray-400">Mods:</h4>
        <div className="grid grid-cols-2 gap-2 h-1/5">
          {mod1 && <ModCard modId={mod1} />}
          {mod2 && <ModCard modId={mod2} />}
        </div>
      </div>
    </div>
  );
}
