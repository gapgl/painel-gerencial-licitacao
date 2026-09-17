/* ============================================================
   PAINEL GERENCIAL - LICITAÇÕES E CONTRATOS - GAP-GL
   Este arquivo só DESENHA a tela usando o que está em data.js.
   Você normalmente não precisa mexer aqui — só em data.js.
   ============================================================ */

const statusLabel = { adequado: "Adequado", atencao: "Atenção", critico: "Crítico" };

function fmtPct(n) {
  return `${n}%`.replace(".", ",");
}

/* ---------- Cabeçalho ---------- */
function renderMeta() {
  document.getElementById("periodo").textContent = DASHBOARD_DATA.periodo;
  document.getElementById("atualizadoEm").textContent = DASHBOARD_DATA.atualizadoEm;
}

/* ---------- KPIs ---------- */
function renderKPIs() {
  const r = DASHBOARD_DATA.resumo;
  const el = document.getElementById("kpiGrid");

  const pcaStatus = r.execucaoPCA.valor >= 90 ? "adequado" : r.execucaoPCA.valor >= 70 ? "atencao" : "critico";
  const concluidasPct = Math.round((r.contratacoesConcluidas.realizado / r.contratacoesConcluidas.planejado) * 100);

  el.innerHTML = `
    <div class="kpi status-${pcaStatus}">
      <div class="label">Execução do PCA</div>
      <div class="value">${fmtPct(r.execucaoPCA.valor)}</div>
      <div class="sub">Meta: ${r.execucaoPCA.meta}% &middot; <span class="pill ${pcaStatus}">${statusLabel[pcaStatus]}</span></div>
    </div>
    <div class="kpi status-atencao">
      <div class="label">Contratações Concluídas</div>
      <div class="value">${r.contratacoesConcluidas.realizado} <span style="font-size:16px;color:var(--text-muted);font-weight:600;">/ ${r.contratacoesConcluidas.planejado}</span></div>
      <div class="sub">${concluidasPct}% do planejado no PCA</div>
    </div>
    <div class="kpi status-critico">
      <div class="label">Contratos a Vencer</div>
      <div class="value">${r.contratosVigenciaCritica.total}</div>
      <div class="sub">${r.contratosVigenciaCritica.descricao}</div>
    </div>
    <div class="kpi status-critico">
      <div class="label">Indicadores Críticos</div>
      <div class="value">${r.indicadoresCriticos.total} <span style="font-size:16px;color:var(--text-muted);font-weight:600;">/ ${r.indicadoresCriticos.totalIndicadores}</span></div>
      <div class="sub">na área de Licitações e Contratos</div>
    </div>
  `;
}

/* ---------- PCA (barras) ---------- */
function renderPCA() {
  const el = document.getElementById("pcaRows");
  const maxVal = Math.max(...DASHBOARD_DATA.pca.map(p => p.planejado), 1);

  el.innerHTML = DASHBOARD_DATA.pca.map(p => {
    const wPlan = (p.planejado / maxVal) * 100;
    const wReal = (p.realizado / maxVal) * 100;
    return `
      <div class="pca-row">
        <div>${p.etapa}</div>
        <div class="pca-track">
          <div class="pca-planejado" style="width:${wPlan}%"></div>
          <div class="pca-realizado" style="width:${wReal}%"></div>
        </div>
        <div class="pca-nums"><strong>${p.realizado}</strong> / ${p.planejado}</div>
      </div>
    `;
  }).join("");

  // Donut: total realizado das etapas "Concluídas" sobre planejado
  const conc = DASHBOARD_DATA.pca.find(p => p.etapa.includes("Concluídas"));
  const pct = Math.round((conc.realizado / conc.planejado) * 100);
  drawDonut("pcaDonut", pct);
  document.getElementById("donutBig").textContent = `${pct}%`;
}

function drawDonut(canvasId, pct, cor) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  const size = canvas.width;
  const cx = size / 2, cy = size / 2, r = size / 2 - 10;

  ctx.clearRect(0, 0, size, size);

  // trilha
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = "#eef1f8";
  ctx.lineWidth = 18;
  ctx.stroke();

  // progresso
  const start = -Math.PI / 2;
  const end = start + (Math.PI * 2 * (pct / 100));
  ctx.beginPath();
  ctx.arc(cx, cy, r, start, end);
  ctx.strokeStyle = cor || "#1d4593";
  ctx.lineWidth = 18;
  ctx.lineCap = "round";
  ctx.stroke();
}

/* ---------- Indicadores ---------- */

/**
 * Separa a unidade de medida que fica entre parênteses no FINAL do nome.
 * Ex: "Tempo Médio de Planejamento (Baixa Complexidade) (dias)"
 *  -> nome:    "Tempo Médio de Planejamento (Baixa Complexidade)"
 *     unidade: "dias"
 * Se não tiver parênteses no final, a unidade fica vazia.
 */
function extrairUnidade(nomeComUnidade) {
  const match = nomeComUnidade.match(/\s*\(([^()]+)\)\s*$/);
  if (match) {
    return {
      nome: nomeComUnidade.slice(0, match.index).trim(),
      unidade: match[1].trim()
    };
  }
  return { nome: nomeComUnidade.trim(), unidade: "" };
}

/** Formata um número puro (ex: 90) usando a unidade (ex: "90 dias", "16,6%"). */
function formatarValor(valor, unidade) {
  const numFormatado = Number(valor).toLocaleString("pt-BR", { maximumFractionDigits: 2 });
  if (unidade === "%") return `${numFormatado}%`;
  if (unidade) return `${numFormatado} ${unidade}`;
  return numFormatado;
}

function renderIndicadores() {
  const el = document.getElementById("indGrid");
  el.innerHTML = DASHBOARD_DATA.indicadores.map(i => {
    const { nome, unidade } = extrairUnidade(i.nome);
    return `
    <div class="ind-card ${i.status}">
      <h3>${nome}</h3>
      <div class="ind-nums">
        <div>Meta<strong>${formatarValor(i.meta, unidade)}</strong></div>
        <div>Realizado<strong>${formatarValor(i.realizado, unidade)}</strong></div>
      </div>
      <div class="ind-bar-track">
        <div class="ind-bar-fill" style="width:${Math.min(i.percentual, 100)}%"></div>
      </div>
      <span class="pill ${i.status}">${i.percentual}% &middot; ${statusLabel[i.status]}</span>
    </div>
  `;
  }).join("");
}

/* ============================================================
   BLOCO 2 — Acompanhamento da Seção de Licitações
   ============================================================ */

const STATUS_CANONICO = [
  { chave: "homologado",   rotulo: "Homologado",          cor: "#22c55e", match: s => s.includes("HOMOLOGADO") },
  { chave: "andamento",    rotulo: "Licitação em Andamento", cor: "#3b82f6",  match: s => s.includes("LICITAÇÃO EM ANDAMENTO") },
  { chave: "adequacao",    rotulo: "Adequação Pós CJU",    cor: "#f5a623",   match: s => s.includes("ADEQUAÇÃO") },
  { chave: "envio_cju",    rotulo: "Envio CJU",            cor: "#0ea5e9",   match: s => s.includes("ENVIO CJU") },
  { chave: "fase_interna", rotulo: "Fase Interna",         cor: "#6d28d9",   match: s => s.includes("FASE INTERNA") },
  { chave: "publicado",    rotulo: "Publicado",            cor: "#14b8a6",   match: s => s.includes("PUBLICADO") },
  { chave: "sem_sucesso",  rotulo: "Sem Sucesso / Suspenso", cor: "#e34848", match: () => true } // fallback: Deserto, Fracassado, Revogado, Suspenso
];

function classificarStatus(statusBruto) {
  const s = (statusBruto || "").toUpperCase().replace(/–/g, "-").trim();
  return STATUS_CANONICO.find(c => c.match(s));
}

/** Agrupa uma lista de itens por um campo e conta ocorrências, do maior pro menor. */
function contarPor(lista, campo, limite) {
  const contagem = {};
  lista.forEach(item => {
    const chave = (item[campo] || "(não informado)").trim();
    if (!chave) return;
    contagem[chave] = (contagem[chave] || 0) + 1;
  });
  const ordenado = Object.entries(contagem).sort((a, b) => b[1] - a[1]);
  return limite ? ordenado.slice(0, limite) : ordenado;
}

