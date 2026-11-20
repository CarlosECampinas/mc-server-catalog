# Minecraft Server Catalog

## Desenvolvimento com Docker

Requer Docker Desktop com Docker Compose. Na pasta do projeto, inicie o servidor de desenvolvimento:

```bash
docker compose up --build
```

Abra [http://localhost:5173](http://localhost:5173). O código-fonte fica montado no container e o Vite atualiza a página quando os arquivos mudam.

Para encerrar, use `Ctrl+C`. Para iniciar em segundo plano, rode `docker compose up --build -d`; para parar nesse modo, use `docker compose down`.

## Desenvolvimento local (opcional)

```bash
npm install
npm run dev
```

Outros comandos disponíveis: `npm run build` para gerar a versão de produção e `npm run lint` para verificar o código.
