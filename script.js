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
  { chave: "fase_interna", rotulo: "Fase Interna",         cor: "#6d28d9",   match: s => s.includes("FASE INTERNA") },
  { chave: "publicado",    rotulo: "Publicado",            cor: "#14b8a6",   match: s => s.includes("PUBLICADO") },
  { chave: "sem_sucesso",  rotulo: "Sem Sucesso / Suspenso", cor: "#e34848", match: () => true } // fallback
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
  const contagemStatus = { homologado: 0, andamento: 0, adequacao: 0, fase_interna: 0, publicado: 0, sem_sucesso: 0 };
  processos.forEach(p => { contagemStatus[classificarStatus(p.status).chave]++; });

  const emTramitacao = contagemStatus.andamento + contagemStatus.adequacao + contagemStatus.fase_interna + contagemStatus.publicado;
  const pctHomologado = total ? Math.round((contagemStatus.homologado / total) * 100) : 0;

  const atasVencendoLogo = atas.filter(a => classificarRiscoData(a.vigencia) === "critico").length;

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

/** Classifica o risco de vencimento a partir de uma data "dd/mm/aaaa". */
function classificarRiscoData(dataBr) {
  if (!dataBr) return "planejamento";
  const [d, m, a] = dataBr.split("/").map(Number);
  if (!d || !m || !a) return "planejamento";
  const alvo = new Date(a, m - 1, d);
  const hoje = new Date();
  const diffDias = Math.round((alvo - hoje) / 86400000);
  if (diffDias <= 90) return "critico";
  if (diffDias <= 180) return "atencao";
  return "planejamento";
}