function renderSecaoKPIs(processosFiltrados) {
  const processos = processosFiltrados || DASHBOARD_DATA.controleProcessos.processos;
  const atas = DASHBOARD_DATA.controleProcessos.atas;

  const total = processos.length;
  const contagemStatus = { homologado: 0, andamento: 0, adequacao: 0, envio_cju: 0, fase_interna: 0, publicado: 0, sem_sucesso: 0 };
  processos.forEach(p => { contagemStatus[classificarStatus(p.status).chave]++; });

  const emTramitacao = contagemStatus.andamento + contagemStatus.adequacao + contagemStatus.envio_cju + contagemStatus.fase_interna + contagemStatus.publicado;
  const pctHomologado = total ? Math.round((contagemStatus.homologado / total) * 100) : 0;

  const atasVencendoLogo = atas.map(computarAta).filter(a => a.diasReais !== null && a.diasReais >= 0 && a.diasReais <= 90).length;

  const el = document.getElementById("kpiGridSecao");
  el.innerHTML = `
    <div class="kpi tema-secao">
      <div class="label">Total de Processos</div>
      <div class="value">${total}</div>
      <div class="sub">mapeados pela Seção</div>
    </div>
    <div class="kpi status-adequado">
      <div class="label">Homologados</div>
      <div class="value">${contagemStatus.homologado}</div>
      <div class="sub">${pctHomologado}% do total</div>
    </div>
    <div class="kpi tema-secao">
      <div class="label">Em Tramitação</div>
      <div class="value">${emTramitacao}</div>
      <div class="sub">aguardando conclusão</div>
    </div>
    <div class="kpi ${atasVencendoLogo > 0 ? "status-critico" : "status-adequado"}">
      <div class="label">Atas Vencendo em Breve</div>
      <div class="value">${atasVencendoLogo}</div>
      <div class="sub">menos de 90 dias</div>
    </div>
  `;
}

function renderPanorama(processosFiltrados) {
  const processos = processosFiltrados || DASHBOARD_DATA.controleProcessos.processos;

  const contagem = {};
  processos.forEach(p => {
    const c = classificarStatus(p.status);
    contagem[c.chave] = (contagem[c.chave] || 0) + 1;
  });

  const statusEl = document.getElementById("statusGrid");
  statusEl.innerHTML = STATUS_CANONICO
    .filter(c => contagem[c.chave] > 0)
    .map(c => `
      <div class="item">
        <span style="display:flex;align-items:center;gap:8px;">
          <span class="dot" style="background:${c.cor}"></span>${c.rotulo}
        </span>
        <strong>${contagem[c.chave]}</strong>
      </div>
    `).join("");

  const pct = processos.length ? Math.round(((contagem.homologado || 0) / processos.length) * 100) : 0;
  drawDonut("secaoDonut", pct, "#6d28d9");
  document.getElementById("secaoDonutBig").textContent = `${pct}%`;
}

function renderRankingLista(elId, lista) {
  const max = lista.length ? lista[0][1] : 1;
  document.getElementById(elId).innerHTML = lista.map(([nome, qtd], idx) => `
    <div class="ranking-item-wrap">
      <div class="ranking-nome-linha"><span class="nome">${idx + 1}. ${nome}</span></div>
      <div style="display:grid;grid-template-columns:1fr auto;align-items:center;gap:10px;">
        <div class="barra-track"><div class="barra-fill" style="width:${(qtd / max) * 100}%"></div></div>
        <div class="qtd">${qtd}</div>
      </div>
    </div>
  `).join("");
}

function renderRankings(processosFiltrados) {
  const processos = processosFiltrados || DASHBOARD_DATA.controleProcessos.processos;
  renderRankingLista("rankingResponsavel", contarPor(processos, "responsavel", 8));
  renderRankingLista("rankingOM", contarPor(processos, "om", 8));
}

/* ============================================================
   CENTRAL DE GESTÃO DE ATAS DE REGISTRO DE PREÇOS
   ============================================================ */

/** Converte "dd/mm/aaaa" em Date (meia-noite local). Retorna null se inválido. */
function parseDataBR(str) {
  const s = (str || "").trim();
  const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return null;
  const [, d, mes, ano] = m;
  return new Date(Number(ano), Number(mes) - 1, Number(d));
}

/** Dias entre hoje e uma data (positivo = futuro, negativo = passado). */
function diasAteHoje(data) {
  if (!data) return null;
  const hoje = new Date();
  const hojeSemHora = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
  return Math.round((data - hojeSemHora) / 86400000);
}

/**
 * Enriquece uma ata bruta com os campos calculados pelo painel:
 * - vigenciaEfetiva: a Nova Vigência (se renovada) ou a Fim Vigência original
 * - diasReais: dias restantes de verdade (pode ser negativo), calculado a
 *   partir da data — não depende do texto pré-calculado da planilha
 * - statusPrincipal: VIGENTE | PRÓXIMA DO VENCIMENTO | VENCIDA | RENOVADA
 * - severidade: normal | moderada | atencao | alerta | critico | vencida
 *   (usada só pra dar destaque visual ao número de dias, nunca sozinha —
 *   sempre acompanhada de texto)
 */
function computarAta(a) {
  const renovada = (a.renovado || "").trim().toUpperCase() === "SIM";
  const vigenciaEfetivaStr = (renovada && a.novaVigencia) ? a.novaVigencia : a.fimVigencia;
  const dataEfetiva = parseDataBR(vigenciaEfetivaStr);
  const diasReais = dataEfetiva ? diasAteHoje(dataEfetiva) : null;

  let statusPrincipal;
  if (diasReais === null) statusPrincipal = "VIGENTE";
  else if (diasReais < 0) statusPrincipal = "VENCIDA";
  else if (renovada) statusPrincipal = "RENOVADA";
  else if (diasReais <= 30) statusPrincipal = "PRÓXIMA DO VENCIMENTO";
  else statusPrincipal = "VIGENTE";

  let severidade;
  if (diasReais === null) severidade = "normal";
  else if (diasReais < 0) severidade = "vencida";
  else if (diasReais === 0) severidade = "critico";
  else if (diasReais <= 7) severidade = "critico";
  else if (diasReais <= 15) severidade = "alerta";
  else if (diasReais <= 30) severidade = "atencao";
  else if (diasReais <= 60) severidade = "moderada";
  else severidade = "normal";

  return { ...a, renovada, vigenciaEfetiva: vigenciaEfetivaStr, diasReais, statusPrincipal, severidade };
}

/** Texto amigável pros dias restantes ("Vence hoje", "Vencida há 18 dias"...). */
function textoDias(diasReais) {
  if (diasReais === null) return "-";
  if (diasReais === 0) return "Vence hoje";
  if (diasReais < 0) return `Vencida há ${Math.abs(diasReais)} dia${Math.abs(diasReais) === 1 ? "" : "s"}`;
  return `${diasReais} dia${diasReais === 1 ? "" : "s"}`;
}

const SEVERIDADE_ICONE = {
  normal: "●", moderada: "●", atencao: "▲", alerta: "▲", critico: "⚠", vencida: "⛔"
};

const STATUS_BADGE_CLASSE = {
  "VIGENTE": "st-vigente",
  "PRÓXIMA DO VENCIMENTO": "st-proxima",
  "VENCIDA": "st-vencida",
  "RENOVADA": "st-renovada"
};

/* ---------- Estado da Central de Atas ---------- */
let atasEstado = {
  busca: "",
  status: "todos",
  ano: "todos",
  prazo: "todos",
  ordenacao: { campo: "diasReais", direcao: "asc" },
  pagina: 1,
  porPagina: 25,
  view: "tabela",
  kpiAtivo: null // qual KPI está "clicado" (visual), null = nenhum
};

/** Lista de atas já enriquecida com os campos calculados (recalculada a cada render). */
function getAtasEnriquecidas() {
  return DASHBOARD_DATA.controleProcessos.atas.map(computarAta);
}

function getAnoDoPregao(pregao) {
  const m = (pregao || "").match(/\/(\d{4})$/);
  return m ? m[1] : null;
}

