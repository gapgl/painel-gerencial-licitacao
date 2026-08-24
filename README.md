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

## Sobre o Bloco 2 (Controle de Processos) — rotina simplificada

Os dados desse bloco vêm do arquivo **"1 - CONTROLE PROCESSOS.xlsx"**, mantido pelo Cap Saulo numa pasta de rede interna do GAP-GL. O código lê as colunas **exatamente como estão no arquivo original** — nada de renomear cabeçalho, nada de reformatar.

**Configuração (faz uma vez só):**

1. Copie o arquivo do Cap Saulo para a pasta do Google Drive já usada pelo painel
2. Abra/crie uma planilha do Google Sheets e importe as 5 abas, **sem alterar nenhuma coluna**:
   - `PROCESSOS` → importe direto
   - `ATAS VIGENTES` → importe direto
   - `30`, `39`, `52` → importe direto, mas **apague a primeira linha** de cada uma (é só o título mesclado tipo "PROCESSOS DE AQ DE MATERIAIS CONSUMO PARA 2026" — a segunda linha já é o cabeçalho de verdade)
3. Publique cada uma das 5 abas como CSV (Arquivo → Compartilhar → Publicar na web)
4. Cole os 5 links em `config.js`: `processos`, `atas`, `pipelineConsumo` (aba 30), `pipelineServicos` (aba 39), `pipelinePermanentes` (aba 52)

**Rotina de atualização (o que você faz toda vez que o Cap Saulo atualizar o arquivo dele):**

Copie o arquivo atualizado pra pasta do Drive e **substitua os dados nas mesmas 5 abas** (copiar e colar os valores de novo, ou reimportar com "Substituir planilha atual"). Como as abas continuam sendo as mesmas, os links publicados continuam funcionando sem precisar mexer no `config.js` de novo. O painel recalcula tudo sozinho (contagem por status, ranking, risco de vencimento) — você não faz nenhuma conta.

## Sobre o Analítico do PCA (página própria, entre Dados da RAG e Acompanhamento da Seção)

Detalhamento oficial do PCA, item a item, exportado do **Compras.gov** (Painel de Contratações). É um aprofundamento do mesmo PCA do Bloco 1 — não é uma fonte nova nem deve ser confundido com o Acompanhamento da Seção.

⚠️ Os valores aqui são **tetos estimados de planejamento**, não execução/empenho. O painel sempre chama isso de "Valor Estimado", nunca de "gasto".

**Configuração (uma vez por ano):**
1. Baixe o PCA do ano em compras.gov
2. Importe como uma aba nova no Google Sheets (Sheets detecta separador e acentuação sozinho)
3. Publique como CSV e cole o link em `config.js` → `pcaDetalhado`

**Atualização (quando quiser atualizar os dados do mesmo ano, ou trocar de ano):** reimporte o novo arquivo na MESMA aba e republique — sem reformatar nada. O modelo de referência está em `planilhas-modelo/pca_detalhado.csv`.

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
