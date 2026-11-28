import { createServer } from "node:http";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const playersFile = path.join(projectRoot, "src", "assets", "data", "players.json");
const skinsDirectory = path.join(projectRoot, "public", "imgs", "skins");
const port = Number(process.env.PLAYERS_PORT || 3001);

function respond(response, status, data) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  response.end(JSON.stringify(data));
}

const server = createServer(async (request, response) => {
  if (request.method === "GET" && request.url === "/api/players") {
    try { response.writeHead(200, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }); response.end(await readFile(playersFile)); }
    catch { respond(response, 500, { error: "Não foi possível ler players.json." }); }
    return;
  }
  if (request.method === "POST" && request.url === "/api/skins") {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 12_000_000) { respond(response, 413, { error: "Imagem muito grande. O limite é 8 MB." }); request.destroy(); }
    });
    request.on("end", async () => {
      try {
        const { name, type, data } = JSON.parse(body);
        const extensions = { "image/png": ".png", "image/jpeg": ".jpg", "image/webp": ".webp" };
        const extension = extensions[type];
        if (!extension || typeof data !== "string" || !name) { respond(response, 400, { error: "Envie uma imagem PNG, JPG ou WebP válida." }); return; }
        const image = Buffer.from(data, "base64");
        if (!image.length || image.length > 8 * 1024 * 1024) { respond(response, 413, { error: "Imagem muito grande. O limite é 8 MB." }); return; }
        const validSignature = type === "image/png" ? image.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
          : type === "image/jpeg" ? image[0] === 255 && image[1] === 216 && image[2] === 255
          : image.subarray(0, 4).toString() === "RIFF" && image.subarray(8, 12).toString() === "WEBP";
        if (!validSignature) { respond(response, 400, { error: "O conteúdo não corresponde a uma imagem válida desse tipo." }); return; }
        const rawName = path.basename(name, path.extname(name)).normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9_-]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 80);
        if (!rawName) { respond(response, 400, { error: "O nome do arquivo não é válido." }); return; }
        const filename = `${rawName}${extension}`;
        await mkdir(skinsDirectory, { recursive: true });
        try { await writeFile(path.join(skinsDirectory, filename), image, { flag: "wx" }); }
        catch (error) {
          if (error.code === "EEXIST") { respond(response, 409, { error: `Já existe uma imagem chamada ${filename}. Renomeie o arquivo e tente novamente.` }); return; }
          throw error;
        }
        respond(response, 201, { path: `/imgs/skins/${filename}` });
      } catch { if (!response.writableEnded) respond(response, 400, { error: "Não foi possível processar a imagem." }); }
    });
    return;
  }
  if (request.method === "PUT" && request.url === "/api/players") {
    let body = "";
    request.on("data", (chunk) => { body += chunk; if (body.length > 1_000_000) request.destroy(); });
    request.on("end", async () => {
      try {
        const players = JSON.parse(body);
        if (!Array.isArray(players) || players.some((p) => !p || typeof p !== "object" || typeof p.id !== "string" || typeof p.nickname !== "string" || typeof p.name !== "string" || typeof p.playerSkinImage !== "string" || typeof p.capeUrl !== "string" || typeof p.mod1 !== "string" || !(p.mod2 === null || typeof p.mod2 === "string"))) {
          respond(response, 400, { error: "Dados inválidos. Confira os campos obrigatórios." }); return;
        }
        const ids = players.map((p) => p.id.toLowerCase());
        if (new Set(ids).size !== ids.length) { respond(response, 400, { error: "Os IDs dos jogadores devem ser únicos." }); return; }
        await writeFile(playersFile, `${JSON.stringify(players, null, 2)}\n`, "utf8");
        respond(response, 200, { ok: true });
      } catch { respond(response, 400, { error: "JSON inválido ou falha ao salvar o arquivo." }); }
    });
    return;
  }
  respond(response, 404, { error: "Rota não encontrada." });
});

server.listen(port, "127.0.0.1", () => console.log(`Editor de jogadores disponível em http://127.0.0.1:${port}`));
