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

function parsePac(rows) {
  return rows.map(r => ({
    etapa: r.etapa,
    planejado: parseFloat(r.planejado.replace(",", ".")),
    realizado: parseFloat(r.realizado.replace(",", "."))
  }));
}

function parseIndicadores(rows) {
  return rows.map(r => ({
    nome: r.nome,
    meta: r.meta,
    realizado: r.realizado,
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

/**
 * Tenta carregar os dados do Google Sheets.
 * Retorna true se conseguiu atualizar DASHBOARD_DATA, false caso
 * contrário (nesse caso os dados de data.js continuam valendo).
 */
async function tryLoadFromSheets() {
  const urls = typeof SHEET_URLS !== "undefined" ? SHEET_URLS : null;
  if (!urls || !urls.resumo || !urls.pac || !urls.indicadores || !urls.contratos) {
    console.info("SHEET_URLS não configurado ainda — usando dados locais de data.js.");
    return false;
  }

  try {
    const [resumoRows, pacRows, indRows, contratosRows] = await Promise.all([
      fetchCSV(urls.resumo),
      fetchCSV(urls.pac),
      fetchCSV(urls.indicadores),
      fetchCSV(urls.contratos)
    ]);

    DASHBOARD_DATA.resumo = parseResumo(resumoRows);
    DASHBOARD_DATA.pac = parsePac(pacRows);
    DASHBOARD_DATA.indicadores = parseIndicadores(indRows);
    DASHBOARD_DATA.contratos = parseContratos(contratosRows);

    console.info("Dados atualizados a partir do Google Sheets.");
    return true;
  } catch (err) {
    console.error("Não foi possível carregar os dados do Google Sheets:", err);
    return false;
  }
}
