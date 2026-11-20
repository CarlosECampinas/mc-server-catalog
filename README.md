# Minecraft Server Catalog

## Desenvolvimento com Docker

Requer Docker Desktop com Docker Compose 2.23 ou superior. Na pasta do projeto, inicie o servidor de desenvolvimento com observação dos arquivos:

```bash
docker compose up --build --watch
```

Abra [http://localhost:5173](http://localhost:5173). Alterações em `src`, `public` e `index.html` são sincronizadas com o container e recarregadas pelo Vite. Alterações em `package.json` ou `package-lock.json` reiniciam o serviço e instalam as dependências atualizadas.

Para encerrar, use `Ctrl+C`. Para iniciar em segundo plano mantendo a observação de arquivos, rode `docker compose up --build --watch -d`; para parar nesse modo, use `docker compose down`.

## Desenvolvimento local (opcional)

```bash
npm install
npm run dev
```

Outros comandos disponíveis: `npm run build` para gerar a versão de produção e `npm run lint` para verificar o código.