function getAtasFiltradas() {
  const todas = getAtasEnriquecidas();
  const busca = atasEstado.busca.trim().toLowerCase();

  return todas.filter(a => {
    const statusOk = atasEstado.status === "todos" || a.statusPrincipal === atasEstado.status;
    const anoOk = atasEstado.ano === "todos" || getAnoDoPregao(a.pregao) === atasEstado.ano;

    let prazoOk = true;
    if (atasEstado.prazo !== "todos" && a.diasReais !== null) {
      if (atasEstado.prazo === "vencidas") prazoOk = a.diasReais < 0;
      else if (atasEstado.prazo === "mais60") prazoOk = a.diasReais > 60;
      else prazoOk = a.diasReais >= 0 && a.diasReais <= Number(atasEstado.prazo);
    } else if (atasEstado.prazo !== "todos" && a.diasReais === null) {
      prazoOk = false;
    }

    const buscaOk = !busca || `${a.pregao} ${a.objeto} ${a.obs}`.toLowerCase().includes(busca);

    return statusOk && anoOk && prazoOk && buscaOk;
  });
}

function getAtasOrdenadas(lista) {
  const { campo, direcao } = atasEstado.ordenacao;
  const mult = direcao === "asc" ? 1 : -1;

  return [...lista].sort((a, b) => {
    let va = a[campo], vb = b[campo];

    if (campo === "diasReais") {
      va = va === null ? Infinity : va;
      vb = vb === null ? Infinity : vb;
      return (va - vb) * mult;
    }
    if (campo === "inicioVigencia" || campo === "fimVigencia" || campo === "novaVigencia") {
      const da = parseDataBR(va) || new Date(0);
      const db = parseDataBR(vb) || new Date(0);
      return (da - db) * mult;
    }
    // texto (pregao, objeto, statusPrincipal)
    return String(va || "").localeCompare(String(vb || ""), "pt-BR") * mult;
  });
}

/** Popula o <select> de Ano com os anos realmente presentes nos pregões. */
function popularFiltroAnoAtas() {
  const todas = getAtasEnriquecidas();
  const anos = [...new Set(todas.map(a => getAnoDoPregao(a.pregao)).filter(Boolean))].sort((a, b) => b - a);
  const sel = document.getElementById("atasFiltroAno");
  sel.innerHTML = `<option value="todos">Ano: Todos</option>` + anos.map(a => `<option value="${a}">${a}</option>`).join("");
  sel.value = atasEstado.ano;
}

/** KPIs — SEMPRE calculados sobre o conjunto já filtrado (resumo dinâmico). */
function renderAtasKPIs(lista) {
  const total = lista.length;
  const vigentes = lista.filter(a => a.statusPrincipal === "VIGENTE").length;
  const renovadas = lista.filter(a => a.renovada).length;
  const atencao30 = lista.filter(a => a.diasReais !== null && a.diasReais >= 0 && a.diasReais <= 30).length;
  const urgentes7 = lista.filter(a => a.diasReais !== null && a.diasReais >= 0 && a.diasReais <= 7).length;
  const vencidas = lista.filter(a => a.diasReais !== null && a.diasReais < 0).length;

  const cards = [
    { chave: "total", label: "Total", valor: total, sub: "Atas cadastradas", tema: "tema-secao" },
    { chave: "vigentes", label: "Vigentes", valor: vigentes, sub: "Atas em vigor", tema: "status-adequado" },
    { chave: "renovadas", label: "Renovadas", valor: renovadas, sub: "Já renovadas", tema: "tema-secao" },
    { chave: "atencao", label: "Atenção", valor: atencao30, sub: "Vencem em até 30 dias", tema: "status-atencao" },
    { chave: "urgentes", label: "Urgentes", valor: urgentes7, sub: "Vencem em até 7 dias", tema: "status-critico" },
    { chave: "vencidas", label: "Vencidas", valor: vencidas, sub: "Necessitam providência", tema: "status-critico" }
  ];

  document.getElementById("atasKpiGrid").innerHTML = cards.map(c => `
    <div class="kpi ${c.tema} ${atasEstado.kpiAtivo === c.chave ? "ativo" : ""}" data-kpi="${c.chave}">
      <div class="label">${c.label}</div>
      <div class="value">${c.valor}</div>
      <div class="sub">${c.sub}</div>
    </div>
  `).join("");
}

/** Aplica o filtro correspondente ao clicar num card de KPI. */
function aplicarFiltroKpiAtas(chave) {
  atasEstado.kpiAtivo = atasEstado.kpiAtivo === chave ? null : chave;
  const ativo = atasEstado.kpiAtivo;

  // Reseta pro estado neutro antes de aplicar o novo filtro
  atasEstado.status = "todos";
  atasEstado.prazo = "todos";

  if (ativo === "vigentes") atasEstado.status = "VIGENTE";
  else if (ativo === "renovadas") atasEstado.status = "RENOVADA";
  else if (ativo === "atencao") atasEstado.prazo = "30";
  else if (ativo === "urgentes") atasEstado.prazo = "7";
  else if (ativo === "vencidas") atasEstado.prazo = "vencidas";
  // "total" ou clique de novo no mesmo card = limpa (ativo já foi setado null acima)

  atasEstado.pagina = 1;
  sincronizarControlesAtas();
  renderAtasCompleto();
}

/** Faixa de alerta inteligente, calculada sobre TODAS as atas (não só o filtro atual). */
function renderAtasAlerta() {
  const todas = getAtasEnriquecidas();
  const urgentes7 = todas.filter(a => a.diasReais !== null && a.diasReais >= 0 && a.diasReais <= 7).length;
  const atencao30 = todas.filter(a => a.diasReais !== null && a.diasReais >= 0 && a.diasReais <= 30).length;
  const vencidas = todas.filter(a => a.diasReais !== null && a.diasReais < 0).length;

  const el = document.getElementById("atasAlerta");

  if (vencidas > 0) {
    el.className = "atas-alerta nivel-critico";
    el.innerHTML = `<span class="atas-alerta-texto">⛔ <strong>${vencidas} Ata${vencidas === 1 ? "" : "s"}</strong> já ${vencidas === 1 ? "está" : "estão"} vencida${vencidas === 1 ? "" : "s"} e precisa${vencidas === 1 ? "" : "m"} de providência.</span><button data-ver="vencidas">Ver Atas</button>`;
  } else if (urgentes7 > 0) {
    el.className = "atas-alerta nivel-critico";
    el.innerHTML = `<span class="atas-alerta-texto">⚠ <strong>${urgentes7} Ata${urgentes7 === 1 ? "" : "s"}</strong> vence${urgentes7 === 1 ? "" : "m"} nos próximos 7 dias.</span><button data-ver="urgentes">Ver Atas</button>`;
  } else if (atencao30 > 0) {
    el.className = "atas-alerta nivel-atencao";
    el.innerHTML = `<span class="atas-alerta-texto">⚠ <strong>ATENÇÃO:</strong> ${atencao30} Ata${atencao30 === 1 ? "" : "s"} possue${atencao30 === 1 ? "" : "m"} término de vigência nos próximos 30 dias.</span><button data-ver="atencao">Ver Atas</button>`;
  } else {
    el.className = "atas-alerta nivel-ok";
    el.innerHTML = `<span class="atas-alerta-texto">✅ Tudo em dia. Nenhuma Ata exige atenção imediata.</span>`;
  }
}

/** Sincroniza os controles visuais (selects) com o estado atual. */
function sincronizarControlesAtas() {
  document.getElementById("atasFiltroStatus").value = atasEstado.status;
  document.getElementById("atasFiltroAno").value = atasEstado.ano;
  document.getElementById("atasFiltroPrazo").value = atasEstado.prazo;
  document.getElementById("atasBusca").value = atasEstado.busca;
}

