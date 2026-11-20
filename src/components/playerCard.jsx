import React from "react";
import Skin3D from "./playerSkin.jsx";
import ModCard from "./modCard.jsx";
import rfToolsLogo from "../assets/imgs/mods-logo/rftools.jpg";
export default function PlayerCard(nikName, name, skinUrl) {
  return (
    <div
      id="player-card"
      className=" grid grid-cols-2 grid-rows-2 gap-4 justify-center items-center p-4 bg-gray-700 text-white h-1/2 w-1/3 rounded-lg shadow-lg"
    >
      <Skin3D skinUrl={skinUrl} className="row-span-2" />
      <div id="player-info" className="flex flex-col justify-center ">
        <h2 className="text-lg font-bold text-gray-400">Nickname:</h2>
        <h2>{nikName}</h2>
        <h3 className="text-lg font-bold text-gray-400">Name:</h3>
        <h3>{name}</h3>
      </div>
      <div id="player-mods" className="flex flex-col justify-center">
        <h4 className="text-md font-bold text-gray-400">Mods:</h4>
        <ul className="list-disc list-inside">
          <ModCard
            modName="RF Tools"
            modlogoUrl={rfToolsLogo}
            modLink=""
          />
        </ul>
      </div>
    </div>
  );
}
