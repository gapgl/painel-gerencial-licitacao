/* ============================================================
   LOADER - busca os dados no Google Sheets (se configurado)
   ============================================================
   Se SHEET_URLS (config.js) estiver preenchido, este arquivo:
   1) baixa o CSV publicado de cada aba
   2) transforma cada linha em objetos
   3) substitui os dados dentro de DASHBOARD_DATA

   Se algo falhar (sem internet, link errado, planilha não
   publicada), o painel simplesmente continua mostrando os
   dados fixos de data.js e nada quebra.
   ============================================================ */

/**
 * Interpretador simples de CSV (suporta campos entre aspas com
 * vírgulas dentro, como o Google Sheets exporta).
 */
function parseCSV(text) {
  const rows = [];
  let i = 0, field = "", row = [], inQuotes = false;

  const pushField = () => { row.push(field); field = ""; };
  const pushRow = () => { rows.push(row); row = []; };

  while (i < text.length) {
    const char = text[i];
    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') { field += '"'; i += 2; continue; }
        inQuotes = false; i++; continue;
      }
      field += char; i++; continue;
    } else {
      if (char === '"') { inQuotes = true; i++; continue; }
      if (char === ",") { pushField(); i++; continue; }
      if (char === "\r") { i++; continue; }
      if (char === "\n") { pushField(); pushRow(); i++; continue; }
      field += char; i++; continue;
    }
  }
  if (field.length || row.length) { pushField(); pushRow(); }

  const cleanRows = rows.filter(r => r.some(cell => cell.trim() !== ""));
  const headers = cleanRows.shift().map(h => h.trim());

  return cleanRows.map(r => {
    const obj = {};
    headers.forEach((h, idx) => { obj[h] = (r[idx] ?? "").trim(); });
    return obj;
  });
}

