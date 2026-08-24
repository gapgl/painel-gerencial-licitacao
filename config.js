/* ============================================================
   CONFIGURAÇÃO - LINKS DAS PLANILHAS DO GOOGLE SHEETS
   ============================================================
   Depois de publicar cada aba da sua planilha (veja o passo a
   passo que o Claude te enviou), cole aqui o link de cada uma.

   Cada link deve terminar em "output=csv".

   Enquanto os 4 campos abaixo estiverem vazios (""), o painel
   continua usando os dados fixos do arquivo data.js — ou seja,
   nada quebra até você configurar isso.
   ============================================================ */

const SHEET_URLS = {
  // --- Bloco 1: PCA (Plano de Contratações Anual) ---
  resumo: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRzFqJ721YD8hG32ZlyES8A4Na5bZ3YLmYmMRr5PiCXeMTc5VCKykJh9tCYuMbQ-bwlFkdSlVemaHKy/pub?gid=505338237&single=true&output=csv",
  pca: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRzFqJ721YD8hG32ZlyES8A4Na5bZ3YLmYmMRr5PiCXeMTc5VCKykJh9tCYuMbQ-bwlFkdSlVemaHKy/pub?gid=234112692&single=true&output=csv",
  indicadores: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRzFqJ721YD8hG32ZlyES8A4Na5bZ3YLmYmMRr5PiCXeMTc5VCKykJh9tCYuMbQ-bwlFkdSlVemaHKy/pub?gid=1607426912&single=true&output=csv",

  // --- Bloco 3: Contratos Administrativos Vigentes ---
  contratos: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRzFqJ721YD8hG32ZlyES8A4Na5bZ3YLmYmMRr5PiCXeMTc5VCKykJh9tCYuMbQ-bwlFkdSlVemaHKy/pub?gid=18204474&single=true&output=csv",

  // --- Bloco 2: Acompanhamento da Seção de Licitações (Controle de Processos) ---
  // Estes 5 links vêm de uma cópia do arquivo "1 - CONTROLE PROCESSOS" do
  // Cap Saulo (pasta de rede), importado SEM alterações para o Google Sheets
  // (mesmas colunas, mesmos nomes). Publique as abas: PROCESSOS, ATAS VIGENTES,
  // 30 (Materiais de Consumo), 39 (Serviços) e 52 (Materiais Permanentes).
  processos: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ21GEEIEkCMGcqzO5UXHKmibyCAi058HICUfo71cYgaVNKkYxts8_jUlZ7d9V0tud3_Y8fv-SCSZpQ/pub?gid=1792534194&single=true&output=csv",
  atas: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ21GEEIEkCMGcqzO5UXHKmibyCAi058HICUfo71cYgaVNKkYxts8_jUlZ7d9V0tud3_Y8fv-SCSZpQ/pub?gid=230824727&single=true&output=csv",
  pipelineConsumo: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ21GEEIEkCMGcqzO5UXHKmibyCAi058HICUfo71cYgaVNKkYxts8_jUlZ7d9V0tud3_Y8fv-SCSZpQ/pub?gid=1938823239&single=true&output=csv",
  pipelineServicos: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ21GEEIEkCMGcqzO5UXHKmibyCAi058HICUfo71cYgaVNKkYxts8_jUlZ7d9V0tud3_Y8fv-SCSZpQ/pub?gid=598227188&single=true&output=csv",
  pipelinePermanentes: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ21GEEIEkCMGcqzO5UXHKmibyCAi058HICUfo71cYgaVNKkYxts8_jUlZ7d9V0tud3_Y8fv-SCSZpQ/pub?gid=1922832749&single=true&output=csv"
};
