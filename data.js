/* ============================================================
   DADOS DO PAINEL - LICITAÇÕES E CONTRATOS - GAP-GL
   ============================================================
   Este arquivo concentra TODOS os números do painel.
   Por enquanto os dados estão fixos aqui (baseados na Reunião
   de Avaliação da Gestão - Jan/Jun 2026).

   Na próxima etapa, vamos trocar isso para ler direto de uma
   planilha do Google Sheets publicada como CSV. Quando isso
   acontecer, só a forma de carregar muda — a estrutura abaixo
   (os nomes dos campos) continua a mesma, para não quebrar o
   resto do site.
   ============================================================ */

let DASHBOARD_DATA = {

  fonte: "Reunião de Avaliação da Gestão - GAP-GL",
  periodo: "Jan - Jun 2026",
  atualizadoEm: "24/07/2026",

  // ---- Cartões de resumo (topo do painel) ----
  resumo: {
    execucaoPCA: { valor: 16.6, meta: 100, unidade: "%" },
    contratacoesConcluidas: { realizado: 13, planejado: 53 },
    contratosVigenciaCritica: { total: 4, descricao: "vigência < 3 meses" },
    indicadoresCriticos: { total: 3, totalIndicadores: 9 }
  },

  // ---- Plano de Contratações Anual (PCA) ----
  pca: [
    { etapa: "Concluídas (Homologadas)",     planejado: 53, realizado: 13 },
    { etapa: "Em andamento (Fase interna)",  planejado: 78, realizado: 23 },
    { etapa: "Editais Publicados (Fase Ext.)", planejado: 78, realizado: 17 },
    { etapa: "Atas SRP Assinadas",           planejado: 16, realizado: 6 },
    { etapa: "Suspensas / Revogadas",        planejado: 0,  realizado: 0 }
  ],

  // ---- Indicadores de desempenho - área "Licitações e Contratos" ----
  // status: "adequado" | "atencao" | "critico"
  // meta/realizado agora são NÚMEROS PUROS (sem "dias"/"horas"/"%"),
  // para permitir fórmulas na planilha. A unidade de medida vai entre
  // parênteses no FINAL do campo "nome" (ex: "(dias)", "(horas)", "(%)")
  // e o site extrai isso sozinho na hora de mostrar na tela.
  indicadores: [
    {
      nome: "Indicador de Execução do PCA (%)",
      meta: 100, realizado: 16.6, percentual: 17, status: "critico"
    },
    {
      nome: "Tempo Médio de Planejamento (Baixa Complexidade) (dias)",
      meta: 70, realizado: 90, percentual: 78, status: "atencao"
    },
    {
      nome: "Tempo Médio de Planejamento (Média Complexidade) (dias)",
      meta: 97, realizado: 68, percentual: 100, status: "adequado"
    },
    {
      nome: "Tempo Médio de Planejamento (Alta Complexidade) (dias)",
      meta: 130, realizado: 118, percentual: 100, status: "adequado"
    },
    {
      nome: "Tempo Médio de Recebimento de Bens e Serviços (dias)",
      meta: 5, realizado: 12, percentual: 42, status: "critico"
    },
    {
      nome: "Tempo Médio de Liquidação de NF/Fatura (horas)",
      meta: 72, realizado: 24, percentual: 100, status: "adequado"
    },
    {
      nome: "Tempo Médio para Emissão de Empenho (horas)",
      meta: 72, realizado: 96, percentual: 75, status: "atencao"
    },
    {
      nome: "Tempo Médio para Assinatura de Contrato (dias)",
      meta: 15, realizado: 48, percentual: 31, status: "critico"
    },
    {
      nome: "Tempo Médio de Publicação do Contrato (dias)",
      meta: 10, realizado: 12, percentual: 83, status: "atencao"
    }
  ],

  // ---- Gerenciamento das Contratações (vigências) ----
  // risco: "planejamento" | "atencao" | "critico"
  contratos: [
    { servico: "Aquisição de Gêneros Alimentícios - Hortifrutigranjeiros", nup: "67107.009369/2025-27", vencimento: "25/05/2027", risco: "planejamento", providencia: "Vigência da ata regular." },
    { servico: "Aquisição de Gêneros Alimentícios - Industrializados I", nup: "67107.009367/2025-38", vencimento: "25/06/2027", risco: "planejamento", providencia: "Vigência da ata regular." },
    { servico: "Aquisição de Gêneros Alimentícios - Industrializados II", nup: "67107.009371/2025-04", vencimento: "30/06/2027", risco: "planejamento", providencia: "Vigência da ata regular." },
    { servico: "Aquisição de Gêneros Alimentícios - Proteínas", nup: "67107.009364/2025-02", vencimento: "15/06/2027", risco: "planejamento", providencia: "Vigência da ata regular." },
    { servico: "Aquisição de Gêneros Alimentícios - Padaria", nup: "67107.009366/2025-93", vencimento: "25/05/2027", risco: "planejamento", providencia: "Vigência da ata regular." },
    { servico: "Aquisição de Material de Limpeza", nup: "67107.007270/2025-91", vencimento: "20/07/2027", risco: "planejamento", providencia: "Vigência da ata regular." },
    { servico: "Aquisição de Material de Infraestrutura", nup: "67107.003097/2026-32", vencimento: "-", risco: "critico", providencia: "Processo novo, já aprovado pela CJU. Em adequações finais para publicação." },
    { servico: "Serviço de Conservação e Limpeza", nup: "67107.007722/2024-53", vencimento: "30/10/2026", risco: "atencao", providencia: "Termo Aditivo em confecção. Prorrogável por até 10 anos." },
    { servico: "Serviço de Lavanderia para o HT", nup: "67107.000163/2025-31", vencimento: "25/03/2027", risco: "planejamento", providencia: "Vigência do contrato regular. Prorrogável por até 10 anos." },
    { servico: "Serviço de Outsourcing de Impressão", nup: "67107.006207/2025-37", vencimento: "25/08/2027", risco: "planejamento", providencia: "Vigência do contrato regular. Prorrogável por até 10 anos." },
    { servico: "Serviço de Manutenção de Bens Imóveis", nup: "67107.006005/2025-95", vencimento: "16/03/2027", risco: "planejamento", providencia: "Vigência do contrato regular. Prorrogável por até 10 anos." },
    { servico: "Mercado Livre de Energia", nup: "67107.003893/2024-11", vencimento: "01/06/2027", risco: "planejamento", providencia: "Vigência do contrato regular. Prorrogável por até 10 anos." },
    { servico: "Serviço de Controle de Pragas e Limpeza de Caixa D'Água", nup: "67107.004943/2024-70", vencimento: "23/09/2026", risco: "critico", providencia: "Termo Aditivo em confecção. Prorrogável por até 10 anos." },
    { servico: "Serviço de Manutenção de Condicionador de Ar", nup: "67107.007198/2023-30", vencimento: "18/09/2026", risco: "critico", providencia: "Termo Aditivo em confecção. Prorrogável até 2028." },
    { servico: "Serviço de Manutenção de Viaturas", nup: "67107.004865/2025-94", vencimento: "06/01/2027", risco: "atencao", providencia: "Vigência do contrato regular. Prorrogável por até 10 anos." },
    { servico: "Serviço de Outsourcing de Fornecimento de Peças Automotivas (Oficina Virtual)", nup: "67107.000819/2025-16", vencimento: "28/11/2028", risco: "planejamento", providencia: "Vigência do contrato regular. Prorrogável por até 10 anos." },
    { servico: "Serviço de Telefonia Fixa", nup: "67107.000534/2026-66", vencimento: "05/02/2027", risco: "planejamento", providencia: "Vigência do contrato regular. Prorrogável por até 10 anos." },
    { servico: "Serviço de Telefonia Móvel", nup: "67107.006524/2025-53", vencimento: "06/09/2026", risco: "critico", providencia: "Termo Aditivo em confecção. Prorrogável por até 10 anos." },
    { servico: "Serviço de Recolhimento de Resíduos", nup: "67107.007978/2025-41", vencimento: "17/11/2026", risco: "atencao", providencia: "Vigência do contrato regular. Prorrogável por até 10 anos." },
    { servico: "Serviço de Manutenção de Equipamentos de Rancho", nup: "67107.006297/2024-85", vencimento: "07/05/2027", risco: "planejamento", providencia: "Monitoramento padrão de execução. Prorrogável por até 10 anos." },
    { servico: "Serviço de Outsourcing de Materiais de Almoxarifado (AVN)", nup: "67107.008495/2021-31", vencimento: "26/11/2026", risco: "atencao", providencia: "Prorrogação excepcional em razão da suspensão do processo licitatório do AVN 3.0." }
  ]
};