async function fetchCSV(url) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Falha ao buscar ${url} (status ${res.status})`);
  const text = await res.text();
  return parseCSV(text);
}

function parseResumo(rows) {
  const r = rows[0];
  return {
    execucaoPCA: {
      valor: parseFloat(r.execucaoPCA_valor.replace(",", ".")),
      meta: parseFloat(r.execucaoPCA_meta.replace(",", "."))
    },
    contratacoesConcluidas: {
      realizado: parseInt(r.concluidas_realizado, 10),
      planejado: parseInt(r.concluidas_planejado, 10)
    },
    contratosVigenciaCritica: {
      total: parseInt(r.contratosCriticos_total, 10),
      descricao: r.contratosCriticos_desc
    },
    indicadoresCriticos: {
      total: parseInt(r.indicadoresCriticos_total, 10),
      totalIndicadores: parseInt(r.indicadoresCriticos_totalIndicadores, 10)
    }
  };
}

function parsePca(rows) {
  return rows.map(r => ({
    etapa: r.etapa,
    planejado: parseFloat(r.planejado.replace(",", ".")),
    realizado: parseFloat(r.realizado.replace(",", "."))
  }));
}

function parseIndicadores(rows) {
  // "nome" continua com a unidade entre parênteses no final (ex: "... (dias)").
  // "meta" e "realizado" agora chegam como número puro da planilha.
  return rows.map(r => ({
    nome: r.nome,
    meta: parseFloat(r.meta.replace(",", ".")),
    realizado: parseFloat(r.realizado.replace(",", ".")),
    percentual: parseFloat(r.percentual.replace(",", ".")),
    status: r.status.trim().toLowerCase()
  }));
}

function parseContratos(rows) {
  return rows.map(r => ({
    servico: r.servico,
    nup: r.nup,
    vencimento: r.vencimento,
    risco: r.risco.trim().toLowerCase(),
    providencia: r.providencia
  }));
}

/* ============================================================
   BLOCO 2 — Acompanhamento da Seção de Licitações
   (Controle de Processos do Cap Saulo — dado bruto, linha a linha)
   ============================================================ */

function parseProcessos(rows) {
  // Lê as colunas EXATAMENTE como aparecem na planilha original do Cap Saulo
  // (aba "PROCESSOS"): PAG, LICITAÇÃO, MODALIDADE, STATUS, OBJETO RESUMIDO,
  // OM, RESPONSÁVEL, OBSERVAÇÕES. Não é preciso renomear nada na planilha.
  return rows
    .filter(r => r["OBJETO RESUMIDO"] && r["OBJETO RESUMIDO"].trim() !== "")
    .map(r => ({
      licitacao: r["LICITAÇÃO"] || "",
      modalidade: (r["MODALIDADE"] || "").trim().toUpperCase(),
      status: (r["STATUS"] || "").trim().toUpperCase(),
      objeto: r["OBJETO RESUMIDO"],
      om: (r["OM"] || "").trim(),
      responsavel: (r["RESPONSÁVEL"] || "").trim(),
      observacoes: r["OBSERVAÇÕES"] || ""
    }));
}

function parseAtas(rows) {
  // Lê a aba "ATAS VIGENTES" original: PREGÃO, OBJETO, VIGÊNCIA.
  return rows
    .filter(r => r["PREGÃO"] && r["PREGÃO"].trim() !== "")
    .map(r => ({
      pregao: r["PREGÃO"].trim(),
      objeto: r["OBJETO"],
      vigencia: r["VIGÊNCIA"] // string "dd/mm/aaaa"
    }));
}

/**
 * Lê uma das abas de planejamento (30, 39 ou 52) exatamente como estão:
 * OBJETO, ATA/CONTRATO VIGENTE?, VIGENCIA, LICITAÇÃO, STATUS NOVA LICITAÇÃO,
 * OBSERVAÇÃO (esta última só existe nas abas 39 e 52, não na 30 — tudo bem).
 * A categoria é definida por FORA (qual link foi usado), não por uma coluna.
 */
function parsePipelineAba(rows, categoria) {
  return rows
    .filter(r => r["OBJETO"] && r["OBJETO"].trim() !== "")
    .map(r => ({
      categoria,
      objeto: r["OBJETO"],
      ataVigente: (r["ATA/CONTRATO VIGENTE?"] || "").trim().toUpperCase().startsWith("SIM"),
      vigencia: r["VIGENCIA"] || r["VIGÊNCIA"] || "",
      licitacao: r["LICITAÇÃO"] || "",
      status: (r["STATUS NOVA LICITAÇÃO"] || "").trim(),
      observacao: r["OBSERVAÇÃO"] || ""
    }));
}

/**
 * Tenta carregar os dados do Google Sheets.
 * Retorna true se conseguiu atualizar DASHBOARD_DATA, false caso
 * contrário (nesse caso os dados de data.js continuam valendo).
 */
async function tryLoadFromSheets() {
  const urls = typeof SHEET_URLS !== "undefined" ? SHEET_URLS : null;

  // Bloco 1 + 3 (PCA, Indicadores, Contratos) — como já funcionava
  const blocoPCAConfigurado = urls && urls.resumo && urls.pca && urls.indicadores && urls.contratos;
  if (blocoPCAConfigurado) {
    try {
      const [resumoRows, pcaRows, indRows, contratosRows] = await Promise.all([
        fetchCSV(urls.resumo),
        fetchCSV(urls.pca),
        fetchCSV(urls.indicadores),
        fetchCSV(urls.contratos)
      ]);
      DASHBOARD_DATA.resumo = parseResumo(resumoRows);
      DASHBOARD_DATA.pca = parsePca(pcaRows);
      DASHBOARD_DATA.indicadores = parseIndicadores(indRows);
      DASHBOARD_DATA.contratos = parseContratos(contratosRows);
      console.info("Bloco PCA/Contratos atualizado a partir do Google Sheets.");
    } catch (err) {
      console.error("Falha ao carregar Bloco PCA/Contratos:", err);
    }
  } else {
    console.info("Bloco PCA/Contratos: SHEET_URLS incompleto — usando dados locais de data.js.");
  }

  // Bloco 2 (Controle de Processos da Seção) — independente do Bloco 1/3
  const blocoProcessosConfigurado = urls && urls.processos && urls.atas &&
    urls.pipelineConsumo && urls.pipelineServicos && urls.pipelinePermanentes;

  if (blocoProcessosConfigurado) {
    try {
      const [processosRows, atasRows, consumoRows, servicosRows, permanentesRows] = await Promise.all([
        fetchCSV(urls.processos),
        fetchCSV(urls.atas),
        fetchCSV(urls.pipelineConsumo),
        fetchCSV(urls.pipelineServicos),
        fetchCSV(urls.pipelinePermanentes)
      ]);
      DASHBOARD_DATA.controleProcessos.processos = parseProcessos(processosRows);
      DASHBOARD_DATA.controleProcessos.atas = parseAtas(atasRows);
      DASHBOARD_DATA.controleProcessos.pipeline = [
        ...parsePipelineAba(consumoRows, "Materiais de Consumo"),
        ...parsePipelineAba(servicosRows, "Contratação de Serviços"),
        ...parsePipelineAba(permanentesRows, "Materiais Permanentes")
      ];
      console.info("Bloco Controle de Processos atualizado a partir do Google Sheets.");
    } catch (err) {
      console.error("Falha ao carregar Bloco Controle de Processos:", err);
    }
  } else {
    console.info("Bloco Controle de Processos: SHEET_URLS incompleto — usando dados locais de data.js.");
  }

  return blocoPCAConfigurado || blocoProcessosConfigurado;
}
