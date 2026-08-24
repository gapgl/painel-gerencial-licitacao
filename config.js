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
  // Estes 3 links vêm de uma cópia do arquivo "1 - CONTROLE PROCESSOS" do
  // Cap Saulo (pasta de rede), importada para o Google Sheets. Preencha
  // depois de publicar cada aba correspondente.
  processos: "",
  atas: "",
  pipeline: ""
};
