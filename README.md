# Painel Gerencial - Licitações e Contratos (GAP-GL)

Painel de governança com os indicadores de Licitações e Contratos do Grupamento de Apoio do Galeão (GAP-GL), construído a partir da Reunião de Avaliação da Gestão.

## Como está organizado

- `index.html` — a estrutura da página (não precisa mexer aqui no dia a dia)
- `style.css` — as cores e o visual do painel
- `data.js` — **é aqui que você atualiza os números**
- `script.js` — o código que pega os dados de `data.js` e desenha na tela

## Como atualizar os números

1. Abra o arquivo `data.js`
2. Troque os valores dentro de `DASHBOARD_DATA` (por exemplo, `execucaoPCA`, `pac`, `indicadores`, `contratos`)
3. Salve e suba a alteração para o GitHub — o site atualiza sozinho em alguns minutos (GitHub Pages)

## Como publicar no GitHub Pages

1. No repositório, vá em **Settings → Pages**
2. Em "Branch", selecione `main` e a pasta `/root`
3. Salve — o GitHub te dá um link tipo `https://seu-usuario.github.io/nome-do-repositorio/`

## Conectado ao Google Sheets

O painel agora consegue ler os dados direto de uma planilha do Google Sheets:

1. Importe os 4 arquivos da pasta `planilhas-modelo/` como 4 abas de uma planilha do Google Sheets (`Resumo`, `PAC`, `Indicadores`, `Contratos`).
2. Publique cada aba individualmente: **Arquivo → Compartilhar → Publicar na web**, escolha a aba e o formato **CSV**.
3. Cole os 4 links gerados dentro de `config.js`, no objeto `SHEET_URLS`.
4. Suba os arquivos atualizados para o GitHub.

Enquanto `config.js` estiver vazio, o painel continua usando os números fixos de `data.js` — nada quebra.

## Próximos passos (planejados)

- [x] Conectar `data.js` a uma planilha do Google Sheets publicada como CSV
- [ ] Automatizar a atualização via n8n