function renderAtasTabela(listaOrdenada) {
  const total = listaOrdenada.length;
  const porPagina = atasEstado.porPagina;
  const totalPaginas = Math.max(1, Math.ceil(total / porPagina));
  if (atasEstado.pagina > totalPaginas) atasEstado.pagina = totalPaginas;
  const inicio = (atasEstado.pagina - 1) * porPagina;
  const pagina = listaOrdenada.slice(inicio, inicio + porPagina);

  document.getElementById("atasVazio").classList.toggle("hidden", total > 0);
  document.getElementById("atasPainelTabela").querySelector("table").style.display = total > 0 ? "" : "none";

  document.getElementById("atasBody").innerHTML = pagina.map(a => {
    const badgeClasse = STATUS_BADGE_CLASSE[a.statusPrincipal] || "st-vigente";
    const icone = SEVERIDADE_ICONE[a.severidade] || "●";
    const prorrogada = a.renovada && a.novaVigencia
      ? `<span class="atas-tag-prorrogada">PRORROGADA</span>` : "";

    return `
      <tr>
        <td>
          <button class="atas-pregao-link" data-abrir-modal="${a.pregao}">${a.pregao}</button>
        </td>
        <td>
          <span class="atas-objeto-texto" title="${(a.objeto || "").replace(/"/g, "&quot;")}" data-abrir-modal="${a.pregao}">${a.objeto || "-"}</span>
        </td>
        <td class="venc">${a.inicioVigencia || "-"}</td>
        <td class="venc">${a.fimVigencia || "-"}</td>
        <td><span class="atas-dias sev-${a.severidade}">${icone} ${textoDias(a.diasReais)}</span></td>
        <td><span class="badge-status ${badgeClasse}">${a.statusPrincipal}</span></td>
        <td><button class="atas-acoes-btn" data-abrir-modal="${a.pregao}" title="Ver detalhes">&#8942;</button></td>
        <td>${a.novaVigencia || "-"}${prorrogada}</td>
        <td><span class="atas-obs-texto" title="${(a.obs || "").replace(/"/g, "&quot;")}" data-abrir-modal="${a.pregao}">${a.obs || "-"}</span></td>
      </tr>
    `;
  }).join("");

  document.getElementById("atasResultadoTexto").textContent = total > 0
    ? `Exibindo ${inicio + 1}–${Math.min(inicio + porPagina, total)} de ${total} Atas`
    : "0 Atas encontradas";
  document.getElementById("atasResumoTopo").textContent = `${total} de ${getAtasEnriquecidas().length} atas`;

  renderAtasPaginacao(total, totalPaginas);
}

function renderAtasPaginacao(total, totalPaginas) {
  const el = document.getElementById("atasPaginacao");
  if (total === 0 || totalPaginas <= 1) { el.innerHTML = ""; return; }

  const pag = atasEstado.pagina;
  let botoes = `<button data-pagina="${pag - 1}" ${pag === 1 ? "disabled" : ""}>&#8249;</button>`;
  const janela = 2;
  for (let p = 1; p <= totalPaginas; p++) {
    if (p === 1 || p === totalPaginas || (p >= pag - janela && p <= pag + janela)) {
      botoes += `<button data-pagina="${p}" class="${p === pag ? "ativo" : ""}">${p}</button>`;
    } else if (p === pag - janela - 1 || p === pag + janela + 1) {
      botoes += `<span style="padding:0 4px;color:var(--text-muted);">…</span>`;
    }
  }
  botoes += `<button data-pagina="${pag + 1}" ${pag === totalPaginas ? "disabled" : ""}>&#8250;</button>`;
  el.innerHTML = botoes;
}

/* ---------- Cronograma (visão alternativa) ---------- */
function renderAtasCronograma(lista) {
  const proximas = lista
    .filter(a => a.diasReais !== null && a.diasReais >= -30 && a.diasReais <= 120)
    .sort((a, b) => a.diasReais - b.diasReais);

  if (proximas.length === 0) {
    document.getElementById("atasCronograma").innerHTML = `<p style="color:var(--text-muted);font-size:13px;">Nenhuma Ata no intervalo de -30 a +120 dias pra mostrar no cronograma.</p>`;
    return;
  }

  const grupos = {};
  proximas.forEach(a => {
    const data = parseDataBR(a.vigenciaEfetiva);
    const chave = data ? `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, "0")}` : "?";
    (grupos[chave] = grupos[chave] || []).push(a);
  });

  document.getElementById("atasCronograma").innerHTML = Object.keys(grupos).sort().map(chave => {
    const [ano, mes] = chave.split("-");
    const label = `${MESES_ABREV[parseInt(mes, 10) - 1]}/${ano}`;
    const itens = grupos[chave];
    return `
      <div class="atas-cronograma-mes">
        <div class="atas-cronograma-mes-titulo">${label} (${itens.length})</div>
        ${itens.map(a => {
          const cor = { normal: "#94a3b8", moderada: "#3b82f6", atencao: "#f5a623", alerta: "#f5a623", critico: "#e34848", vencida: "#9f1d1d" }[a.severidade];
          return `
            <div class="atas-cronograma-item">
              <span class="bolinha" style="background:${cor}"></span>
              <span class="objeto">${a.pregao} — ${a.objeto}</span>
              <span class="dias" style="color:${cor}">${textoDias(a.diasReais)}</span>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }).join("");
}

/* ---------- Modal de detalhes ---------- */
function abrirModalAta(pregao) {
  const a = getAtasEnriquecidas().find(x => x.pregao === pregao);
  if (!a) return;

  document.getElementById("atasModalTitulo").textContent = `Ata ${a.pregao}`;
  const badgeClasse = STATUS_BADGE_CLASSE[a.statusPrincipal] || "st-vigente";

  const timeline = `
    <div class="atas-timeline">
      <div class="ponto"><div class="bola"></div><div class="data">${a.inicioVigencia || "-"}</div><div class="rotulo">Início</div></div>
      <div class="linha-conexao"></div>
      <div class="ponto"><div class="bola"></div><div class="data">${a.fimVigencia || "-"}</div><div class="rotulo">Fim original</div></div>
      ${a.renovada && a.novaVigencia ? `
        <div class="linha-conexao"></div>
        <div class="ponto futuro"><div class="bola"></div><div class="data">${a.novaVigencia}</div><div class="rotulo">Nova vigência</div></div>
      ` : ""}
    </div>
  `;

  document.getElementById("atasModalCorpo").innerHTML = `
    <div class="linha"><span>Objeto</span><span>${a.objeto || "-"}</span></div>
    <div class="linha"><span>Status</span><span><span class="badge-status ${badgeClasse}">${a.statusPrincipal}</span></span></div>
    <div class="linha"><span>Dias restantes</span><span>${textoDias(a.diasReais)}</span></div>
    <div class="linha"><span>Início da vigência</span><span>${a.inicioVigencia || "-"}</span></div>
    <div class="linha"><span>Fim da vigência</span><span>${a.fimVigencia || "-"}</span></div>
    <div class="linha"><span>Renovada</span><span>${a.renovada ? "Sim" : "Não"}</span></div>
    ${timeline}
    <div class="obs-completa"><strong>Observações:</strong><br>${a.obs || "Nenhuma observação registrada."}</div>
  `;

  document.getElementById("atasModalBackdrop").classList.remove("hidden");
  document.getElementById("atasModal").classList.remove("hidden");
}

function fecharModalAta() {
  document.getElementById("atasModalBackdrop").classList.add("hidden");
  document.getElementById("atasModal").classList.add("hidden");
}

/* ---------- Exportação ---------- */
function getLinhasParaExportar() {
  const lista = getAtasOrdenadas(getAtasFiltradas());
  return lista.map(a => ({
    "Pregão/Ano": a.pregao,
    "Objeto": a.objeto,
    "Início Vigência": a.inicioVigencia,
    "Fim Vigência": a.fimVigencia,
    "Dias Restantes": a.diasReais === null ? "" : a.diasReais,
    "Status": a.statusPrincipal,
    "Nova Vigência": a.novaVigencia || "",
    "OBS": a.obs || ""
  }));
}

function exportarAtasCSV() {
  const linhas = getLinhasParaExportar();
  if (linhas.length === 0) return;
  const cabecalho = Object.keys(linhas[0]);
  const csv = [
    cabecalho.join(";"),
    ...linhas.map(l => cabecalho.map(c => `"${String(l[c]).replace(/"/g, '""')}"`).join(";"))
  ].join("\n");

  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "atas_gap-gl.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function exportarAtasExcel() {
  if (typeof XLSX === "undefined") { alert("Biblioteca de exportação Excel não carregou. Verifique sua conexão."); return; }
  const linhas = getLinhasParaExportar();
  const ws = XLSX.utils.json_to_sheet(linhas);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Atas");
  XLSX.writeFile(wb, "atas_gap-gl.xlsx");
}

function exportarAtasPDF() {
  window.print();
}

