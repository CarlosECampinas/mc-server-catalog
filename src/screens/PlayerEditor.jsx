import { useEffect, useState } from "react";
import "./PlayerEditor.css";

const emptyPlayer = () => ({ id: "", nickname: "", name: "", playerSkinImage: "", PlayerSkinAltImage: "", capeUrl: "", mod1: "", mod2: "" });
const fields = [
  ["id", "ID"], ["nickname", "Nickname"], ["name", "Nome"],
  ["playerSkinImage", "Imagem da skin"], ["PlayerSkinAltImage", "Skin alternativa (opcional)"],
  ["capeUrl", "Capa (opcional)"], ["mod1", "Mod 1"], ["mod2", "Mod 2 (opcional)"],
];

export default function PlayerEditor() {
  const [players, setPlayers] = useState([]);
  const [form, setForm] = useState(emptyPlayer);
  const [editing, setEditing] = useState(null);
  const [status, setStatus] = useState("Carregando jogadores…");
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function loadPlayers() {
    try {
      const response = await fetch("/api/players");
      if (!response.ok) throw new Error("Servidor local indisponível");
      setPlayers(await response.json());
      setStatus("");
    } catch {
      setStatus("Inicie também o servidor do editor: npm run players:server");
    }
  }
  useEffect(() => { loadPlayers(); }, []);

  function editPlayer(player, index) {
    setForm({ ...emptyPlayer(), ...player });
    setEditing(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function resetForm() { setForm(emptyPlayer()); setEditing(null); }

  async function uploadSkin(file, field) {
    if (!file) return;
    setUploading(true);
    setStatus("Enviando imagem…");
    try {
      const data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result).split(",")[1]);
        reader.onerror = () => reject(new Error("Não foi possível ler a imagem."));
        reader.readAsDataURL(file);
      });
      const response = await fetch("/api/skins", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: file.name, type: file.type, data }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Não foi possível salvar a imagem.");
      setForm((current) => ({ ...current, [field]: result.path }));
      setStatus(`Imagem salva em public${result.path}`);
    } catch (error) { setStatus(error.message); }
    finally { setUploading(false); }
  }

  async function submit(event) {
    event.preventDefault();
    const normalized = { ...form, mod2: form.mod2.trim() || null };
    if (!normalized.PlayerSkinAltImage?.trim()) delete normalized.PlayerSkinAltImage;
    else normalized.PlayerSkinAltImage = normalized.PlayerSkinAltImage.trim();
    for (const key of ["id", "nickname", "name", "playerSkinImage", "capeUrl", "mod1"]) normalized[key] = String(normalized[key] ?? "").trim();
    if (players.some((p, i) => p.id.toLowerCase() === normalized.id.toLowerCase() && i !== editing)) {
      setStatus("Já existe um jogador com esse ID."); return;
    }
    const next = [...players];
    if (editing === null) next.push(normalized); else next[editing] = normalized;
    setBusy(true);
    try {
      const response = await fetch("/api/players", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(next) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Não foi possível salvar.");
      setPlayers(next); resetForm(); setStatus("JSON salvo em src/assets/data/players.json");
    } catch (error) { setStatus(error.message); }
    finally { setBusy(false); }
  }

  async function removePlayer(index) {
    if (!window.confirm(`Remover ${players[index].nickname}?`)) return;
    const next = players.filter((_, i) => i !== index);
    setBusy(true);
    try {
      const response = await fetch("/api/players", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(next) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Não foi possível salvar.");
      setPlayers(next); if (editing === index) resetForm(); setStatus("Jogador removido e JSON salvo.");
    } catch (error) { setStatus(error.message); }
    finally { setBusy(false); }
  }

  return <main className="player-editor">
    <header className="editor-heading"><div><span className="editor-kicker">FERRAMENTA LOCAL</span><h1>Jogadores</h1><p>Cadastre os jogadores e salve direto no JSON do catálogo.</p></div><span className="player-count">{players.length} jogadores</span></header>
    {status && <div className="editor-status" role="status">{status}</div>}
    <form className="player-form" onSubmit={submit}>
      <h2>{editing === null ? "Novo jogador" : `Editando ${form.nickname || form.id}`}</h2>
      <div className="editor-fields">{fields.map(([key, label]) => <label key={key}>{label}<input value={form[key] ?? ""} onChange={(e) => setForm({ ...form, [key]: e.target.value })} required={!key.includes("Alt") && key !== "capeUrl" && key !== "mod2"} placeholder={key.includes("Image") || key === "capeUrl" ? "/imgs/…" : ""} />{["playerSkinImage", "PlayerSkinAltImage"].includes(key) && <span className="skin-upload"><input type="file" accept="image/png,image/jpeg,image/webp" disabled={uploading || busy} onChange={(e) => { uploadSkin(e.target.files?.[0], key); e.target.value = ""; }} /><small>PNG, JPG ou WebP · salva em public/imgs/skins</small></span>}</label>)}</div>
      <div className="editor-actions"><button className="save-player" disabled={busy || uploading}>{uploading ? "Enviando imagem…" : busy ? "Salvando…" : editing === null ? "Adicionar jogador" : "Salvar alterações"}</button>{editing !== null && <button type="button" className="cancel-player" onClick={resetForm} disabled={uploading || busy}>Cancelar</button>}</div>
    </form>
    <section className="player-list"><h2>Jogadores cadastrados</h2>{players.map((p, i) => <article className="player-row" key={`${p.id}-${i}`}><div className="skin-thumb">{p.playerSkinImage && <img src={p.playerSkinImage} alt="" />}</div><div className="player-summary"><strong>{p.name} <span>({p.nickname})</span></strong><small>ID: {p.id} · {p.mod1}{p.mod2 ? ` / ${p.mod2}` : ""}</small></div><div className="row-actions"><button type="button" onClick={() => editPlayer(p, i)}>Editar</button><button type="button" className="remove-player" onClick={() => removePlayer(i)} disabled={busy}>Remover</button></div></article>)}</section>
  </main>;
}
