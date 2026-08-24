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

## Regra da aba "Indicadores"

Para poder usar fórmulas na planilha, as colunas `meta` e `realizado` da aba **Indicadores** devem ser **sempre números puros** (ex: `90`, não `90 dias`).

A unidade de medida (dias, horas, %) vai entre parênteses **no final** da coluna `nome`:

```
nome: "Tempo Médio de Planejamento (Baixa Complexidade) (dias)"
meta: 70
realizado: 90
```

O site sozinho separa o "(dias)" do nome e mostra "90 dias" na tela — você só precisa manter essa regra ao criar um indicador novo.

## Estrutura dos 3 blocos (não misturar!)

Este painel reúne **3 fontes de dados com propósitos diferentes**. Cada uma tem sua cor e sua legenda de fonte na tela — nunca misture números de um bloco com outro em cálculos ou comparações informais:

1. **PCA (Plano de Contratações Anual)** — azul-marinho. Planejamento oficial registrado no sistema de compras do governo pelas Unidades Apoiadas. Muitas licitações aqui nunca chegam a ser iniciadas — é só o registro do planejamento.
2. **Acompanhamento da Seção de Licitações** — roxo. Controle interno da própria Seção (mantido pelo Cap Saulo), mostrando a execução real e o planejamento próprio da Seção (pipeline de contratações 2026, atas vigentes, ranking de processos).
3. **Contratos Administrativos Vigentes** — verde. Gestão dos contratos de serviço já firmados e sua vigência.

Se um dia quiserem comparar PCA vs. execução real, isso deve ser uma seção nova, rotulada explicitamente como "comparativo" — nunca substituindo ou se misturando aos números originais de cada bloco.

## Sobre o Bloco 2 (Controle de Processos)

Os dados desse bloco vêm do arquivo **"1 - CONTROLE PROCESSOS.xlsx"**, mantido pelo Cap Saulo numa pasta de rede interna do GAP-GL (não é Google Drive). Para o painel ler isso, é preciso:

1. Copiar (sem alterar a rotina do Cap Saulo) esse arquivo para a pasta do Google Drive já usada pelo painel
2. Importar as 3 abas relevantes para o Google Sheets: `PROCESSOS`, `ATAS VIGENTES`, e as abas `30`+`39`+`52` combinadas (veja os CSVs modelo em `planilhas-modelo/processos_raw.csv`, `atas_raw.csv` e `pipeline_raw.csv`)
3. Publicar cada uma como CSV e colar os links em `config.js` (`processos`, `atas`, `pipeline`)

O painel faz toda a contagem, ranking e classificação de risco automaticamente em JavaScript — você não precisa calcular nada na planilha, só manter os dados brutos atualizados.

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