/* ---------- Orquestração ---------- */
function renderAtasCompleto() {
  const filtradas = getAtasFiltradas();
  const ordenadas = getAtasOrdenadas(filtradas);

  renderAtasAlerta();
  renderAtasKPIs(filtradas);
  renderAtasTabela(ordenadas);
  if (atasEstado.view === "cronograma") renderAtasCronograma(filtradas);

  // Indicadores de ordenação nos cabeçalhos
  document.querySelectorAll(".atas-tabela th.ordenavel").forEach(th => {
    th.classList.remove("ordenado-asc", "ordenado-desc");
    if (th.dataset.campo === atasEstado.ordenacao.campo) {
      th.classList.add(atasEstado.ordenacao.direcao === "asc" ? "ordenado-asc" : "ordenado-desc");
    }
  });
}

function renderAtas() {
  popularFiltroAnoAtas();
  renderAtasCompleto();
}

function setupAtasEventos() {
  document.getElementById("atasBusca").addEventListener("input", e => {
    atasEstado.busca = e.target.value; atasEstado.pagina = 1; renderAtasCompleto();
  });
  document.getElementById("atasFiltroStatus").addEventListener("change", e => {
    atasEstado.status = e.target.value; atasEstado.kpiAtivo = null; atasEstado.pagina = 1; renderAtasCompleto();
  });
  document.getElementById("atasFiltroAno").addEventListener("change", e => {
    atasEstado.ano = e.target.value; atasEstado.pagina = 1; renderAtasCompleto();
  });
  document.getElementById("atasFiltroPrazo").addEventListener("change", e => {
    atasEstado.prazo = e.target.value; atasEstado.kpiAtivo = null; atasEstado.pagina = 1; renderAtasCompleto();
  });
  document.getElementById("atasPorPagina").addEventListener("change", e => {
    atasEstado.porPagina = Number(e.target.value); atasEstado.pagina = 1; renderAtasCompleto();
  });

  document.getElementById("atasToggleAvancado").addEventListener("click", () => {
    document.getElementById("atasFiltrosAvancados").classList.toggle("hidden");
  });

  document.getElementById("atasOrdenarUrgencia").addEventListener("click", () => {
    atasEstado.ordenacao = { campo: "diasReais", direcao: "asc" };
    renderAtasCompleto();
  });

  const limpar = () => {
    atasEstado = { ...atasEstado, busca: "", status: "todos", ano: "todos", prazo: "todos", pagina: 1, kpiAtivo: null };
    sincronizarControlesAtas();
    renderAtasCompleto();
  };
  document.getElementById("atasLimparFiltros").addEventListener("click", limpar);
  document.getElementById("atasLimparFiltros2").addEventListener("click", limpar);

  document.getElementById("atasViewTabela").addEventListener("click", () => {
    atasEstado.view = "tabela";
    document.getElementById("atasViewTabela").classList.add("active");
    document.getElementById("atasViewCronograma").classList.remove("active");
    document.getElementById("atasPainelTabela").classList.remove("hidden");
    document.getElementById("atasPainelCronograma").classList.add("hidden");
  });
  document.getElementById("atasViewCronograma").addEventListener("click", () => {
    atasEstado.view = "cronograma";
    document.getElementById("atasViewCronograma").classList.add("active");
    document.getElementById("atasViewTabela").classList.remove("active");
    document.getElementById("atasPainelCronograma").classList.remove("hidden");
    document.getElementById("atasPainelTabela").classList.add("hidden");
    renderAtasCronograma(getAtasFiltradas());
  });

  document.getElementById("atasExportCsv").addEventListener("click", exportarAtasCSV);
  document.getElementById("atasExportExcel").addEventListener("click", exportarAtasExcel);
  document.getElementById("atasExportPdf").addEventListener("click", exportarAtasPDF);

  // Ordenação por clique no cabeçalho
  document.querySelectorAll(".atas-tabela th.ordenavel").forEach(th => {
    th.innerHTML += ` <span class="seta">▲▼</span>`;
    th.addEventListener("click", () => {
      const campo = th.dataset.campo;
      if (atasEstado.ordenacao.campo === campo) {
        atasEstado.ordenacao.direcao = atasEstado.ordenacao.direcao === "asc" ? "desc" : "asc";
      } else {
        atasEstado.ordenacao = { campo, direcao: "asc" };
      }
      renderAtasCompleto();
    });
  });

  // KPIs clicáveis (delegação, já que o conteúdo é recriado a cada render)
  document.getElementById("atasKpiGrid").addEventListener("click", e => {
    const card = e.target.closest("[data-kpi]");
    if (card) aplicarFiltroKpiAtas(card.dataset.kpi);
  });

  // Botão "Ver Atas" do alerta inteligente
  document.getElementById("atasAlerta").addEventListener("click", e => {
    const btn = e.target.closest("[data-ver]");
    if (!btn) return;
    const alvo = btn.dataset.ver;
    if (alvo === "vencidas") aplicarFiltroKpiAtas("vencidas");
    else if (alvo === "urgentes") aplicarFiltroKpiAtas("urgentes");
    else if (alvo === "atencao") aplicarFiltroKpiAtas("atencao");
  });

  // Abrir modal (pregão, objeto, OBS ou botão de ações — delegação num único listener)
  document.getElementById("atasBody").addEventListener("click", e => {
    const gatilho = e.target.closest("[data-abrir-modal]");
    if (gatilho) abrirModalAta(gatilho.dataset.abrirModal);
  });

  // Paginação (delegação, botões recriados a cada render)
  document.getElementById("atasPaginacao").addEventListener("click", e => {
    const btn = e.target.closest("[data-pagina]");
    if (!btn || btn.disabled) return;
    atasEstado.pagina = Number(btn.dataset.pagina);
    renderAtasCompleto();
  });

  // Modal: fechar
  document.getElementById("atasModalFechar").addEventListener("click", fecharModalAta);
  document.getElementById("atasModalBackdrop").addEventListener("click", fecharModalAta);
}

function renderPipeline() {
  const pipeline = DASHBOARD_DATA.controleProcessos.pipeline;
  const categoriaAtiva = document.querySelector("#pipelineTabs button.active")?.dataset.cat || "Materiais de Consumo";
  const itens = pipeline.filter(p => p.categoria === categoriaAtiva);

  document.getElementById("pipelineGrid").innerHTML = itens.map(p => `
    <div class="pipeline-card">
      <span class="tag-ata ${p.ataVigente ? "sim" : "nao"}">${p.ataVigente ? "Ata Vigente" : "Sem Ata"}</span>
      <div class="obj">${p.objeto}</div>
      ${p.vigencia ? `<div class="meta-row"><span>Vigência</span><span>${p.vigencia}</span></div>` : ""}
      ${p.licitacao ? `<div class="meta-row"><span>Licitação</span><span>${p.licitacao}</span></div>` : ""}
      <div class="meta-row"><span>Status</span><span>${p.status}</span></div>
      ${p.observacao ? `<div class="obs">${p.observacao}</div>` : ""}
    </div>
  `).join("");
}

function setupPipelineTabs() {
  document.querySelectorAll("#pipelineTabs button").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#pipelineTabs button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderPipeline();
    });
  });
}

/* ---------- Histórico de Processos (filtros) ---------- */

/** Extrai o ano de um código de licitação, aceitando "9005/2026" ou "9005/26". */
function extrairAnoDaLicitacao(licitacao) {
  const lic = (licitacao || "").trim();
  if (!lic || lic === "-") return null;
  const m4 = lic.match(/(20\d{2})/);
  if (m4) return m4[1];
  const m2 = lic.match(/\/(\d{2})$/);
  if (m2) return "20" + m2[1];
  return null;
}

/** Extrai o ano de uma data "dd/mm/aaaa" (usada nas datas de planejamento/publicação). */
function extrairAnoDaData(data) {
  const d = (data || "").trim();
  const m = d.match(/(\d{2})\/(\d{2})\/(\d{4})/);
  return m ? m[3] : null;
}

/** Extrai o ano do PAG, formato "67107.005813/2026-16" (ano logo antes do "-NN" final). */
function extrairAnoDoPAG(pag) {
  const p = (pag || "").trim();
  const m = p.match(/\/(\d{4})-\d+$/);
  return m ? m[1] : null;
}

/** Ano-calendário atual, usado como último recurso quando nada mais indica o ano. */
function anoVigente() {
  return String(new Date().getFullYear());
}

