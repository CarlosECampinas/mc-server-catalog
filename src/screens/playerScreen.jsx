import PlayerCard from "../components/playerCard.jsx";
import playersData from "../assets/data/players.json";
export default function PlayerScreen() {
  return (
    <div className="grid grid-cols-2 gap-4  justify-center items-center p-4 bg-gray-600 text-white h-full">
      {playersData.map((player) => (
        <PlayerCard key={player.id} playerId={player.id} />
      ))}
    </div>
  );
}
