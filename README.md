# Painel Gerencial · Licitações e Contratos (GAP-GL)

Painel de governança do Grupamento de Apoio do Galeão (GAP-GL), feito para acompanhar Licitações e Contratos a partir de 3 fontes de dados oficiais/internas. É um site estático (HTML/CSS/JS puro, sem build, sem servidor) hospedado gratuitamente no **GitHub Pages**, e lê os dados de planilhas do **Google Sheets** publicadas como CSV.

> Se você não programa e está mexendo nisso pela primeira vez: não precisa entender o código pra manter o painel — só precisa saber **onde colar links** (`config.js`) e **como publicar uma aba do Sheets como CSV**. Tudo isso está explicado passo a passo mais abaixo.

---

## Sumário

- [Visão geral: as 3 páginas do painel](#visão-geral-as-3-páginas-do-painel)
- [Estrutura dos arquivos](#estrutura-dos-arquivos)
- [Princípio mais importante: não misturar os blocos](#princípio-mais-importante-não-misturar-os-blocos)
- [Página 1 — Dados da RAG](#página-1--dados-da-rag)
- [Página 2 — Analítico do PCA](#página-2--analítico-do-pca)
- [Página 3 — Acompanhamento da Seção](#página-3--acompanhamento-da-seção)
- [Como conectar tudo ao Google Sheets](#como-conectar-tudo-ao-google-sheets)
- [Como atualizar os dados no dia a dia](#como-atualizar-os-dados-no-dia-a-dia)
- [Publicar no GitHub Pages](#publicar-no-github-pages)
- [Identidade visual (brasão e favicon)](#identidade-visual-brasão-e-favicon)
- [Seções temporariamente ocultas](#seções-temporariamente-ocultas)
- [Próximos passos planejados](#próximos-passos-planejados)

---

## Visão geral: as 3 páginas do painel

O painel abre num **menu lateral** (ícone ☰ no canto superior esquerdo) com 3 páginas:

| # | Página | O que mostra | Cor de identidade |
|---|---|---|---|
| 1 | **Dados da RAG** | PCA (resumo) + Indicadores de Desempenho + Contratos Administrativos Vigentes — os números que vão pra Reunião de Avaliação da Gestão | Azul-marinho |
| 2 | **Analítico do PCA** | Detalhamento oficial do PCA, item a item, direto do Compras.gov — com filtro por ano e tudo clicável | Âmbar/dourado |
| 3 | **Acompanhamento da Seção** | Controle interno da Seção de Licitações: histórico de processos, atas vigentes, planejamento futuro | Roxo |

Cada página tem, no topo de cada seção, uma legenda **"Fonte: ..."** — é assim que você sempre sabe de onde aquele número específico veio.

O painel funciona em 2 camadas: primeiro mostra os dados fixos de `data.js` (pra nunca aparecer em branco), e alguns segundos depois tenta buscar a versão mais atual no Google Sheets — se conseguir, atualiza a tela sozinho; se não conseguir (link não configurado, sem internet, etc.), continua mostrando os dados fixos sem quebrar.

---

## Estrutura dos arquivos

```
├── index.html              → a estrutura das 3 páginas e do menu lateral
├── style.css                → cores, layout, responsividade
├── data.js                  → dados de exemplo/respaldo (usados até o Sheets carregar)
├── config.js                → ⭐ onde você cola os links das planilhas do Google Sheets
├── loader.js                 → busca e interpreta os CSVs publicados
├── script.js                 → toda a lógica: filtros, cliques, gráficos, navegação
├── assets/
│   ├── gap-gl-brasao.png     → brasão usado no cabeçalho e no menu
│   ├── favicon.ico, favicon-16.png, favicon-32.png, favicon-48.png, apple-touch-icon.png
└── planilhas-modelo/         → arquivos CSV de referência, prontos pra importar no Sheets
    ├── resumo.csv, pca.csv, indicadores.csv, contratos.csv       (Bloco 1 e 3)
    ├── processos.csv, atas.csv, pipeline_30/39/52_*.csv          (Bloco 2)
    └── pca_detalhado_2026.csv                                     (Analítico do PCA)
```

No dia a dia, você só mexe em **`config.js`** (colar links) e nas **planilhas do Google Sheets**. Os arquivos `.js`/`.html`/`.css` só mudam quando o painel ganha uma funcionalidade nova.

---

## Princípio mais importante: não misturar os blocos

Este painel junta **3 fontes de dados com propósitos diferentes**, e cada uma responde a uma pergunta diferente:

1. **PCA** *(Plano de Contratações Anual)* — o que foi **planejado** pelas Unidades Apoiadas no sistema oficial de compras do governo. Muita coisa aqui nunca chega a virar processo de verdade — é só o registro do planejamento.
2. **Acompanhamento da Seção** — o que a Seção de Licitações está **de fato executando**, com metas e ritmo próprios (controle interno, mantido pelo Cap Saulo).
3. **Contratos Administrativos Vigentes** — os contratos de serviço **já firmados** e sua vigência (uma coisa à parte: licitação que virou contrato).

**Nunca misture números de um bloco em cálculos do outro.** Se um dia for preciso comparar PCA com execução real, isso deve virar uma seção nova, rotulada explicitamente como "comparativo" — nunca substituindo os números originais de cada bloco.

---

## Página 1 — Dados da RAG

### 1.1 · Plano de Contratações Anual (PCA)
- 4 cartões de resumo: Execução do PCA (%), Contratações Concluídas, Contratos a Vencer, Indicadores Críticos
- Gráfico de barras **Planejado vs. Realizado** por etapa (Concluídas, Em andamento, Editais Publicados, Atas SRP, Suspensas/Revogadas)
- Rosca de progresso das contratações concluídas

### 1.2 · Indicadores de Desempenho
Cartões com Meta / Realizado / % / Status (Adequado, Atenção, Crítico) para os indicadores da área "Licitações e Contratos" (execução do PCA, tempos médios de planejamento por complexidade, emissão de empenho, assinatura e publicação de contrato, etc).

**Regra de formatação importante:** nas colunas `meta` e `realizado` da aba "Indicadores", os valores devem ser **números puros** (ex: `90`, nunca `"90 dias"`) — isso permite usar fórmulas na planilha. A unidade de medida (dias, horas, %) vai **entre parênteses no final** do campo `nome`:

```
nome: "Tempo Médio de Planejamento (Baixa Complexidade) (dias)"
meta: 70
realizado: 90
```

O painel separa sozinho o "(dias)" do nome e mostra "90 dias" na tela — você só precisa manter essa regra ao criar um indicador novo.

### 1.3 · Contratos Administrativos Vigentes
Tabela com semáforo de vencimento (Crítico / Atenção / Planejamento) dos contratos de serviço, com filtro por status e coluna de providências.

---

## Página 2 — Analítico do PCA

Detalhamento oficial do PCA, **item a item**, exportado direto do **Compras.gov** (Painel de Contratações). É um aprofundamento do mesmo PCA da Página 1 — não é uma fonte nova.

> ⚠️ Os valores aqui são **estimados** (tetos de planejamento), nunca "gastos" ou "empenhados". O painel sempre usa o rótulo "Valor Estimado".

### O que tem nessa página
1. **Visão Geral** — Valor Estimado total, Prioridade Alta, Itens Ainda Não Iniciados, Total de Itens
2. **Categoria da Demanda** (Bens / Serviços / TIC) e **Prioridade Declarada** (Baixo / Médio / Alto)
3. **Situação da Execução** — o "termômetro" real do plano (quanto já saiu do papel)
4. **Ranking por Área Requisitante** — por quantidade de itens e por valor estimado, lado a lado
5. **Calendário de Início Estimado** — quantos itens começam em cada mês (alerta de carga de trabalho futura)
6. **Maiores Itens do PCA** — watchlist dos itens de maior valor
7. **Todos os Itens do PCA** — tabela completa com filtros próprios (categoria, prioridade, situação, busca livre)

### Tudo é clicável
Clicar em **qualquer número** — "Prioridade Alta", "Ainda Não Iniciados", uma fatia de Categoria/Situação, uma área do ranking, uma linha do Top 10 — aplica aquele filtro na tabela "Todos os Itens" (seção 6) e rola a tela até ela automaticamente. É a forma de "abrir" qualquer estatística e ver exatamente quais itens a compõem.

### Suporte a múltiplos anos
Cada ano do PCA fica na **sua própria aba** do Google Sheets (ex: `PCA_Detalhado_2026`, `PCA_Detalhado_2027`), configurada em `config.js` dentro do objeto `pcaAnos`. Um seletor de ano no topo da página filtra tudo. **O ano-calendário atual é sempre selecionado por padrão** — quando o ano virar (e o PCA do novo ano já estiver configurado), o painel troca sozinho, sem precisar mexer em nada.

Para adicionar um ano novo: importe o CSV do Compras.gov como aba nova, publique como CSV, e acrescente uma linha em `pcaAnos` no `config.js` — nenhum código muda.

---

## Página 3 — Acompanhamento da Seção

Controle interno da Seção de Licitações, hoje alimentado pelo arquivo **"1 - CONTROLE PROCESSOS.xlsx"** do Cap Saulo (pasta de rede interna do GAP-GL, importada pro Google Sheets).

### 3.1 · Acompanhamento de Processos
- KPIs: Total de Processos, Homologados, Em Tramitação, Atas Vencendo em Breve
- Distribuição por **Status** — 10 status reconhecidos: `1 - Fase Interna`, `2 - Envio CJU`, `3 - Adequação Pós CJU`, `4 - Publicado`, `5 - Licitação em Andamento`, `6 - Homologado`, e (agrupados como "Sem Sucesso/Suspenso") `Deserto`, `Fracassado`, `Revogado`, `Suspenso`
- **Ranking por Responsável** e **Ranking por OM Atendida**
- **Histórico de Processos**: tabela completa com filtros de **Ano**, **Status** e **busca livre**

**Colunas visíveis na tabela:** Licitação, Modalidade, Status, Objeto, OM, Responsável, Abertura.

**Colunas ocultas na tabela, mas pesquisáveis pela busca:** PAG, Nº Subprocesso, Contato, Data Início Planejamento, Responsável Planejamento, Data Início Publicação, Responsável Publicação. Ou seja: mesmo sem aparecer na tela, dá pra achar um processo digitando o e-mail de contato, o nome de quem está tocando o planejamento, o número do PAG, etc.

**Como o filtro de Ano funciona:** o painel tenta primeiro extrair o ano do número da licitação (ex: `90055/2026`). Se o processo ainda não tem número (comum em Fase Interna), usa a **data de Abertura** como alternativa — assim processos recentes não numerados não caem todos genericamente em "Sem número".

### 3.2 · Atas de Registro de Preço Vigentes *(atualmente oculta — veja a seção abaixo)*
Tabela de atas com semáforo de vencimento calculado automaticamente a partir da data de vigência.

### 3.3 · Planejamento de Processos da Seção *(atualmente oculta — veja a seção abaixo)*
Sub-abas **Consumo / Serviços / Materiais Permanentes**, mostrando o que está no radar da Seção pra 2026 (ainda sem virar processo formal), com indicação de "tem ata vigente" ou não.

---

## Como conectar tudo ao Google Sheets

Todos os links ficam em **`config.js`**, dentro do objeto `SHEET_URLS`. Enquanto um campo estiver vazio (`""`), o painel usa os dados fixos de `data.js` para aquele bloco específico — nada quebra por falta de configuração.

### Bloco 1 e 3 (PCA resumo + Indicadores + Contratos)
Chaves: `resumo`, `pca`, `indicadores`, `contratos`.
Importe os CSVs de `planilhas-modelo/` (`resumo.csv`, `pca.csv`, `indicadores.csv`, `contratos.csv`) como 4 abas de uma planilha do Sheets, publique cada uma como CSV (**Arquivo → Compartilhar → Publicar na Web**, escolhendo a aba certa e o formato CSV), e cole os 4 links.

### Bloco 2 (Acompanhamento da Seção)
Chaves: `processos`, `atas`, `pipelineConsumo`, `pipelineServicos`, `pipelinePermanentes`.
Vêm de uma cópia do arquivo do Cap Saulo, importada **sem alterar nenhuma coluna** para 5 abas do Sheets: `PROCESSOS`, `ATAS VIGENTES`, `30`, `39`, `52` (para as 3 últimas, apague a primeira linha — é só um título mesclado, o cabeçalho de verdade é a segunda linha). Publique as 5 abas como CSV e cole os links.

**Atualização de rotina:** copie o arquivo atualizado do Cap Saulo pra pasta do Drive e substitua os dados nas **mesmas 5 abas** (reimportar com "Substituir planilha atual", ou colar por cima). Como as abas continuam as mesmas, os links publicados não mudam — não precisa mexer no `config.js` de novo.

### Analítico do PCA
Chave: `pcaAnos` (um objeto, não um link único) — `{ "2026": "link...", "2027": "link..." }`.
Baixe o PCA do ano em compras.gov, importe como aba nova no Sheets (nome sugerido: `PCA_Detalhado_2026`), publique como CSV, e cole o link na chave do ano correspondente.

---

## Como atualizar os dados no dia a dia

Na imensa maioria das vezes, você **não mexe em código nenhum** — só atualiza a planilha do Google Sheets correspondente (ela é a fonte viva de dados) e o painel reflete isso sozinho, em segundos, toda vez que alguém abrir a página.

Só volta a mexer em arquivo quando:
- for conectar um bloco que ainda não tem link configurado (`config.js`)
- adicionar um ano novo do PCA (`config.js` → `pcaAnos`)
- quiser uma funcionalidade nova no painel (aí sim, código)

---

## Publicar no GitHub Pages

1. No repositório, vá em **Settings → Pages**
2. Em "Branch", selecione `main` e a pasta `/ (root)`
3. Salve — o GitHub gera um link tipo `https://seu-usuario.github.io/nome-do-repositorio/`

Depois de subir qualquer arquivo novo, espere 1–2 minutos e force a atualização do navegador (**Ctrl+Shift+R**) pra não ver uma versão antiga guardada em cache.

---

## Identidade visual (brasão e favicon)

O brasão oficial do GAP-GL (`assets/gap-gl-brasao.png`, fundo já removido) aparece no cabeçalho e no menu lateral. O mesmo brasão gera o **favicon** (ícone que aparece na aba do navegador e ao salvar o painel na tela inicial do celular) — arquivos `favicon.ico`, `favicon-16.png`, `favicon-32.png`, `favicon-48.png` e `apple-touch-icon.png`, todos referenciados no `<head>` do `index.html`.

---

## Seções temporariamente ocultas

A pedido, as seções **"Atas de Registro de Preço Vigentes"** e **"Planejamento de Processos da Seção"** (itens 2 e 3 da Página 3) estão ocultas: `class="hidden"` nas `<section>` correspondentes do `index.html`, e os links delas no menu lateral estão comentados (`<!-- -->`). Nenhum código foi apagado — o `loader.js`, o `script.js` e os links do Sheets pra esses dados continuam funcionando por baixo.

**Para reativar:** no `index.html`, remova `class="hidden"` das duas `<section>` e apague as marcações `<!--` `-->` ao redor dos dois links correspondentes no menu lateral.

---

## Próximos passos planejados

- [x] Conectar todos os blocos ao Google Sheets publicado como CSV
- [x] Separar visualmente PCA / Analítico do PCA / Acompanhamento da Seção
- [x] Suporte a múltiplos anos no Analítico do PCA
- [x] Favicon com o brasão do GAP-GL
- [ ] Reativar Atas Vigentes e Planejamento de Processos (Página 3)
- [ ] Automatizar a atualização via n8n (puxar dados direto do SILOMS/rede interna, sem cópia manual de arquivo)