function renderAtas() {
  const atas = DASHBOARD_DATA.controleProcessos.atas;
  const riscoLabel = { critico: "Vence em breve", atencao: "Atenção", planejamento: "Regular" };
  const riscoPill = { critico: "critico", atencao: "atencao", planejamento: "adequado" };

  const comRisco = atas.map(a => ({ ...a, risco: classificarRiscoData(a.vigencia) }));
  comRisco.sort((a, b) => {
    const [da, ma, aa] = (a.vigencia || "31/12/2099").split("/").map(Number);
    const [db, mb, ab] = (b.vigencia || "31/12/2099").split("/").map(Number);
    return new Date(aa, ma - 1, da) - new Date(ab, mb - 1, db);
  });

  document.getElementById("atasCount").textContent = `${atas.length} atas vigentes`;
  document.getElementById("atasBody").innerHTML = comRisco.map(a => `
    <tr class="risk-row-${a.risco}">
      <td class="nup">${a.pregao}</td>
      <td>${a.objeto}</td>
      <td class="venc">${a.vigencia || "-"}</td>
      <td><span class="pill ${riscoPill[a.risco]}">${riscoLabel[a.risco]}</span></td>
    </tr>
  `).join("");
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
function extrairAno(licitacao) {
  const lic = (licitacao || "").trim();
  if (!lic || lic === "-") return null;
  const m4 = lic.match(/(20\d{2})/);
  if (m4) return m4[1];
  const m2 = lic.match(/\/(\d{2})$/);
  if (m2) return "20" + m2[1];
  return null;
}

let filtroEstado = { ano: "2026", status: "todos", busca: "" };

function popularFiltrosProcessos() {
  const processos = DASHBOARD_DATA.controleProcessos.processos;

  const anos = new Set();
  let temSemNumero = false;
  processos.forEach(p => {
    const a = extrairAno(p.licitacao);
    if (a) anos.add(a); else temSemNumero = true;
  });
  const anosOrdenados = [...anos].sort((a, b) => b - a);

  const selAno = document.getElementById("filtroAno");
  selAno.innerHTML =
    `<option value="todos">Todos os anos</option>` +
    anosOrdenados.map(a => `<option value="${a}">${a}</option>`).join("") +
    (temSemNumero ? `<option value="sem_numero">Sem número</option>` : "");
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
    const ano = extrairAno(p.licitacao);
    const anoOk = filtroEstado.ano === "todos" ? true :
      filtroEstado.ano === "sem_numero" ? ano === null : ano === filtroEstado.ano;

    const statusOk = filtroEstado.status === "todos" ? true :
      classificarStatus(p.status).chave === filtroEstado.status;

    const buscaOk = !busca || `${p.objeto} ${p.responsavel} ${p.om}`.toLowerCase().includes(busca);

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

function renderPca2KPIs() {
  const itens = DASHBOARD_DATA.pcaAnalitico.itens;
  const valorTotal = itens.reduce((soma, i) => soma + parseValorBR(i.valorTotal), 0);
  const contratacoesDistintas = new Set(itens.map(i => i.numero)).size;
  const prioridadeAlta = itens.filter(i => i.prioridade.trim().toLowerCase() === "alto").length;
  const naoIniciados = itens.filter(i => !i.situacao || i.situacao.trim() === "").length;

  document.getElementById("kpiGridPca2").innerHTML = `
    <div class="kpi tema-pca2">
      <div class="label">Valor Estimado (PCA)</div>
      <div class="value">${formatarMoeda(valorTotal)}</div>
      <div class="sub">${itens.length} itens &middot; ${contratacoesDistintas} contratações</div>
    </div>
    <div class="kpi tema-pca2">
      <div class="label">Prioridade Alta</div>
      <div class="value">${prioridadeAlta}</div>
      <div class="sub">itens que merecem atenção próxima</div>
    </div>
    <div class="kpi status-critico">
      <div class="label">Ainda Não Iniciados</div>
      <div class="value">${naoIniciados}</div>
      <div class="sub">${Math.round((naoIniciados / itens.length) * 100)}% do total do PCA</div>
    </div>
    <div class="kpi tema-pca2">
      <div class="label">Total de Itens</div>
      <div class="value">${itens.length}</div>
      <div class="sub">linhas de demanda registradas</div>
    </div>
  `;
}

function renderLegendaGenerica(elId, contagem, cores) {
  const total = Object.values(contagem).reduce((a, b) => a + b, 0) || 1;
  document.getElementById(elId).innerHTML = Object.entries(contagem)
    .sort((a, b) => b[1] - a[1])
    .map(([rotulo, qtd]) => `
      <div class="item">
        <span style="display:flex;align-items:center;gap:8px;">
          <span class="dot" style="background:${cores[rotulo] || "#94a3b8"}"></span>${rotulo}
        </span>
        <strong>${qtd} <span style="font-weight:400;color:var(--text-muted);">(${Math.round((qtd / total) * 100)}%)</span></strong>
      </div>
    `).join("");
}

function renderCategoria() {
  const itens = DASHBOARD_DATA.pcaAnalitico.itens;
  const contagem = {};
  itens.forEach(i => {
    const cat = i.categoria === "CONTRATACOES_TIC" ? "TIC" : (i.categoria === "SERVICOS" ? "Serviços" : "Bens");
    contagem[cat] = (contagem[cat] || 0) + 1;
  });
  renderLegendaGenerica("categoriaGrid", contagem, { "Bens": "#3b82f6", "Serviços": "#14b8a6", "TIC": "#b45309" });
}

function renderPrioridade() {
  const itens = DASHBOARD_DATA.pcaAnalitico.itens;
  const contagem = {};
  itens.forEach(i => {
    const p = i.prioridade || "(não informado)";
    contagem[p] = (contagem[p] || 0) + 1;
  });
  renderLegendaGenerica("prioridadeGrid", contagem, { "Alto": "#e34848", "Médio": "#f5a623", "Baixo": "#22c55e" });
}

function renderSituacaoExecucao() {
  const itens = DASHBOARD_DATA.pcaAnalitico.itens;
  const contagem = {};
  itens.forEach(i => {
    const s = i.situacao && i.situacao.trim() !== "" ? i.situacao.trim() : "Não Iniciado";
    contagem[s] = (contagem[s] || 0) + 1;
  });
  renderLegendaGenerica("situacaoGrid", contagem, {
    "Não Iniciado": "#94a3b8", "Preparação": "#3b82f6", "Edição": "#b45309",
    "Divulgada": "#14b8a6", "Fase Externa": "#22c55e", "Suspensa": "#e34848"
  });
}

function renderRankingArea() {
  const itens = DASHBOARD_DATA.pcaAnalitico.itens;

  const porQtd = contarPor(itens, "areaRequisitante", 8);

  const somaValor = {};
  itens.forEach(i => {
    const area = i.areaRequisitante || "(não informado)";
    somaValor[area] = (somaValor[area] || 0) + parseValorBR(i.valorTotal);
  });
  const porValor = Object.entries(somaValor).sort((a, b) => b[1] - a[1]).slice(0, 8);

  renderRankingLista("rankingAreaQtd", porQtd);

  const maxValor = porValor.length ? porValor[0][1] : 1;
  document.getElementById("rankingAreaValor").innerHTML = porValor.map(([nome, valor], idx) => `
    <div class="ranking-item-wrap">
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
  const itens = DASHBOARD_DATA.pcaAnalitico.itens;
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
  const itens = [...DASHBOARD_DATA.pcaAnalitico.itens]
    .sort((a, b) => parseValorBR(b.valorTotal) - parseValorBR(a.valorTotal))
    .slice(0, 10);

  document.getElementById("top10Body").innerHTML = itens.map(i => `
    <tr>
      <td>${i.titulo}</td>
      <td>${i.areaRequisitante}</td>
      <td>${i.prioridade}</td>
      <td style="font-weight:700;">${formatarMoeda(parseValorBR(i.valorTotal))}</td>
    </tr>
  `).join("");
}

function renderAnaliticoPca2() {
  renderPca2KPIs();
  renderCategoria();
  renderPrioridade();
  renderSituacaoExecucao();
  renderRankingArea();
  renderCalendarioInicio();
  renderTop10Itens();
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
  renderAnaliticoPca2();
}

document.addEventListener("DOMContentLoaded", async () => {
  // 1) Mostra imediatamente com os dados locais (data.js), para a tela
  //    nunca ficar em branco enquanto busca a planilha.
  setupFilters();
  setupFiltrosProcessos();
  setupPipelineTabs();
  setupNavegacao();
  renderAll();

  // 2) Tenta atualizar com os dados do Google Sheets, se configurado.
  const atualizou = await tryLoadFromSheets();
  if (atualizou) {
    renderAll();
  }
});
