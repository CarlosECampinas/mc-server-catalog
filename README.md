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

### Editor local de jogadores

Abra dois terminais na pasta do projeto. No primeiro, inicie o servidor que grava o JSON:

```bash
npm run players:server
```

No segundo, inicie o site com Vite:

```bash
npm run dev
```

Acesse `http://localhost:5173/#/Create` para adicionar, editar ou remover jogadores. Use o campo de upload da skin para gravar PNG, JPG ou WebP em `public/imgs/skins` e preencher o caminho automaticamente. As alterações dos jogadores são salvas em `src/assets/data/players.json`. O editor só aparece durante o desenvolvimento e o servidor de gravação é separado do build de produção.

Outros comandos disponíveis: `npm run build` para gerar a versão de produção e `npm run lint` para verificar o código.