/**
 * Ano de um processo, em ordem de prioridade (a primeira que existir vence):
 *   1. Número da Licitação (coluna B)
 *   2. Data Início Planejamento (coluna L)
 *   3. Data Início Publicação (coluna N)
 *   4. Número do PAG (coluna A)
 *   5. Ano-calendário vigente (nunca fica sem classificação)
 */
function extrairAno(processoOuLicitacao) {
  // Aceita tanto o objeto do processo inteiro quanto só a string da licitação,
  // pra não quebrar nenhum lugar do código que já chamava extrairAno(string).
  if (typeof processoOuLicitacao === "string") {
    return extrairAnoDaLicitacao(processoOuLicitacao) || anoVigente();
  }
  const p = processoOuLicitacao || {};
  return (
    extrairAnoDaLicitacao(p.licitacao) ||
    extrairAnoDaData(p.dataInicioPlanejamento) ||
    extrairAnoDaData(p.dataInicioPublicacao) ||
    extrairAnoDoPAG(p.pag) ||
    anoVigente()
  );
}

let filtroEstado = { ano: "2026", status: "todos", busca: "" };

function popularFiltrosProcessos() {
  const processos = DASHBOARD_DATA.controleProcessos.processos;

  // Com as 5 prioridades, todo processo SEMPRE cai em algum ano — não existe
  // mais "Sem número" no filtro.
  const anos = new Set(processos.map(p => extrairAno(p)));
  const anosOrdenados = [...anos].sort((a, b) => b - a);

  const selAno = document.getElementById("filtroAno");
  selAno.innerHTML =
    `<option value="todos">Todos os anos</option>` +
    anosOrdenados.map(a => `<option value="${a}">${a}</option>`).join("");
  selAno.value = anosOrdenados.includes("2026") ? "2026" : "todos";
  filtroEstado.ano = selAno.value;

  const selStatus = document.getElementById("filtroStatus");
  selStatus.innerHTML = `<option value="todos">Todos os status</option>` +
    STATUS_CANONICO.map(c => `<option value="${c.chave}">${c.rotulo}</option>`).join("");
}

function getProcessosFiltrados() {
  const processos = DASHBOARD_DATA.controleProcessos.processos;
  const busca = filtroEstado.busca.trim().toLowerCase();

  return processos.filter(p => {
    const ano = extrairAno(p);
    const anoOk = filtroEstado.ano === "todos" ? true : ano === filtroEstado.ano;

    const statusOk = filtroEstado.status === "todos" ? true :
      classificarStatus(p.status).chave === filtroEstado.status;

    // Campos visíveis (objeto, responsável, OM) + campos ocultos na tabela mas
    // pesquisáveis (PAG, subprocesso, contato, responsáveis e datas de
    // planejamento/publicação).
    const camposBusca = [
      p.objeto, p.responsavel, p.om, p.subprocesso, p.pag, p.contato,
      p.responsavelPlanejamento, p.responsavelPublicacao,
      p.dataInicioPlanejamento, p.dataInicioPublicacao
    ].filter(Boolean).join(" ");
    const buscaOk = !busca || camposBusca.toLowerCase().includes(busca);

    return anoOk && statusOk && buscaOk;
  });
}

function renderTabelaProcessos(lista) {
  document.getElementById("processosBody").innerHTML = lista.map(p => {
    const c = classificarStatus(p.status);
    return `
      <tr>
        <td class="nup">${p.licitacao || "-"}</td>
        <td>${p.modalidade}</td>
        <td><span class="pill" style="background:${c.cor}22;color:${c.cor};">${c.rotulo}</span></td>
        <td>${p.objeto}</td>
        <td>${p.om}</td>
        <td>${p.responsavel || "-"}</td>
        <td class="venc">${p.abertura || "-"}</td>
      </tr>
    `;
  }).join("");
}

/** Recalcula tudo que depende do filtro: KPIs, status, rankings e tabela. */
function atualizarAcompanhamentoProcessos() {
  const total = DASHBOARD_DATA.controleProcessos.processos.length;
  const filtrados = getProcessosFiltrados();

  document.getElementById("panoramaTotal").textContent =
    `${filtrados.length} de ${total} processos`;

  renderSecaoKPIs(filtrados);
  renderPanorama(filtrados);
  renderRankings(filtrados);
  renderTabelaProcessos(filtrados);
}

function setupFiltrosProcessos() {
  document.getElementById("filtroAno").addEventListener("change", e => {
    filtroEstado.ano = e.target.value;
    atualizarAcompanhamentoProcessos();
  });
  document.getElementById("filtroStatus").addEventListener("change", e => {
    filtroEstado.status = e.target.value;
    atualizarAcompanhamentoProcessos();
  });
  document.getElementById("filtroBusca").addEventListener("input", e => {
    filtroEstado.busca = e.target.value;
    atualizarAcompanhamentoProcessos();
  });
}

/* ---------- Navegação: hambúrguer + páginas ---------- */

function mostrarPagina(pagina) {
  document.getElementById("page-rag").classList.toggle("hidden", pagina !== "rag");
  document.getElementById("page-pca2").classList.toggle("hidden", pagina !== "pca2");
  document.getElementById("page-secao").classList.toggle("hidden", pagina !== "secao");
  document.querySelectorAll(".sidebar-link").forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === location.hash);
  });
}

function abrirSidebar() {
  document.getElementById("sidebarPanel").classList.remove("slide-out");
  document.getElementById("sidebarBackdrop").classList.remove("hidden");
}
function fecharSidebar() {
  document.getElementById("sidebarPanel").classList.add("slide-out");
  document.getElementById("sidebarBackdrop").classList.add("hidden");
}

function irParaHash(hash) {
  const id = (hash || "").replace("#", "");
  const link = document.querySelector(`.sidebar-link[href="#${id}"]`);
  const pagina = link ? link.dataset.page : "rag";
  mostrarPagina(pagina);
  if (link) location.hash = hash;
  fecharSidebar();
  const el = document.getElementById(id);
  if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
}

function setupNavegacao() {
  document.getElementById("menuToggle").addEventListener("click", abrirSidebar);
  document.getElementById("sidebarClose").addEventListener("click", fecharSidebar);
  document.getElementById("sidebarBackdrop").addEventListener("click", fecharSidebar);

  document.querySelectorAll(".sidebar-link").forEach(a => {
    a.addEventListener("click", e => {
      e.preventDefault();
      irParaHash(a.getAttribute("href"));
    });
  });

  const inicial = location.hash && document.querySelector(`.sidebar-link[href="${location.hash}"]`);
  mostrarPagina(inicial ? inicial.dataset.page : "rag");
}

/* ============================================================
   ANALÍTICO DO PCA (Compras.gov)
   ============================================================ */

/** Converte valores no formato BR ("120.000,00" ou "120000.00") em número. */
function parseValorBR(v) {
  if (!v) return 0;
  v = v.trim();
  if (v.includes(",")) {
    return parseFloat(v.replace(/\./g, "").replace(",", ".")) || 0;
  }
  return parseFloat(v) || 0;
}

