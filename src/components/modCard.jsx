import modList from "../assets/data/mods.json";
export default function ModCard({ modId }) {
  const mod = modList.mods.find((m) => m.id === modId);
  const modName = mod ? mod.name : "Unknown Mod";
  const modlogoUrl = mod ? mod.modLogoUrl : "";
  const modLink = mod ? mod.link : "#";
  return (
    <div className="bg-gray-700 text-white p-4 rounded-lg shadow-lg h-fit">
      <a
        href={modLink}
        target="_blank"
        rel="noopener noreferrer"
        className="grid grid-cols-2 grid-rows-2 justify-center items-center gap-x-2"
      >
        <img src={modlogoUrl} alt={modName} className=" row-span-2 " />
        <div>
          <h3 className="text-lg font-bold text-nowrap wrap-break-word dot-ellipsis overflow-hidden">
            {modName}
          </h3>
          <h4 className="text-sm text-gray-400">
            V: {mod ? mod.version : "Unknown"}
          </h4>
        </div>
        {}
        <button className=" px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Addons
        </button>
      </a>
    </div>
  );
}
