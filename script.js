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
      <div class="label">Contratos em Risco</div>
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

/* ---------- PAC (barras) ---------- */
function renderPAC() {
  const el = document.getElementById("pacRows");
  const maxVal = Math.max(...DASHBOARD_DATA.pac.map(p => p.planejado), 1);

  el.innerHTML = DASHBOARD_DATA.pac.map(p => {
    const wPlan = (p.planejado / maxVal) * 100;
    const wReal = (p.realizado / maxVal) * 100;
    return `
      <div class="pac-row">
        <div>${p.etapa}</div>
        <div class="pac-track">
          <div class="pac-planejado" style="width:${wPlan}%"></div>
          <div class="pac-realizado" style="width:${wReal}%"></div>
        </div>
        <div class="pac-nums"><strong>${p.realizado}</strong> / ${p.planejado}</div>
      </div>
    `;
  }).join("");

  // Donut: total realizado das etapas "Concluídas" sobre planejado
  const conc = DASHBOARD_DATA.pac.find(p => p.etapa.includes("Concluídas"));
  const pct = Math.round((conc.realizado / conc.planejado) * 100);
  drawDonut("pacDonut", pct);
  document.getElementById("donutBig").textContent = `${pct}%`;
}

function drawDonut(canvasId, pct) {
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
  ctx.strokeStyle = "#1d4593";
  ctx.lineWidth = 18;
  ctx.lineCap = "round";
  ctx.stroke();
}

/* ---------- Indicadores ---------- */
function renderIndicadores() {
  const el = document.getElementById("indGrid");
  el.innerHTML = DASHBOARD_DATA.indicadores.map(i => `
    <div class="ind-card ${i.status}">
      <h3>${i.nome}</h3>
      <div class="ind-nums">
        <div>Meta<strong>${i.meta}</strong></div>
        <div>Realizado<strong>${i.realizado}</strong></div>
      </div>
      <div class="ind-bar-track">
        <div class="ind-bar-fill" style="width:${Math.min(i.percentual, 100)}%"></div>
      </div>
      <span class="pill ${i.status}">${i.percentual}% &middot; ${statusLabel[i.status]}</span>
    </div>
  `).join("");
}

/* ---------- Tabela de contratos ---------- */
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
  renderPAC();
  renderIndicadores();
  renderContratos();
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
