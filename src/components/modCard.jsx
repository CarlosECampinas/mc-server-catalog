import { useEffect, useState } from "react";
import modList from "../assets/data/mods.json";

export default function ModCard({ modId }) {
  const [showAddons, setShowAddons] = useState(false);

  const mod = modList.mods.find((m) => m.id === modId);
  const modName = mod ? mod.name : "Unknown Mod";
  const modlogoUrl = mod ? mod.modLogoUrl : "";
  const modLink = mod?.modLink || mod?.link || "#";

  // Resolve os IDs dos addons para os respectivos mods do catálogo.
  const validAddons = Array.isArray(mod?.addons)
    ? mod.addons
        .map((addonId) => modList.mods.find((item) => item.id === addonId))
        .filter(Boolean)
    : [];
  const relatedMods = mod
    ? modList.mods.filter((item) => item.addons?.includes(mod.id))
    : [];

  const hasRelatedMods = validAddons.length > 0 || relatedMods.length > 0;

  useEffect(() => {
    if (!showAddons) return;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setShowAddons(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [showAddons]);

  return (
    <div
      id={`mod-${modId}`}
      className="h-fit w-full rounded-xl border border-white/10 bg-gray-900 p-3 text-white shadow-sm transition hover:border-lime-300/20 sm:p-4"
    >
      <div className="flex flex-col xs:flex-row sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
        {/* Logo responsiva com tamanho controlado */}
        <a
          href={modLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-gray-950 p-1.5 sm:h-20 sm:w-20"
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
              className="truncate text-base font-bold transition-colors group-hover:text-lime-300 sm:text-lg"
            >
              {modName}
            </h3>
            <h4 className="truncate text-xs text-gray-500 sm:text-sm">
              V: {mod ? mod.version : "Unknown"}
            </h4>
          </a>

          {hasRelatedMods && (
            <button
              type="button"
              onClick={() => setShowAddons(true)}
              className="w-full cursor-pointer rounded-lg border border-lime-300/20 bg-lime-300/10 px-3 py-1.5 text-xs font-semibold text-lime-200 transition hover:bg-lime-300/20 sm:w-fit sm:text-sm"
            >
              Ver mais
            </button>
          )}
        </div>
      </div>

      {showAddons && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/80 p-4 backdrop-blur-sm"
          onClick={() => setShowAddons(false)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby={`related-title-${modId}`}
            className="max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-gray-900 p-5 text-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 id={`related-title-${modId}`} className="text-lg font-bold">
                Mods relacionados a {modName}
              </h2>
              <button
                type="button"
                onClick={() => setShowAddons(false)}
                aria-label="Fechar modal"
                className="rounded px-2 py-1 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                ✕
              </button>
            </div>

            {validAddons.length > 0 && (
              <div className="mb-4">
                <h3 className="mb-2 text-sm font-semibold text-gray-300">Addons e dependências</h3>
                <div className="flex flex-col gap-2">
                  {validAddons.map((addon) => (
                    <a
                      key={addon.id}
                      href={`#mod-${addon.id}`}
                      onClick={() => setShowAddons(false)}
                      className="rounded-lg border border-white/5 bg-gray-800 px-3 py-2 text-lime-200 transition hover:bg-gray-700 hover:underline"
                    >
                      {addon.name}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {relatedMods.length > 0 && (
              <div>
                <h3 className="mb-2 text-sm font-semibold text-gray-300">Mods que se relacionam com este</h3>
                <div className="flex flex-col gap-2">
                  {relatedMods.map((related) => (
                    <a
                      key={related.id}
                      href={`#mod-${related.id}`}
                      onClick={() => setShowAddons(false)}
                      className="rounded-lg border border-white/5 bg-gray-800 px-3 py-2 text-lime-200 transition hover:bg-gray-700 hover:underline"
                    >
                      {related.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
