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
  { chave: "homologado",   rotulo: "Homologado",          cor: "var(--ok-bar)",     match: s => s.includes("HOMOLOGADO") },
  { chave: "andamento",    rotulo: "Licitação em Andamento", cor: "#3b82f6",         match: s => s.includes("LICITAÇÃO EM ANDAMENTO") },
  { chave: "adequacao",    rotulo: "Adequação Pós CJU",    cor: "var(--warn-bar)",   match: s => s.includes("ADEQUAÇÃO") },
  { chave: "fase_interna", rotulo: "Fase Interna",         cor: "var(--secao-500)", match: s => s.includes("FASE INTERNA") },
  { chave: "publicado",    rotulo: "Publicado",            cor: "#14b8a6",           match: s => s.includes("PUBLICADO") },
  { chave: "sem_sucesso",  rotulo: "Sem Sucesso / Suspenso", cor: "var(--crit-bar)", match: () => true } // fallback
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

function renderSecaoKPIs() {
  const processos = DASHBOARD_DATA.controleProcessos.processos;
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

function renderPanorama() {
  const processos = DASHBOARD_DATA.controleProcessos.processos;
  document.getElementById("panoramaTotal").textContent = `${processos.length} processos mapeados`;

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

function renderRankings() {
  const processos = DASHBOARD_DATA.controleProcessos.processos;
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
  const categorias = ["Materiais de Consumo", "Contratação de Serviços", "Materiais Permanentes"];

  document.getElementById("pipelineGrid").innerHTML = categorias.map(cat => {
    const itens = pipeline.filter(p => p.categoria === cat);
    return `
      <div class="pipeline-col">
        <h3>${cat} (${itens.length})</h3>
        ${itens.map(p => `
          <div class="pipeline-card">
            <span class="tag-ata ${p.ataVigente ? "sim" : "nao"}">${p.ataVigente ? "Ata Vigente" : "Sem Ata"}</span>
            <div class="obj">${p.objeto}</div>
            ${p.vigencia ? `<div class="meta-row"><span>Vigência</span><span>${p.vigencia}</span></div>` : ""}
            ${p.licitacao ? `<div class="meta-row"><span>Licitação</span><span>${p.licitacao}</span></div>` : ""}
            <div class="meta-row"><span>Status</span><span>${p.status}</span></div>
            ${p.observacao ? `<div class="obs">${p.observacao}</div>` : ""}
          </div>
        `).join("")}
      </div>
    `;
  }).join("");
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

  renderSecaoKPIs();
  renderPanorama();
  renderRankings();
  renderAtas();
  renderPipeline();
}

document.addEventListener("DOMContentLoaded", async () => {
  // 1) Mostra imediatamente com os dados locais (data.js), para a tela
  //    nunca ficar em branco enquanto busca a planilha.
  setupFilters();
  renderAll();

  // 2) Tenta atualizar com os dados do Google Sheets, se configurado.
  const atualizou = await tryLoadFromSheets();
  if (atualizou) {
    renderAll();
  }
});
