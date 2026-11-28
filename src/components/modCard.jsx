import { useState } from "react";
import modList from "../assets/data/mods.json";

export default function ModCard({ modId }) {
  const [showAddons, setShowAddons] = useState(false);

  const mod = modList.mods.find((m) => m.id === modId);
  const modName = mod ? mod.name : "Unknown Mod";
  const modlogoUrl = mod ? mod.modLogoUrl : "";
  const modLink = mod?.modLink || mod?.link || "#";

  // Filtra apenas addons válidos (remove null, "null" e strings vazias)
  const validAddons = Array.isArray(mod?.addons)
    ? mod.addons.filter(
        (addon) => addon && String(addon).trim() !== "" && addon !== "null",
      )
    : [];

  const hasAddons = validAddons.length > 0;

  return (
    <div className="bg-gray-700 text-white p-3 sm:p-4 rounded-lg shadow-lg h-fit w-full transition-colors hover:bg-gray-700/90">
      <div className="flex flex-col xs:flex-row sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
        {/* Logo responsiva com tamanho controlado */}
        <a
          href={modLink}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-gray-800 rounded-lg p-1.5 flex items-center justify-center overflow-hidden"
        >
          {modlogoUrl ? (
            <img
              src={modlogoUrl}
              alt={modName}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          ) : (
            <span className="text-xs font-bold text-gray-400">MOD</span>
          )}
        </a>

        {/* Informações e botão condicional */}
        <div className="flex-1 min-w-0 w-full text-center sm:text-left flex flex-col justify-between gap-2">
          <a
            href={modLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block min-w-0 group"
          >
            <h3
              title={modName}
              className="text-base sm:text-lg font-bold truncate group-hover:text-blue-400 transition-colors"
            >
              {modName}
            </h3>
            <h4 className="text-xs sm:text-sm text-gray-400 truncate">
              V: {mod ? mod.version : "Unknown"}
            </h4>
          </a>

          {/* Botão só aparece se hasAddons for true */}
          {hasAddons && (
            <button
              type="button"
              onClick={() => setShowAddons((prev) => !prev)}
              className="w-full sm:w-fit px-3 py-1.5 bg-blue-500 text-white text-xs sm:text-sm font-medium rounded hover:bg-blue-600 transition-colors cursor-pointer"
            >
              {showAddons ? "Ocultar Addons" : `Addons (${validAddons.length})`}
            </button>
          )}
        </div>
      </div>

      {/* Lista expansível dos addons quando clicado */}
      {hasAddons && showAddons && (
        <div className="mt-3 pt-3 border-t border-gray-600">
          <span className="block text-xs text-gray-400 mb-1.5">
            Addons ({validAddons.length}):
          </span>
          <div className="flex flex-wrap gap-1.5">
            {validAddons.map((addon, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-gray-800 text-gray-200 rounded text-xs break-words"
              >
                {addon}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