function formatarMoeda(valor) {
  return "R$ " + Number(valor).toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

const CATEGORIA_LABELS = { "BENS": "Bens", "SERVICOS": "Serviços", "CONTRATACOES_TIC": "TIC" };
const CATEGORIA_CORES  = { "BENS": "#3b82f6", "SERVICOS": "#14b8a6", "CONTRATACOES_TIC": "#b45309" };
const PRIORIDADE_CORES = { "Alto": "#e34848", "Médio": "#f5a623", "Baixo": "#22c55e" };
const SITUACAO_LABELS  = { "nao_iniciado": "Não Iniciado", "Preparação": "Preparação", "Edição": "Edição",
                            "Divulgada": "Divulgada", "Fase Externa": "Fase Externa", "Suspensa": "Suspensa" };
const SITUACAO_CORES   = { "nao_iniciado": "#94a3b8", "Preparação": "#3b82f6", "Edição": "#b45309",
                            "Divulgada": "#14b8a6", "Fase Externa": "#22c55e", "Suspensa": "#e34848" };

/** Estado dos filtros da página Analítico do PCA. */
let filtroPca = { ano: "2026", categoria: "todos", prioridade: "todos", situacao: "todos", busca: "" };

/** Retorna a chave de situação usada para contagem/filtro ("" vira "nao_iniciado"). */
function chaveSituacao(situacaoBruta) {
  return (!situacaoBruta || situacaoBruta.trim() === "") ? "nao_iniciado" : situacaoBruta.trim();
}

/** Todos os itens do ano selecionado no filtro global da página (ou todos os anos). */
function getItensAnoPca() {
  const todos = DASHBOARD_DATA.pcaAnalitico.itens;
  return filtroPca.ano === "todos" ? todos : todos.filter(i => i.ano === filtroPca.ano);
}

/** Itens do ano selecionado, com os filtros refinados (categoria/prioridade/situação/busca). */
function getItensFiltradosPca() {
  const busca = filtroPca.busca.trim().toLowerCase();
  return getItensAnoPca().filter(i => {
    const catOk = filtroPca.categoria === "todos" || i.categoria === filtroPca.categoria;
    const prioOk = filtroPca.prioridade === "todos" || i.prioridade === filtroPca.prioridade;
    const sitOk = filtroPca.situacao === "todos" || chaveSituacao(i.situacao) === filtroPca.situacao;
    const buscaOk = !busca || `${i.titulo} ${i.areaRequisitante}`.toLowerCase().includes(busca);
    return catOk && prioOk && sitOk && buscaOk;
  });
}

function popularFiltroAnoPca() {
  const anos = [...new Set(DASHBOARD_DATA.pcaAnalitico.itens.map(i => i.ano))].sort((a, b) => b - a);
  const sel = document.getElementById("filtroAnoPca2");
  sel.innerHTML = anos.map(a => `<option value="${a}">${a}</option>`).join("") + `<option value="todos">Todos os anos</option>`;

  // Padrão: o ano-calendário atual, se ele existir entre os dados; senão, o mais recente disponível.
  const anoAtual = String(new Date().getFullYear());
  const padrao = anos.includes(anoAtual) ? anoAtual : (anos[0] || "todos");
  sel.value = padrao;
  filtroPca.ano = padrao;
}

/** Converte valores no formato BR ("120.000,00" ou "120000.00") em número. */
function parseValorBR(v) {
  if (!v) return 0;
  v = v.trim();
  if (v.includes(",")) {
    return parseFloat(v.replace(/\./g, "").replace(",", ".")) || 0;
  }
  return parseFloat(v) || 0;
}

function formatarMoeda(valor) {
  return "R$ " + Number(valor).toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function renderPca2KPIs() {
  const itens = getItensAnoPca();
  const valorTotal = itens.reduce((soma, i) => soma + parseValorBR(i.valorTotal), 0);
  const contratacoesDistintas = new Set(itens.map(i => i.numero)).size;
  const prioridadeAlta = itens.filter(i => i.prioridade.trim().toLowerCase() === "alto").length;
  const naoIniciados = itens.filter(i => chaveSituacao(i.situacao) === "nao_iniciado").length;

  document.getElementById("kpiGridPca2").innerHTML = `
    <div class="kpi tema-pca2">
      <div class="label">Valor Estimado (PCA)</div>
      <div class="value">${formatarMoeda(valorTotal)}</div>
      <div class="sub">${itens.length} itens &middot; ${contratacoesDistintas} contratações</div>
    </div>
    <div class="kpi tema-pca2 clicavel" data-campo="prioridade" data-valor="Alto">
      <div class="label">Prioridade Alta</div>
      <div class="value">${prioridadeAlta}</div>
      <div class="sub">clique para ver os itens &rarr;</div>
    </div>
    <div class="kpi status-critico clicavel" data-campo="situacao" data-valor="nao_iniciado">
      <div class="label">Ainda Não Iniciados</div>
      <div class="value">${naoIniciados}</div>
      <div class="sub">${itens.length ? Math.round((naoIniciados / itens.length) * 100) : 0}% do total &middot; clique para ver &rarr;</div>
    </div>
    <div class="kpi tema-pca2">
      <div class="label">Total de Itens</div>
      <div class="value">${itens.length}</div>
      <div class="sub">linhas de demanda registradas</div>
    </div>
  `;
}

/** Legenda clicável genérica: contagem já vem com as chaves cruas (usadas no filtro). */
function renderLegendaClicavel(elId, contagem, cores, labels, campoFiltro) {
  const total = Object.values(contagem).reduce((a, b) => a + b, 0) || 1;
  document.getElementById(elId).innerHTML = Object.entries(contagem)
    .sort((a, b) => b[1] - a[1])
    .map(([chave, qtd]) => `
      <div class="item clicavel" data-campo="${campoFiltro}" data-valor="${chave}">
        <span style="display:flex;align-items:center;gap:8px;">
          <span class="dot" style="background:${cores[chave] || "#94a3b8"}"></span>${labels ? (labels[chave] || chave) : chave}
        </span>
        <strong>${qtd} <span style="font-weight:400;color:var(--text-muted);">(${Math.round((qtd / total) * 100)}%)</span></strong>
      </div>
    `).join("");
}

function renderCategoria() {
  const itens = getItensAnoPca();
  const contagem = {};
  itens.forEach(i => { contagem[i.categoria] = (contagem[i.categoria] || 0) + 1; });
  renderLegendaClicavel("categoriaGrid", contagem, CATEGORIA_CORES, CATEGORIA_LABELS, "categoria");
}

function renderPrioridade() {
  const itens = getItensAnoPca();
  const contagem = {};
  itens.forEach(i => { const p = i.prioridade || "(não informado)"; contagem[p] = (contagem[p] || 0) + 1; });
  renderLegendaClicavel("prioridadeGrid", contagem, PRIORIDADE_CORES, null, "prioridade");
}

function renderSituacaoExecucao() {
  const itens = getItensAnoPca();
  const contagem = {};
  itens.forEach(i => { const s = chaveSituacao(i.situacao); contagem[s] = (contagem[s] || 0) + 1; });
  renderLegendaClicavel("situacaoGrid", contagem, SITUACAO_CORES, SITUACAO_LABELS, "situacao");
}

function renderRankingArea() {
  const itens = getItensAnoPca();

  const contagemQtd = {};
  itens.forEach(i => { const a = i.areaRequisitante || "(não informado)"; contagemQtd[a] = (contagemQtd[a] || 0) + 1; });
  const porQtd = Object.entries(contagemQtd).sort((a, b) => b[1] - a[1]).slice(0, 8);

  const somaValor = {};
  itens.forEach(i => { const a = i.areaRequisitante || "(não informado)"; somaValor[a] = (somaValor[a] || 0) + parseValorBR(i.valorTotal); });
  const porValor = Object.entries(somaValor).sort((a, b) => b[1] - a[1]).slice(0, 8);

  const maxQtd = porQtd.length ? porQtd[0][1] : 1;
  document.getElementById("rankingAreaQtd").innerHTML = porQtd.map(([nome, qtd], idx) => `
    <div class="ranking-item-wrap clicavel" data-campo="areaRequisitante" data-valor="${nome}">
      <div class="ranking-nome-linha"><span class="nome">${idx + 1}. ${nome}</span></div>
      <div style="display:grid;grid-template-columns:1fr auto;align-items:center;gap:10px;">
        <div class="barra-track"><div class="barra-fill" style="width:${(qtd / maxQtd) * 100}%"></div></div>
        <div class="qtd">${qtd}</div>
      </div>
    </div>
  `).join("");

  const maxValor = porValor.length ? porValor[0][1] : 1;
  document.getElementById("rankingAreaValor").innerHTML = porValor.map(([nome, valor], idx) => `
    <div class="ranking-item-wrap clicavel" data-campo="areaRequisitante" data-valor="${nome}">
      <div class="ranking-nome-linha"><span class="nome">${idx + 1}. ${nome}</span></div>
      <div style="display:grid;grid-template-columns:1fr auto;align-items:center;gap:10px;">
        <div class="barra-track"><div class="barra-fill" style="width:${(valor / maxValor) * 100}%;background:var(--pca2-500);"></div></div>
        <div class="qtd">${formatarMoeda(valor)}</div>
      </div>
    </div>
  `).join("");
}

const MESES_ABREV = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];

function renderCalendarioInicio() {
  const itens = getItensAnoPca();
  const contagem = {};
  itens.forEach(i => {
    if (!i.dataInicio) return;
    const partes = i.dataInicio.split("/");
    if (partes.length !== 3) return;
    const mes = parseInt(partes[1], 10);
    const ano = partes[2];
    const chave = `${ano}-${String(mes).padStart(2, "0")}`;
    contagem[chave] = (contagem[chave] || 0) + 1;
  });

  const chavesOrdenadas = Object.keys(contagem).sort();
  const max = Math.max(...Object.values(contagem), 1);

  document.getElementById("calendarioInicio").innerHTML = chavesOrdenadas.map(chave => {
    const [ano, mes] = chave.split("-");
    const label = `${MESES_ABREV[parseInt(mes, 10) - 1]}/${ano.slice(2)}`;
    const qtd = contagem[chave];
    return `
      <div class="barra-simples-row">
        <div class="mes-label">${label}</div>
        <div class="barra-track"><div class="barra-fill" style="width:${(qtd / max) * 100}%"></div></div>
        <div class="qtd">${qtd}</div>
      </div>
    `;
  }).join("");
}

function renderTop10Itens() {
  const itens = [...getItensAnoPca()]
    .sort((a, b) => parseValorBR(b.valorTotal) - parseValorBR(a.valorTotal))
    .slice(0, 10);

  document.getElementById("top10Body").innerHTML = itens.map(i => `
    <tr class="clicavel" data-campo="busca" data-valor="${i.titulo.replace(/"/g, "&quot;")}">
      <td>${i.titulo}</td>
      <td>${i.areaRequisitante}</td>
      <td>${i.prioridade}</td>
      <td style="font-weight:700;">${formatarMoeda(parseValorBR(i.valorTotal))}</td>
    </tr>
  `).join("");
}

/* ---------- Tabela completa "Todos os Itens do PCA" ---------- */

function popularFiltrosTabelaPca() {
  const itens = DASHBOARD_DATA.pcaAnalitico.itens;

  const categorias = [...new Set(itens.map(i => i.categoria))];
  document.getElementById("filtroCategoriaPca").innerHTML =
    `<option value="todos">Todas as categorias</option>` +
    categorias.map(c => `<option value="${c}">${CATEGORIA_LABELS[c] || c}</option>`).join("");

  const prioridades = [...new Set(itens.map(i => i.prioridade).filter(Boolean))];
  document.getElementById("filtroPrioridadePca").innerHTML =
    `<option value="todos">Todas as prioridades</option>` +
    prioridades.map(p => `<option value="${p}">${p}</option>`).join("");

  const situacoes = [...new Set(itens.map(i => chaveSituacao(i.situacao)))];
  document.getElementById("filtroSituacaoPca").innerHTML =
    `<option value="todos">Todas as situações</option>` +
    situacoes.map(s => `<option value="${s}">${SITUACAO_LABELS[s] || s}</option>`).join("");
}

/** Sincroniza os <select> visuais com o estado atual (usado após clique em legenda/ranking/KPI). */
function sincronizarFiltrosTabelaPca() {
  document.getElementById("filtroCategoriaPca").value = filtroPca.categoria;
  document.getElementById("filtroPrioridadePca").value = filtroPca.prioridade;
  document.getElementById("filtroSituacaoPca").value = filtroPca.situacao;
  document.getElementById("filtroBuscaPca").value = filtroPca.busca;
}

function renderTabelaPca() {
  const itens = getItensFiltradosPca();
  document.getElementById("pca2TabelaCount").textContent = `${itens.length} de ${DASHBOARD_DATA.pcaAnalitico.itens.length} itens`;

  document.getElementById("pca2TabelaBody").innerHTML = itens.map(i => `
    <tr>
      <td>${i.ano}</td>
      <td>${i.titulo}</td>
      <td>${i.areaRequisitante}</td>
      <td>${CATEGORIA_LABELS[i.categoria] || i.categoria}</td>
      <td>${i.prioridade}</td>
      <td>${SITUACAO_LABELS[chaveSituacao(i.situacao)]}</td>
      <td>${i.dataInicio || "-"}</td>
      <td style="font-weight:700;">${formatarMoeda(parseValorBR(i.valorTotal))}</td>
    </tr>
  `).join("");
}

function setupFiltrosTabelaPca() {
  document.getElementById("filtroCategoriaPca").addEventListener("change", e => { filtroPca.categoria = e.target.value; renderTabelaPca(); });
  document.getElementById("filtroPrioridadePca").addEventListener("change", e => { filtroPca.prioridade = e.target.value; renderTabelaPca(); });
  document.getElementById("filtroSituacaoPca").addEventListener("change", e => { filtroPca.situacao = e.target.value; renderTabelaPca(); });
  document.getElementById("filtroBuscaPca").addEventListener("input", e => { filtroPca.busca = e.target.value; renderTabelaPca(); });
  document.getElementById("limparFiltrosPca").addEventListener("click", () => {
    filtroPca.categoria = "todos"; filtroPca.prioridade = "todos"; filtroPca.situacao = "todos"; filtroPca.busca = "";
    sincronizarFiltrosTabelaPca();
    renderTabelaPca();
  });
  document.getElementById("filtroAnoPca2").addEventListener("change", e => {
    filtroPca.ano = e.target.value;
    renderAnaliticoPca2();
  });
}

/** Clique em qualquer número/legenda/ranking do PCA: aplica o filtro e mostra a tabela. */
function setupCliquesFiltroPca() {
  document.getElementById("page-pca2").addEventListener("click", e => {
    const alvo = e.target.closest("[data-campo]");
    if (!alvo) return;
    filtroPca[alvo.dataset.campo] = alvo.dataset.valor;
    if (alvo.dataset.campo !== "busca") {
      // ao filtrar por categoria/prioridade/situação/área, limpa a busca livre
      filtroPca.busca = "";
    }
    sincronizarFiltrosTabelaPca();
    renderTabelaPca();
    document.getElementById("pca2-todositens").scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function renderAnaliticoPca2() {
  popularFiltrosTabelaPca();
  renderPca2KPIs();
  renderCategoria();
  renderPrioridade();
  renderSituacaoExecucao();
  renderRankingArea();
  renderCalendarioInicio();
  renderTop10Itens();
  renderTabelaPca();
}


let filtroAtivo = "todos";

function renderContratos() {
  const el = document.getElementById("contratosBody");
  const lista = DASHBOARD_DATA.contratos.filter(c => filtroAtivo === "todos" || c.risco === filtroAtivo);

  const riscoLabel = { critico: "Crítico", atencao: "Atenção", planejamento: "Planejamento" };
  const riscoPill = { critico: "critico", atencao: "atencao", planejamento: "adequado" };

  el.innerHTML = lista.map(c => `
    <tr class="risk-row-${c.risco}">
      <td>${c.servico}</td>
      <td class="nup">${c.nup}</td>
      <td class="venc">${c.vencimento}</td>
      <td><span class="pill ${riscoPill[c.risco]}">${riscoLabel[c.risco]}</span></td>
      <td class="prov">${c.providencia}</td>
    </tr>
  `).join("");

  document.getElementById("contratosCount").textContent = `${lista.length} de ${DASHBOARD_DATA.contratos.length} contratos`;
}

function setupFilters() {
  document.querySelectorAll(".filters button").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filters button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      filtroAtivo = btn.dataset.filtro;
      renderContratos();
    });
  });
}

/* ---------- Init ---------- */
function renderAll() {
  renderMeta();
  renderKPIs();
  renderPCA();
  renderIndicadores();
  renderContratos();

  popularFiltrosProcessos();
  atualizarAcompanhamentoProcessos();
  renderAtas();
  renderPipeline();
  popularFiltroAnoPca();
  renderAnaliticoPca2();
}

document.addEventListener("DOMContentLoaded", async () => {
  // 1) Mostra imediatamente com os dados locais (data.js), para a tela
  //    nunca ficar em branco enquanto busca a planilha.
  setupFilters();
  setupFiltrosProcessos();
  setupPipelineTabs();
  setupNavegacao();
  setupFiltrosTabelaPca();
  setupCliquesFiltroPca();
  setupAtasEventos();
  renderAll();

  // 2) Tenta atualizar com os dados do Google Sheets, se configurado.
  const atualizou = await tryLoadFromSheets();
  if (atualizou) {
    renderAll();
  }
});
