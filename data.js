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
  ],

  /* ==========================================================
     BLOCO 2 — ACOMPANHAMENTO DA SEÇÃO DE LICITAÇÕES
     ==========================================================
     ATENÇÃO: este bloco é INDEPENDENTE do PCA (acima) e dos
     Contratos. NUNCA misture os números de um bloco com o outro
     em cálculos — são fontes e propósitos diferentes:
     - PCA: planejamento oficial registrado pelas Unidades Apoiadas
     - controleProcessos: controle interno da própria Seção de
       Licitações (Cap Saulo), com a execução real e o
       planejamento próprio da Seção.
     ========================================================== */
  controleProcessos: {
    processos: [
      { licitacao: "-", modalidade: "PE", status: "1 – FASE INTERNA", objeto: "AQUISIÇÃO DE EPI", om: "GAP-GL", responsavel: "", observacoes: "" },
      { licitacao: "-", modalidade: "PE", status: "1 – FASE INTERNA", objeto: "AQUISIÇÃO DE PERIFÉRICOS DE INFORMÁTICA", om: "GAP-GL", responsavel: "", observacoes: "" },
      { licitacao: "-", modalidade: "PE", status: "1 – FASE INTERNA", objeto: "AQUISIÇÃO DE UNIFORMES ", om: "GAP-GL", responsavel: "", observacoes: "" },
      { licitacao: "-", modalidade: "PE", status: "1 – FASE INTERNA", objeto: "AQUISIÇÃO DE ELETRODOMÉSTICOS", om: "GAP-GL", responsavel: "", observacoes: "" },
      { licitacao: "-", modalidade: "PE", status: "1 – FASE INTERNA", objeto: "REFORMA ELÉTRICA DO LABORATÓRIO QUÍMICO", om: "PAMB", responsavel: "", observacoes: "" },
      { licitacao: "-", modalidade: "PE", status: "1 – FASE INTERNA", objeto: "AQUISIÇÃO DE TV E SUPORTE", om: "1 GCC", responsavel: "", observacoes: "" },
      { licitacao: "", modalidade: "PE", status: "1 – FASE INTERNA", objeto: "AQUISIÇÃO DE MATERIAIS PERMANENTES PARA ATIVIDADES ADMINISTRATIVAS", om: "BAGL", responsavel: "", observacoes: "" },
      { licitacao: "", modalidade: "PE", status: "1 – FASE INTERNA", objeto: "AQUISIÇÃO DE MATERIAIS PERMANENTES PARA REFORMA DE INTERIORES E TAPEÇARIA", om: "PAMA-GL", responsavel: "", observacoes: "" },
      { licitacao: "-", modalidade: "PE", status: "3 - ADEQUAÇÃO PÓS CJU", objeto: "AQUISIÇÃO DE UTENSÍLIOS DE RANCHO", om: "GAP-GL", responsavel: "", observacoes: "PROCESSO APROVADO 13AGO26 - COM O GAP" },
      { licitacao: "-", modalidade: "PE", status: "3 - ADEQUAÇÃO PÓS CJU", objeto: "INSTALAÇÃO DE TRANSFORMADOR ABAIXADOR 13,8 KV/380V PARA CARREGADORES DE EMPILHADEIRAS", om: "PAMB", responsavel: "", observacoes: "PROCESSO REPROVADO - 16AGO26 - SIGAD 65578" },
      { licitacao: "-", modalidade: "PE", status: "3 - ADEQUAÇÃO PÓS CJU", objeto: "CONTRATAÇÃO DE SOFTWARE PARA CORREÇÃO DE PROVAS", om: "CBNB", responsavel: "", observacoes: "PROCESSO REPROVADO - 21JUL26 - SIGAD 65420" },
      { licitacao: "-", modalidade: "PE", status: "3 - ADEQUAÇÃO PÓS CJU", objeto: "CESSÃO DE USO CANTINA", om: "HFAG", responsavel: "", observacoes: "PROCESSO APROVADO - 17AGO26 - SIGAD 66474" },
      { licitacao: "-", modalidade: "PE", status: "3 - ADEQUAÇÃO PÓS CJU", objeto: "MANUTENÇÃO DOS TELHADOS DA SEDE E DO RANCHO", om: "GAP-GL", responsavel: "", observacoes: "PROCESSO APROVADO 07JUL26 - COM O GAP" },
      { licitacao: "", modalidade: "PE", status: "3 - ADEQUAÇÃO PÓS CJU", objeto: "AQUSIÇÃO DE MATERIAIS DE INFRAESTRUTURA", om: "GAP-GL", responsavel: "", observacoes: "PROCESSO APROVADO 07JUL26 - COM O GAP" },
      { licitacao: "-", modalidade: "DE", status: "3 - ADEQUAÇÃO PÓS CJU", objeto: "SERVIÇO DE LIMPEZA - EMERGENCIAL", om: "HFAG", responsavel: "CAP SAULO", observacoes: "PROCESSO APROVADO - SIGAD 61921 - 27MAI2026" },
      { licitacao: "-", modalidade: "PE", status: "3 - ADEQUAÇÃO PÓS CJU", objeto: "CONTRATAÇÃO DE CURSO DE SUBSISTÊNCIA", om: "GAP-GL", responsavel: "TEN ANDRÉ FELIPE", observacoes: "PROCESSO APROVADO 16MAR26" },
      { licitacao: "", modalidade: "PE", status: "3 - ADEQUAÇÃO PÓS CJU", objeto: "AQUISIÇÃO DE TRATORES PARA JARDINAGEM", om: "BAGL", responsavel: "", observacoes: "PROCESSO APROVADO COM O GAP" },
      { licitacao: "90216/2026", modalidade: "PE", status: "4 - PUBLICADO", objeto: "AQUISIÇÃO DE EQUIPAMENTOS PARA ACADEMIA ", om: "BAGL", responsavel: "TEN PERES", observacoes: "ABERTURA 03SET26" },
      { licitacao: "90089/2026", modalidade: "PE", status: "4 - PUBLICADO", objeto: "SERVIÇO DE COLETA E DESTINAÇÃO FINAL DE EFLUENTES LÍQUIDOS", om: "PAMA-GL", responsavel: "CAP SAULO", observacoes: "ABERTURA ABERTURA 03SET" },
      { licitacao: "90206/2026", modalidade: "PE", status: "4 - PUBLICADO", objeto: "SERVIÇO DE MANUTENÇÃO DE CÂMARA FRIGORÍFICA", om: "GAP-GL", responsavel: "TEN ANDRÉ FELIPE", observacoes: "ABERTURA 01SET26" },
      { licitacao: "90219/2026", modalidade: "PE", status: "4 - PUBLICADO", objeto: "SERVIÇO DE MANUTENÇÃO E INSTALAÇÃO DE SISTEMA DE ANTENA COLETIVA", om: "HFAG", responsavel: "TEN LARISSA", observacoes: "ABERTURA 08SET26" },
      { licitacao: "90089/2026", modalidade: "PE", status: "4 - PUBLICADO", objeto: "SERVIÇO DE RECOLHIMENTO DE EFLUENTES INDUSTRIALZIADOS", om: "PAMA-GL", responsavel: "CAP SAULO", observacoes: "ABERTURA 03SET26" },
      { licitacao: "90176/2026", modalidade: "PE", status: "5 - LICITAÇÃO EM ANDAMENTO", objeto: "REPUBLICAÇÃO - BENS PERMANENTES HT FORTALEZA", om: "GAP-GL", responsavel: "TEN WANDERMUREM", observacoes: "ABERTURA 20JUL26" },
      { licitacao: "90027/2026", modalidade: "PE", status: "6 – HOMOLOGADO", objeto: "AQUISIÇÃO DE MEDICAMENTOS CANINOS PARA O GSD", om: "BAGL", responsavel: "TEN LARISSA", observacoes: "ABERTURA 09JUL26" },
      { licitacao: "90026/2026", modalidade: "PE", status: "5 - LICITAÇÃO EM ANDAMENTO", objeto: "AQUISIÇÃO DE MATERIAIS DE LIMPEZA PARA SAG", om: "GAP-GL", responsavel: "MAJ FELIPE", observacoes: "ABERTURA 19JUN2026" },
      { licitacao: "90022/2026", modalidade: "PE", status: "5 - LICITAÇÃO EM ANDAMENTO", objeto: "SERVIÇO DE LAVANDERIA", om: "HFAG", responsavel: "CAP SAULO", observacoes: "ABERTURA 17JUN2026" },
      { licitacao: "90002/2026", modalidade: "CE", status: "5 - LICITAÇÃO EM ANDAMENTO", objeto: "SERVIÇO DE RESTAURAÇÃO DA CASA DE FORÇA", om: "PAMB", responsavel: "CAP SAULO", observacoes: "ABERTURA 28MAI2026 " },
      { licitacao: "90014/2026", modalidade: "PE", status: "5 - LICITAÇÃO EM ANDAMENTO", objeto: "AQUISIÇÃO DE GENEROS ALIMENTÍCEOS - LATICINEOS", om: "GAP-GL", responsavel: "TEN ANDRÉ FELIPE", observacoes: "ABERTURA 24ABR2026" },
      { licitacao: "90021/2026", modalidade: "PE", status: "5 - LICITAÇÃO EM ANDAMENTO", objeto: "SERVIÇO DE COLETA DE RESÍDUOS", om: "PAMA-GL", responsavel: "CAP SAULO", observacoes: "ABERTURA 05MAI2026" },
      { licitacao: "90008/2026", modalidade: "PE", status: "5 - LICITAÇÃO EM ANDAMENTO", objeto: "SERVIÇO DE CONFECÇÃO DE MÓVEIS PARA O HT FZ", om: "GAP-GL", responsavel: "CAP PIMENTA", observacoes: "ABERTURA 24MAR2026" },
      { licitacao: "90001/2025", modalidade: "CE", status: "5 - LICITAÇÃO EM ANDAMENTO", objeto: "CONSTRUÇÃO DE RAMPA", om: "CBNB", responsavel: "CAP SAULO", observacoes: "ABERTURA 27AGO2025" },
      { licitacao: "90001/2026", modalidade: "CE", status: "5 - LICITAÇÃO EM ANDAMENTO", objeto: "CONSTRUÇÃO DE MURO LIMÍTROFE", om: "PAGL", responsavel: "CAP SAULO", observacoes: "ABERTURA 27JAN2026" },
      { licitacao: "90023/2026", modalidade: "PE", status: "5 - LICITAÇÃO EM ANDAMENTO", objeto: "SV DE CONFECÇÃO DE DOM E TARJETA", om: "GAP-GL", responsavel: "TEN GARCIA", observacoes: "ABERTURA 14MAI2026" },
      { licitacao: "90028/2026", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE MATERIAIS AUDIOVISUAIS PARA A BANDA", om: "BAGL", responsavel: "TEN PERES", observacoes: "ABERTURA 01JUL26" },
      { licitacao: "90029/2026", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE EXTINTORES DE INCÊNDIO PARA O GAP-GL E UNIDADES APOIADAS", om: "GAP-GL", responsavel: "CAP PIMENTA", observacoes: "ABERTURA 03JUL2026" },
      { licitacao: "90025/2026", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE MATERIAIS PARA CONTROLE DE CARRAPATOS", om: "PAMB", responsavel: "TEN ALVARES", observacoes: "ABERTURA 15JUN2026" },
      { licitacao: "90003/2026", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "SERVIÇO DE APOIO ÀS ATIVIDADES DE COMANDO", om: "GAP-GL", responsavel: "TEN JUANN", observacoes: "ABERTURA 14MAI2026" },
      { licitacao: "90011/2026", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE MATERIAIS DE SEGURANÇA E DEFESA", om: "BAGL", responsavel: "TEN WANDERMUREM", observacoes: "ABERTURA 10MAR2026" },
      { licitacao: "90028/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "SERVIÇOS GRÁFICOS", om: "GAP-GL", responsavel: "TEN JUANN", observacoes: "ABERTURA 04AGO25" },
      { licitacao: "90073/2026", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE EQUIPAMENTOS PARA O RANCHO", om: "GAP-GL", responsavel: "TEN ANDRÉ FELIPE", observacoes: "ABERTURA 09MAR2026" },
      { licitacao: "90066/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "SERVIÇO DE MANUTENÇÃO DE VIATURA", om: "GAP-GL", responsavel: "TEN ALVARES", observacoes: "ABERTURA 25NOV2025" },
      { licitacao: "90064/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "CESSÃO DE USO DE ACADEMIA", om: "PAGL", responsavel: "CAP SAULO", observacoes: "ABERTURA 14NOV2025 - CAP SAULO" },
      { licitacao: "90063/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "SERVIÇO DE MANUTENÇÃO DO HOTEL DE TRÂNISTO DOS GRADUADOS", om: "GAP-GL", responsavel: "CAP LEONARDO", observacoes: "ABERTURA 27NOV2025" },
      { licitacao: "90062/2025", modalidade: "CE", status: "6 - HOMOLOGADO", objeto: "SERVIÇO DE ENGENHARIA PARA MANUTENÇÃO DO HTG", om: "GAP-GL", responsavel: "CAP SAULO", observacoes: "ABERTURA 27NOV2025 - CAP LEONARDO" },
      { licitacao: "90061/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE MEDALHAS MILITARES", om: "DIRAP", responsavel: "TEN LARISSA", observacoes: "ABERTURA 10NOV2025" },
      { licitacao: "90059/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE MATERIAIS PARA A BANDA", om: "BAGL", responsavel: "TEN JUANN", observacoes: "ABERTURA 07OUT2025" },
      { licitacao: "90059/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE EQUIPAMENTOS DE AUDITÓRIO PARA A BAGL", om: "BAGL", responsavel: "TEN GARCIA", observacoes: "ABERTURA 26SET2025" },
      { licitacao: "90059/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE MATERIAL DE LIMPEZA (REPUBLICAÇÃO)", om: "GAP-GL", responsavel: "TEN LUISA", observacoes: "ABERTURA 22DEZ2025" },
      { licitacao: "90057/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "SERVIÇO DE MANUTENÇÃO DE BENS IMÓVEIS PARA O GAP-GL E UNIDADES APOIADAS", om: "GAP-GL", responsavel: "CAP LEONARDO", observacoes: "ABERTURA 15OUT2025" },
      { licitacao: "90056/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE FERRAMENTAS", om: "PAGL", responsavel: "TEN JUANN", observacoes: "ABERTURA 07OUT2025" },
      { licitacao: "90055/25", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "CESSÃO DE USO DAS VILAS", om: "PAGL", responsavel: "CAP SAULO", observacoes: "ABERTURA 24SET2025" },
      { licitacao: "90054/25", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "SINALIZAÇÃO HORIZONTAL", om: "BAGL", responsavel: "CAP SAULO", observacoes: "ABERTURA 29SET2025" },
      { licitacao: "90051/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE MATERIAL DE CONSUMO E EPI", om: "SERIPA III", responsavel: "CAP SAULO", observacoes: "" },
      { licitacao: "90050/2024", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "CESSÃO USO PARA CANTINA", om: "PAMA-GL", responsavel: "TEN SAULO", observacoes: "ABERTURA 25/11" },
      { licitacao: "90048/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "SERVIÇO DE TELEFONIA MÓVEL ", om: "HFAG", responsavel: "TEN JUANN", observacoes: "ABERTURA 27/08" },
      { licitacao: "90047/2024", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE EQUIPAMENTOS DE RANCHO ", om: "GAP-GL", responsavel: "TEN ANDRÉ FELIPE", observacoes: "ABERTURA 16DEZ" },
      { licitacao: "90046/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "SERVIÇO DE OUTSOURCING DE PEÇAS (OFICINA VIRTUAL)", om: "GAP-GL", responsavel: "TEN JUANN", observacoes: "ABERTURA 29/08" },
      { licitacao: "90046/2024", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE UTENSÍLIOS DE RANCHO", om: "GAP-GL", responsavel: "TEN ANDRÉ FELIPE", observacoes: "-" },
      { licitacao: "90045/25", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE DRONE, BATERIA E CONTROLE DE ACESSO", om: "BAGL", responsavel: "CAP SAULO", observacoes: "ELABORAÇÃO DE DOCUMENTAÇÃO DE FASE INTERNA" },
      { licitacao: "90045/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE DRONE, BATERIA E CONTROLADORAS DE ACESSO", om: "BAGL", responsavel: "TEN LUISA", observacoes: "ABERTURA 01/09" },
      { licitacao: "90045/2024", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "SERVIÇO DE MANUTENÇÃO DE EQUIPAMENTOS DE RANCHO", om: "GAP-GL", responsavel: "TEN ANDRÉ FELIPE", observacoes: "ABERTURA 16DEZ" },
      { licitacao: "90044/25", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE MATEIRAL PERMANENTE CBNB", om: "CBNB", responsavel: "CAP PIMENTA", observacoes: "PUBLICAÇÃO 03SET" },
      { licitacao: "90044/2024", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "SERVIÇO DE MANUTENÇÃO DAS CENTRAIS DE CHAMADA DE EMERGÊNCIA", om: "CGABEG", responsavel: "TEM MARCELLE", observacoes: "-" },
      { licitacao: "90039/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE APARELHOS DE AR CONDICIONADO ", om: "GAP-GL", responsavel: "CAP PIMENTA", observacoes: "ABERTURA 24JUL2025" },
      { licitacao: "90038/2024", modalidade: "DE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE MATERIAL PARA CRUZEX", om: "PAMA-GL", responsavel: "TEN JUANN", observacoes: "-" },
      { licitacao: "90037/2024", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE GÊNEROS ALIMENTÍCIOS - REPUBLICAÇÃO", om: "GAP-GL", responsavel: "TEN ANDRÉ FELIPE", observacoes: "ABERTURA 03/10 " },
      { licitacao: "90036/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE LÂMPADA LED", om: "GAP-GL", responsavel: "TEN LARISSA", observacoes: "ABERTURA 08jun2025" },
      { licitacao: "90036/2024", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "CESSÃO DE USO PARA POSTO BANCÁRIO", om: "PAMA-GL", responsavel: "TEN SAULO", observacoes: "" },
      { licitacao: "90035/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE FERRAMENTAS E EQUIPAMENTOS", om: "GAP-GL", responsavel: "TEN LUÍSA", observacoes: "ABERTURA 14JUN2025" },
      { licitacao: "90034/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "SERVIÇO DE MANUTENÇÃO E RECARGA DE EXTINTORES DE INCÊNDIO PARA O GAP-GL E UNIDADES APOIADAS", om: "GAP-GL", responsavel: "TEN JUANN", observacoes: "ABERTURA 25JUN2026" },
      { licitacao: "90033/2024", modalidade: "DE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE EQUIPAMENTOS DE TREINAMENTO", om: "1º GCC", responsavel: "TEN SAULO", observacoes: "ABERTURA 16/10" },
      { licitacao: "90032/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "SERVIÇO DE OUTSOURCING DE IMPRESSÃO", om: "GAP-GL", responsavel: "CAP LEONRDO", observacoes: "ABERTURA 17JUN2025" },
      { licitacao: "90032/2024", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO MATERIAL DE INFORMÁTICA CBNB", om: "CBNB", responsavel: "TEN BÁRBARA DUTRA", observacoes: "ABERTURA 25/11" },
      { licitacao: "90031/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE MATERIAL DE CONSUMO PARA O HT DO GAP-GL", om: "GAP-GL", responsavel: "TEN GARCIA", observacoes: "ABERTURA 04JUN2025" },
      { licitacao: "90030/2024", modalidade: "DE ", status: "6 - HOMOLOGADO", objeto: "SERVIÇO DE RECARGA DE EXTINTORES ", om: "CAE", responsavel: "TEN JUANN", observacoes: "-" },
      { licitacao: "90029/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "MERCADO LIVRE DE ENERGIA", om: "GAP-GL", responsavel: "CAP LEONARDO", observacoes: "ABERTURA 17 DE JUNHO DE 2025" },
      { licitacao: "90029/2024", modalidade: "DE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE CAMISETAS PARA O OUTUBRO ROSA", om: "GAP-GL", responsavel: "TEN JUANN", observacoes: "-" },
      { licitacao: "90028/2024", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE PEÇAS PARA MANUTENÇÃO DE EQUIPAMENTO DE RANCHO", om: "GAP-GL", responsavel: "TEN ANDRÉ FELIPE", observacoes: "ABERTURA " },
      { licitacao: "90027/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE MOBILIÁRIO PARA O HT", om: "GAP-GL", responsavel: "TEN LARISSA", observacoes: "ABERTURA 04JUN2025" },
      { licitacao: "90027/2024", modalidade: "DE", status: "6 - HOMOLOGADO", objeto: "CURSO DE CONDUTORES DE VEÍCULO", om: "CGABEG", responsavel: "TEN JUANN", observacoes: "ABERTURA 23/09" },
      { licitacao: "90027/2024", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "SERVIÇO DE CONFECÇÃO DE DOMS E TARJETAS PARA O GAP-GL E UNIDADES APOIADAS", om: "GAP-GL", responsavel: "TEN HINGEL", observacoes: "ABERTURA 22/10" },
      { licitacao: "90026/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE MATERIAIS CONTRAINCÊNDIO", om: "CGABEG", responsavel: "TEN LUISA", observacoes: "ABERTURA DIA 26 DE MAIO" },
      { licitacao: "90026/2024", modalidade: "DE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE MATERIAL PERMANENTE ", om: "PAMA-GL", responsavel: "CAP TOMAZ", observacoes: "ABERTURA 03/10" },
      { licitacao: "90025/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO MATERIAL DE HIGIENE E SEGURANÇA", om: "GAP-GL", responsavel: "TEN ANDRÉ FELIPE", observacoes: "ABERTURA 21 MAIO 2025" },
      { licitacao: "90025/2024", modalidade: "DE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE MATERIAIS DE CORTE DE AERONAVE", om: "PAMA-GL", responsavel: "TEN JUANN", observacoes: "ABERTURA 03/10" },
      { licitacao: "90025/2024", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "SERVIÇO DE RECOLHIMENTO DE RESÍDUOS", om: "GAP-GL", responsavel: "CAP LEONRDO", observacoes: "DATA DE ABERTURA DO CERTAME 13AGO" },
      { licitacao: "90024/2026", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "CESSÃO DE USO DE QUIOSQUE", om: "PAGL", responsavel: "TEN PERES", observacoes: "ABERTURA 14MAI2026" },
      { licitacao: "90024/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE MATERIAL PERMANENTE PARA O HT", om: "GAP-GL", responsavel: "TEN LARISSA", observacoes: "ABERTURA 22 DE MAIO DE 2025" },
      { licitacao: "90023/2024", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE MATERIAL DE INFRAESTRUTURA ", om: "PAMA-GL", responsavel: "CAP LEONRDO / TEN SAULO", observacoes: "DATA DE ABERTURA DO CERTAME 19AGO" },
      { licitacao: "90022/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "SERVIÇO DE INTÉRPRETE DE LIBRAS", om: "CBNB", responsavel: "TEN SAULO", observacoes: "ABERTURA 19 DE MAIO DE 2025" },
      { licitacao: "90022/2024", modalidade: "DE", status: "6 - HOMOLOGADO", objeto: "SERVIÇO DE MANUTENÇÃO PREVENTIVA E CORRETIVA DE PIANOS ", om: "CGABEG", responsavel: "TEN JUANN", observacoes: "-" },
      { licitacao: "90022/2024", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE MATERIAL DE LIMPEZA", om: "GAP-GL", responsavel: "CAP TOMAZ", observacoes: "-" },
      { licitacao: "90021/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "SERVIÇO DE TELEFONIA FIXA", om: "GAP-GL", responsavel: "TEN JUANN", observacoes: "90022" },
      { licitacao: "90021/2024", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "SERVIÇO DE CONTROLE DE PRAGAS", om: "GAP-GL", responsavel: "CAP LEONARDO", observacoes: "DATA DE ABERTURA DO CERTAME 08AGO" },
      { licitacao: "90020/2026", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE MATERIAIS PARA ALOJAMENTO DO GSD", om: "BAGL", responsavel: "TEN ALVARES", observacoes: "ABERTURA 29MAI2026" },
      { licitacao: "90020/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE MATERIAL DESCARTÁVEL", om: "GAP-GL", responsavel: "TEN ANDRÉ FELIPE", observacoes: "ABERTURA 09JUN2025" },
      { licitacao: "90020/2024", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "MERCADO LIVRE DE ENERGIA", om: "GAP-GL", responsavel: "TEN SAULO", observacoes: "DATA DE ABERTURA DO CERTAME 12AGO" },
      { licitacao: "90019/2024", modalidade: "DE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE IMPRESSORAS DE MANUFATURA DO PAMA-GL", om: "PAMA-GL", responsavel: "TEM LUÍSA", observacoes: "ABERTURA 19/09" },
      { licitacao: "90019/2024", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "CESSÃO USO PARA CORRETORA", om: "PAMA-GL", responsavel: "TEN SAULO", observacoes: "DATA DE ABERTURA DO CERTAME 08AGO" },
      { licitacao: "90018/2026", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE GENEROS ALIMENTÍCEOS - IND 2", om: "GAP-GL", responsavel: "TEN ANDRÉ FELIPE", observacoes: "ABERTURA 24ABR2026" },
      { licitacao: "90018/2024", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE KIT MULTIMÍDIA", om: "CBNB", responsavel: "CAP LEONRDO / TEN SAULO", observacoes: "DATA DE ABERTURA DO CERTAME 19AGO" },
      { licitacao: "90017/2026", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE GENEROS ALIMENTÍCEOS - IND 1", om: "GAP-GL", responsavel: "TEN ANDRÉ FELIPE", observacoes: "ABERTURA 17ABR2026" },
      { licitacao: "90017/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "SERVIÇO DE MANUTENÇÃO DE GERADORES  GAP-GL E UNIDADES APOIADAS", om: "GAP-GL", responsavel: "TEN SAULO", observacoes: "ABERTURA 02JUN2025" },
      { licitacao: "90016/2026", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "REPUBLICAÇÃO - MATERIAL DE LIMPEZA ALMOX", om: "GAP-GL", responsavel: "MJ FELIPE", observacoes: "ABERTURA 30MAR2026 " },
      { licitacao: "90016/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "CESSÃO DE USO PAPELARIA", om: "CBNB", responsavel: "TEN JUANN", observacoes: "ABERTURA DIA 28 DE MAIO 2025" },
      { licitacao: "90016/2024", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "CESSÃO DE USO PARA POSTO DE COMBUSTÍVEL", om: "PAGL", responsavel: "TEN SAULO", observacoes: "DATA DE ABERTURA DO CERTAME 09AGO" },
      { licitacao: "90015/2026", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE GENEROS ALIMENTÍCEOS - PROTEÍNA", om: "GAP-GL", responsavel: "TEN ANDRÉ FELIPE", observacoes: "ABERTURA 27ABR2026" },
      { licitacao: "90015/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "SERVIÇOS DE LAVANDERIA", om: "GAP-GL", responsavel: "TEN JUANN", observacoes: "ABERTURA 17/03" },
      { licitacao: "90014/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "CESSÃO DE USO PARA ÁREAS DA PAGL", om: "PAGL", responsavel: "TEN JUANN", observacoes: "ABERTURA 17/04" },
      { licitacao: "90014/2024", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE MEDALHAS ", om: "DIRAP", responsavel: "TEN SAULO", observacoes: "DATA DE ABERTURA DO CERTAME 15JUL" },
      { licitacao: "90013/2026", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE GENEROS ALIMENTÍCEOS - BEBIDA", om: "GAP-GL", responsavel: "TEN ANDRÉ FELIPE", observacoes: "ABERTURA 18MAI2026" },
      { licitacao: "90013/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "SERVIÇO DE ENGENHARIA PARA MANUTENÇÃO PREDIAL", om: "PAGL", responsavel: "TEM GUSTAVO (PAGL)", observacoes: "ABERTURA 28/03" },
      { licitacao: "90013/2024", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE MATERIAIS PARA LIMPEZA DE PISCINA", om: "CGABEG", responsavel: "TEN SAULO", observacoes: "DATA DE ABERTURA DO CERTAME 04JUL - BIANCA" },
      { licitacao: "90012/2026", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "REPUBLICAÇÃO - AQUISIÇÃO DE BENS PARA O HT FZ", om: "GAP-GL", responsavel: "TEN LARISSA", observacoes: "ABERTURA 25MAR2026" },
      { licitacao: "90012/2024", modalidade: "DE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE MATERIAL DE PINTURA PARA O PAMA-GL", om: "PAMA-GL", responsavel: "TEN BIANCA", observacoes: "-" },
      { licitacao: "90011/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "SERVIÇO DE LIMPEZA E CONSERVAÇÃO ", om: "HFAG", responsavel: "CAP LEONARDO", observacoes: "ABERTURA 10/03" },
      { licitacao: "90010/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE EQUIPAMENTOS PARA TTEC", om: "PAMB", responsavel: "TEN LARISSA", observacoes: "ABERTURA 25SET2025" },
      { licitacao: "90010/2026", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "REPUBLICAÇÃO - MATERIAIS PERMANENTES ", om: "CBNB", responsavel: "TEN JUANN", observacoes: "ABERTURA  31MAR2026" },
      { licitacao: "90010/2024", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE MATERIAL DE INFRAESTRUTURA", om: "GAP-GL", responsavel: "TEN SAULO", observacoes: "-" },
      { licitacao: "90009/2026", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "CESSÃO DE USO FOOD TRUCK", om: "BAGL", responsavel: "CAP SAULO", observacoes: "PROCESSO APROVADO 08DEZ2025" },
      { licitacao: "90009/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "BEBIDAS", om: "GAP-GL", responsavel: "TEN ANDRÉ FELIPE", observacoes: "ABERTURA 10/03" },
      { licitacao: "90009/2024", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "SERVIÇO DE TRANSMISSÃO E LOGÍSTICA DE CERIMONIAL", om: "GAP-GL", responsavel: "TEN SAULO", observacoes: "-" },
      { licitacao: "90008/2025", modalidade: "DE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE TENDAS (BAGL)", om: "BAGL", responsavel: "TEN LUISA", observacoes: "ABERTURA 31OUT2025" },
      { licitacao: "90008/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "PADARIA", om: "GAP-GL", responsavel: "TEN ANDRÉ FELIPE", observacoes: "ABERTURA 06/03" },
      { licitacao: "90007/2026", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE GENEROS ALIMENTÍCEOS - PADARIA", om: "GAP-GL", responsavel: "TEN ANDRÉ FELIPE", observacoes: "ABERTURA 24MAR2026" },
      { licitacao: "90007/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "INDUSTRIALIZADOS II", om: "GAP-GL", responsavel: "TEN ANDRÉ FELIPE", observacoes: "ABERTURA 06/03" },
      { licitacao: "90007/2024", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE PERIFÉRICOS DE INFORMÁTICA", om: "GAP-GL", responsavel: "TEN SAULO", observacoes: "DATA DE ABERTURA DO CERTAME 11/06/2024" },
      { licitacao: "90006/2026", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE GENEROS ALIMENTÍCEOS - HORTIFRUTI", om: "GAP-GL", responsavel: "TEN ANDRÉ FELIPE", observacoes: "ABERTURA 19MAR2026" },
      { licitacao: "90006/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: " INDUSTRIALIZADOS I", om: "GAP-GL", responsavel: "TEN ANDRÉ FELIPE", observacoes: "ABERTURA 06/03" },
      { licitacao: "90006/2024", modalidade: "CE", status: "6 - HOMOLOGADO", objeto: "READEQUAÇÃO DA SUBESTAÇÃO DE ENERGIA ELÉTRICA", om: "DIRAP", responsavel: "TEN SAULO", observacoes: "ABERTURA 29NOV" },
      { licitacao: "90006/2023", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "SERVIÇO DE MANUTENÇÃO DE ÁREAS VERDES", om: "GAP-GL", responsavel: "CAP LEONRDO", observacoes: "-" },
      { licitacao: "90005/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "ATERRAMENTO PÁTIO", om: "BAGL", responsavel: "CAP SAULO", observacoes: "ABERTURA 09OUT2025" },
      { licitacao: "90005/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "LATICÍNEOS E EMBUTIDOS", om: "GAP-GL", responsavel: "TEN ANDRÉ FELIPE", observacoes: "ABERTURA 06/03" },
      { licitacao: "90005/2024", modalidade: "CE", status: "6 - HOMOLOGADO", objeto: "READEQUAÇÃO DA SALA DE SERVIDORES E UPS ", om: "CCA-RJ", responsavel: "TEN SAULO", observacoes: "ABERTURA 29/11" },
      { licitacao: "90005/2023", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "SERVIÇO DE LIMPEZA DE ÁREAS INTERNAS E EXTERNAS", om: "GAP-GL", responsavel: "CAP LEONRDO", observacoes: "-" },
      { licitacao: "90004/2025", modalidade: "CE", status: "6 - HOMOLOGADO", objeto: "PROJETO DOS RANCHOS DO GAP-GL", om: "GAP-GL", responsavel: "CAP LEONARDO", observacoes: "ABERTURA 03NOV2025" },
      { licitacao: "90004/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "HORTIFRUTI", om: "GAP-GL", responsavel: "TEN ANDRÉ FELIPE", observacoes: "ABERTURA 28/02" },
      { licitacao: "90004/2024", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE MATERIAIS DESCARTÁVEIS - GSUB", om: "GAP-GL", responsavel: "TEN ANDRÉ FELIPE", observacoes: "-" },
      { licitacao: "90004/2024", modalidade: "CE", status: "6 - HOMOLOGADO", objeto: "REFORMA DO HANGAR ", om: "PAMB", responsavel: "TEN SAULO", observacoes: "ABERTURA 16DEZ" },
      { licitacao: "90003/2026", modalidade: "CE", status: "6 - HOMOLOGADO", objeto: "IMPLANTAÇÃO DE USINA FOTOVOLTÁICA", om: "BAGL", responsavel: "CAP SAULO", observacoes: "ABERTURA 17JUN2026" },
      { licitacao: "90003/2025", modalidade: "CE", status: "6 - HOMOLOGADO", objeto: "REFORMA DA SUBESTAÇÃO", om: "GAP-GL", responsavel: "CAP SAULO", observacoes: "ABERTURA DIA 27 DE MAIO DE 2025" },
      { licitacao: "90003/2025", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "SERVIÇO DE MANUTENÇÃO DE BOMBAS E AQUECEDORES", om: "CGABEG", responsavel: "CAP PIMENTA", observacoes: "ABERTURA  14/03/25" },
      { licitacao: "90003/2024", modalidade: "CE", status: "6 - HOMOLOGADO", objeto: "CONSTRUÇÃO DE MURO LIMÍTROFE", om: "PAMA-GL", responsavel: "TEN SAULO", observacoes: "ABERTURA 10DEZ" },
      { licitacao: "90003/2024", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "SERVIÇO DE TRANSPORTE DE BAGAGEM", om: "GAP-GL", responsavel: "TEN SAULO", observacoes: "-" },
      { licitacao: "90002/2026", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "SERVIÇO DE LOCAÇÃO DE KIT DE CAPTURA BIOMÉTRICA", om: "DIRAP", responsavel: "CAP SAULO", observacoes: "PROCESSO APROVADO 26NOV2025" },
      { licitacao: "90002/2025", modalidade: "CE", status: "6 - HOMOLOGADO", objeto: "REFORMA HANGAR BAGL", om: "BAGL", responsavel: "TEN SAULO", observacoes: "ABERTURA DIA 05JUN2025" },
      { licitacao: "90002/2024", modalidade: "CE", status: "6 - HOMOLOGADO", objeto: "REDE DE DISTRIBUIÇÃO DE 380V", om: "BAGL", responsavel: "TEN SAULO", observacoes: "ABERTURA 19/11" },
      { licitacao: "90002/2024", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE MATERIAIS DE HIGIENIZAÇÃO E SEGURANÇA - GSUB", om: "GAP-GL", responsavel: "TEN ANDRÉ FELIPE", observacoes: "-" },
      { licitacao: "90001/2026", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "SERVIÇO AGENTE TÉCNICO", om: "CBNB", responsavel: "CAP PIMENTA", observacoes: "ABERTURA 23FEV26 " },
      { licitacao: "90001/2026", modalidade: "CREDENCIAMENTO", status: "6 - HOMOLOGADO", objeto: "SERVIÇO CREDENCIAMENTO DE LEILOEIROS", om: "GAP-GL", responsavel: "CAP SAULO", observacoes: "-" },
      { licitacao: "90001/2025 ", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "PROTEÍNAS", om: "GAP-GL", responsavel: "TEN ANDRÉ FELIPE", observacoes: "ABERTURA 28/02" },
      { licitacao: "90001/2025", modalidade: "CE", status: "6 - HOMOLOGADO", objeto: "SERVIÇO DE IMPLANTAÇÃO DE RAMPA DE ACESSO", om: "CBNB", responsavel: "CAP SAULO", observacoes: "ABERTURA 27AGO2025" },
      { licitacao: "90001/2025", modalidade: "DE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE APARELHO DE RUSTICIDADE ", om: "GAP-GL", responsavel: "TEN JUANN", observacoes: "ABERTURA 11/03" },
      { licitacao: "207/2026", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "REPUBLICAÇÃO - GÊNEROS ALIMENTÍCIOS - BEBIDAS", om: "GAP-GL", responsavel: "TEN ANDRÉ FELIPE", observacoes: "ABERTURA 16JUL26" },
      { licitacao: "131/2026", modalidade: "DE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE MATERIAL PARA SALA MULTIFUNCIONAL", om: "CBNB", responsavel: "TEN PERES", observacoes: "ABERTURA 13FEV2026" },
      { licitacao: "112/2026", modalidade: "DE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE MATERIAIS DE APOIO PARA O SERIPA III", om: "SERIPA III", responsavel: "TEN WANDERMUREM", observacoes: "" },
      { licitacao: "110/2026", modalidade: "DE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE MATERIAIS DE APOIO À INVESTIGAÇÃO", om: "SERIPA III", responsavel: "CAP SAULO", observacoes: "" },
      { licitacao: "108/2026", modalidade: "DE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE MATERIAL HIDRÁULICO PAMB-RJ", om: "PAMB", responsavel: "TEN JUANN", observacoes: "PUBLICAÇÃO 24OUT" },
      { licitacao: "075/2023 ", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "SERVIÇO DE APOIO ÁS ATIVIDADES DE COMANDO", om: "GAP-GL", responsavel: "TEN SAULO", observacoes: "-" },
      { licitacao: "063/2023", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE GÊNEROS ALIMENTÍCIOS - PADARIA", om: "GAP-GL", responsavel: "TEN ANDRÉ FELIPE", observacoes: "INICIAÇÃO DO NOVO PROCESSO PREVISTO PARA SETEMBRO DE 2024" },
      { licitacao: "006/2027", modalidade: "DE", status: "6 - HOMOLOGADO", objeto: "SERVIÇO DE INSPEÇÃO DE GÁS", om: "CGABEG", responsavel: "TEN LARISSA", observacoes: "ABERTURA 08MAI2026" },
      { licitacao: "003/2027", modalidade: "DE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE MATERIAL PARA CANIL DO GSD", om: "BAGL", responsavel: "TEN GARCIA", observacoes: "ABERTURA 23MAR2026" },
      { licitacao: "002/2024", modalidade: "DE", status: "6 - HOMOLOGADO", objeto: "CONTRATAÇÃO DE SERVIÇO PARA A RECONSTRUÇÃO DE PARTE OESTE DO MURO LIMÍTROFE DO PAMB-RJ.", om: "PAMB", responsavel: "TEN SAULO", observacoes: "-" },
      { licitacao: "002/2024", modalidade: "DE", status: "6 - HOMOLOGADO", objeto: "CONTRATAÇÃO DE EMPRESA DE ENGENHARIA PARA A EXECUÇÃO DOS SERVIÇOS DESMONTAGEM DA ESTRUTURA DO PÓRTICO DE ENTRADA DO PAMB-RJ ", om: "PAMB", responsavel: "TEN ANDRÉ FELIPE", observacoes: "-" },
      { licitacao: "001/2024", modalidade: "DE", status: "6 - HOMOLOGADO", objeto: "SERVIÇO DE DESMONTAGEM E RETIRADA DO PÓRTICO DO PAMB-RJ", om: "PAMB", responsavel: "TEN SAULO", observacoes: "-" },
      { licitacao: "001/2024", modalidade: "DE", status: "6 - HOMOLOGADO", objeto: "CONTRATAÇÃO DE EMPRESA DE ENGENHARIA PARA RECONSTRUÇÃO DE PARTE DO MURO LIMÍTROFE DO PAMB-RJ, ", om: "PAMB", responsavel: "TEN TELLES", observacoes: "-" },
      { licitacao: "001/2024", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "CONTRATAÇÃO DE CURSOS - GSUB", om: "GAP-GL", responsavel: "TEN ANDRÉ FELIPE", observacoes: "INICIAÇÃO DO NOVO PROCESSO PREVISTO PARA NOVEMBRO DE 2024" },
      { licitacao: "-", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "CESSÃO DE USO PARA MANUTENÇÃO DE AERONAVES DO PAMA-GL", om: "PAMA-GL", responsavel: "CAP SAULO", observacoes: "PROCESSO APROVADO 26MAI2026 - COM O GAP" },
      { licitacao: "-", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "CESSÃO DE USO INSTITUIÇÃO ASSISTENCIAL SOCIOEDUCATIVA", om: "PAGL", responsavel: "CAP SAULO", observacoes: "PROCESSO APROVADO 17NOV2025" },
      { licitacao: "-", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "CESSÃO DE USO PARA EMPRESA DE REFORMA DE INTERIORES DE AERONAVE", om: "PAMA-GL", responsavel: "CAP SAULO", observacoes: "ADEQUAÇÃO PROCESSUAL PÓS CJU - PROCESSO APROVADO 20OUT2025" },
      { licitacao: "-", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "SERVIÇO DE MANUTENÇÃO DE COIFA", om: "GAP-GL", responsavel: "TEN ANDRÉ FELIPE", observacoes: "ABERTURA 29/10" },
      { licitacao: "-", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE MATERIAL DE CONSUMO PARA MANUTENÇÃO DE ÁREAS VERDES", om: "GAP-GL", responsavel: "TEN SAULO", observacoes: "ADEQUAÇÃO PROCESSUAL PÓS CJU - PROCESSO APROVADO" },
      { licitacao: "-", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE EQUIPAMENTO DE PROTEÇÃO INDIVIDUAL PARA O GAP-GL E UNIDADES APOIADAS", om: "GAP-GL", responsavel: "TEN SAULO", observacoes: "ADEQUAÇÃO PROCESSUAL PÓS CJU - PROCESSO APROVADO" },
      { licitacao: "-", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "CONTRATAÇÃO DE CURSOS DIVERSOS – ÁREAS VERDES", om: "GAP-GL", responsavel: "TEN TELLES", observacoes: "ADEQUAÇÃO PROCESSUAL PÓS CJU - PROCESSO APROVADO" },
      { licitacao: "-", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "AQUISIÇÃO DE EQUIPAMENTOS PARA MANUTENÇÃO DE ÁREAS VERDES", om: "GAP-GL", responsavel: "TEN JUANN", observacoes: "ADEQUAÇÃO PROCESSUAL PÓS CJU - PROCESSO APROVADO" },
      { licitacao: "-", modalidade: "PE", status: "6 - HOMOLOGADO", objeto: "CESSÃO DE USO PEIXARIA", om: "GAP-GL", responsavel: "TEN SAULO", observacoes: "RECEBIDO 30MAI2025" },
      { licitacao: "-", modalidade: "INEX", status: "6 - HOMOLOGADO", objeto: "CONTRATAÇÃO DO BANCO DE PREÇOS", om: "GAP-GL", responsavel: "CAP SAULO", observacoes: "ELABORAÇÃO DE DOCUMENTAÇÃO DE FASE INTERNA" },
      { licitacao: "130/2026", modalidade: "DE", status: "DESERTO", objeto: "SERVIÇO DE ABASTECIMENTO EM MISSÃO", om: "SERIPA III", responsavel: "CAP SAULO", observacoes: "" },
      { licitacao: "003/2023", modalidade: "TP", status: "FRACASSADO", objeto: "ATERRAMENTO E SINALIZAÇÃO HORIZONTAL DOS HANGARES 003 E 006", om: "BAGL", responsavel: "CAP LEONARDO", observacoes: "-" },
      { licitacao: "90042/2025", modalidade: "PE", status: "FRACASSADO", objeto: "AQUISIÇÃO DE RÁDIO PORTÁTIL E BATERIA", om: "BAGL", responsavel: "TEN JUANN", observacoes: "ABERTURA 04AGO2025" },
      { licitacao: "001/2027", modalidade: "DE", status: "REVOGADO", objeto: "AQUISIÇÃO DE MOTOBOMBA ", om: "BAGL", responsavel: "TEN WAMDERMUREM", observacoes: "ABERTURA 10FEV26" },
      { licitacao: "90004/2026", modalidade: "PE", status: "SUSPENSO", objeto: "SERVIÇO DE MANUTENÇÃO DE MOBILIÁRIO", om: "GAP-GL", responsavel: "TEN JUANN", observacoes: "-" }
    ],

    atas: [
      { pregao: "90005/2024", objeto: "SV DE LIMPEZA E CONSERVAÇÃO DE ÁREAS INTERNAS E EXTERNAS - (RENOVADO)", vigencia: "20/05/2026" },
      { pregao: "90006/2024", objeto: "SV DE MANUTENÇÃO DE ÁREAS VERDES - (RENOVADO)", vigencia: "20/05/2026" },
      { pregao: "90009/2024", objeto: "SERVIÇO DE TRANSMISSÃO E LOGÍSTICA DE CERIMONIAL - (RENOVADO)", vigencia: "18/07/2026" },
      { pregao: "90010/2024", objeto: "AQUISIÇÃO DE MATERIAIS DE INFRAESTRUTURA - (RENOVADO)", vigencia: "28/06/2026" },
      { pregao: "90014/2024", objeto: "AQUISIÇÃO DE MEDALHA MILITAR DE TEMPO DE SERVIÇO PARA A DIRAP - - (RENOVADO)", vigencia: "31/07/2026" },
      { pregao: "90025/2024", objeto: "SERVIÇO DE COLETA DE RESÍDUOS - (RENOVADO)", vigencia: "23/09/2026" },
      { pregao: "90029/2024", objeto: "AQUISIÇÃO DE EQUIPAMENTOS DE MANUTENÇÃO DE ÁREAS VERDES – (RENOVADO)", vigencia: "23/09/2026" },
      { pregao: "90048/2024", objeto: "SERVIÇO DE CONFECÇÃO DE DOM E TARJETA - (RENOVADO)", vigencia: "07/01/2027" },
      { pregao: "90001/2025", objeto: "AQUISIÇÃO DE GÊNEROS ALIMENTÍCIOS - PROTEÍNAS", vigencia: "14/05/2026" },
      { pregao: "90003/2025", objeto: "MANUTENÇÃO DE BOMBAS E AQUECEDORES ", vigencia: "01/04/2026" },
      { pregao: "90004/2025", objeto: "AQUISIÇÃO DE GÊNEROS ALIMENTÍCIOS - HORTIFRUTI", vigencia: "11/04/2026" },
      { pregao: "90005/2025", objeto: "AQUISIÇÃO DE GÊNEROS ALIMENTÍCIOS – LATICÍNIOS E EMBUTIDOS", vigencia: "09/04/2026" },
      { pregao: "90006/2025", objeto: "AQUISIÇÃO DE GÊNEROS ALIMENTÍCIOS – INDUSTRIALIZADOS I", vigencia: "09/04/2026" },
      { pregao: "90007/2025", objeto: "AQUISIÇÃO DE GÊNEROS ALIMENTÍCIOS – INDUSTRIALIZADOS II", vigencia: "04/04/2026" },
      { pregao: "90008/2025", objeto: "AQUISIÇÃO DE GÊNEROS ALIMENTÍCIOS – PADARIA", vigencia: "03/04/2026" },
      { pregao: "90009/2025", objeto: "AQUISIÇÃO DE GÊNEROS ALIMENTÍCIOS – BEBIDAS", vigencia: "07/04/2026" },
      { pregao: "90010/2025", objeto: "AQUISIÇÃO DE EQUIPAMENTOS PARA A TITEC - PAMB", vigencia: "11/11/2026" },
      { pregao: "90013/2025", objeto: "MANUTENÇÃO PREDIAL – PAGL", vigencia: "19/09/2026" },
      { pregao: "90015/2025", objeto: "SERVIÇO DE LAVANDERIA", vigencia: "18/03/2026" },
      { pregao: "90019/2025", objeto: "AQUISIÇÃO DE GÊNEROS ALIMENTÍCIOS – REPUBLICAÇÃO", vigencia: "23/06/2026" },
      { pregao: "90020/2025", objeto: "AQUISIÇÃO DE MATERIAIS DESCARTÁVEIS", vigencia: "10/07/2026" },
      { pregao: "90021/2025", objeto: "SERVIÇO DE TELEFONIA FIXA", vigencia: "05/06/2026" },
      { pregao: "90022/2025", objeto: "SERVIÇO CONTRATAÇÃO INTÉRPRETE DE LIBRAS - CBNB", vigencia: "16/07/2026" },
      { pregao: "90024/2025", objeto: "AQUISIÇÃO DE MATERIAIS PERMANENTE HTO", vigencia: "31/10/2026" },
      { pregao: "90025/2025", objeto: "AQUISIÇÃO DE LIMPEZA SSUB", vigencia: "27/08/2026" },
      { pregao: "90026/2025", objeto: "AQUISIÇÃO MAT. CONTRA INCÊNDIO CGABEG", vigencia: "03/06/2026" },
      { pregao: "90027/2025", objeto: "AQUISIÇÃO DE MATERIAIS MOBILIÁRIO PARA HTO", vigencia: "11/11/2026" },
      { pregao: "90028/2025", objeto: "SERVIÇO DE GRÁFICA", vigencia: "29/09/2026" },
      { pregao: "90029/2025", objeto: "MERCADO LIVRE DE ENERGIA", vigencia: "08/07/2026" },
      { pregao: "90030/2025", objeto: "OUTSOURCING DE IMPRESSÃO", vigencia: "08/07/2026" },
      { pregao: "90031/2025", objeto: "AQUISIÇÃO DE MATERIAL DE CONSUMO HTO", vigencia: "02/10/2026" },
      { pregao: "90035/2025", objeto: "AQUISIÇÃO DE FERRAMENTAS – GARAGEM", vigencia: "23/07/2026" },
      { pregao: "90036/2025", objeto: "AQUISIÇÃO DE LÂMPADAS LED", vigencia: "10/10/2026" },
      { pregao: "90037/2025", objeto: "SERVIÇO TELEFONIA MÓVEL", vigencia: "29/07/2026" },
      { pregao: "90038/2025", objeto: "OUTSOURCING DE IMPRESSÃO", vigencia: "10/07/2026" },
      { pregao: "90039/2025", objeto: "AQUISIÇÃO DE APARELHOS DE AR CONDICIONADO", vigencia: "13/08/2026" },
      { pregao: "90043/2025", objeto: "SERVIÇO DE MANUTENÇÃO E RECARGA DE EXTINTORES", vigencia: "11/09/2026" },
      { pregao: "90044/2025", objeto: "AQUISIÇÃO DE MATERIAL PERMANENTE PARA CBNB", vigencia: "30/10/2026" },
      { pregao: "90046/2025", objeto: "OUTSOURCING OFICINA VIRTUAL", vigencia: "23/09/2026" },
      { pregao: "90048/2025", objeto: "SERVIÇO DE TELEFONIA MÓVEL - REPUBLICAÇÃO", vigencia: "13/11/2026" },
      { pregao: "90049/2025", objeto: "AQUISIÇÃO DE MATERIAL DE PISCINA PARA O CGABEG", vigencia: "18/09/2026" },
      { pregao: "90057/2025", objeto: "SERVIÇO DE MANUTENÇÃO DE BENS E IMÓVEIS", vigencia: "17/12/2026" },
      { pregao: "90058/2025", objeto: "AQUISIÇÃO DE MOBILIÁRIO DE AUDITÓRIO – BAGL", vigencia: "14/11/2026" },
      { pregao: "90066/2025", objeto: "AQUISIÇÃO DE MATERIAL DE SEGURANÇA E DEFESA - BAGL", vigencia: "28/12/2026" },
      { pregao: "90068/2025", objeto: "AQUISIÇÃO DE MATERIAL DE CONSUMO – HT - FZ", vigencia: "18/12/2026" },
      { pregao: "90071/2025", objeto: "AQUISIÇÃO DE CONTADORES DE PARTÍCULAS – PAMAGL", vigencia: "26/12/2026" },
      { pregao: "90048/2024", objeto: "SERVIÇO DE CONFECÇÃO DE DOM E TARJETA (RENOVADO)", vigencia: "07/01/2027" }
    ],

    pipeline: [
      { categoria: "Materiais de Consumo", objeto: "AQUISIÇÃO DE EXTINTORES", ataVigente: false, vigencia: "", licitacao: "90029/2025", status: "LICITAÇÃO EM ANDAMENTO", observacao: "" },
      { categoria: "Materiais de Consumo", objeto: "AQUISIÇÃO DE MATERIAL DE INFRAESTRUTURA *", ataVigente: true, vigencia: "01/06/2026", licitacao: "", status: "ADEQUAÇÃO PÓS CJU", observacao: "" },
      { categoria: "Materiais de Consumo", objeto: "AQUISIÇÃO PERIFÉRICOS DE INFORMÁTICA *", ataVigente: false, vigencia: "", licitacao: "", status: "FASE INTERNA", observacao: "" },
      { categoria: "Materiais de Consumo", objeto: "AQUISIÇÃO DE TOKEN", ataVigente: false, vigencia: "", licitacao: "", status: "FASE INTERNA", observacao: "" },
      { categoria: "Materiais de Consumo", objeto: "AQUISIÇÃO DE EPI *", ataVigente: false, vigencia: "", licitacao: "", status: "FASE INTERNA", observacao: "" },
      { categoria: "Materiais de Consumo", objeto: "AQUISIÇÃO DE MATERIAL DE LIMPEZA", ataVigente: false, vigencia: "", licitacao: "", status: "LICITAÇÃO EM ANDAMENTO", observacao: "" },
      { categoria: "Materiais de Consumo", objeto: "AQUISIÇÃO DE MATERIAL ÁREAS VERDES (REPUBLICAR)", ataVigente: false, vigencia: "", licitacao: "", status: "FASE INTERNA", observacao: "" },
      { categoria: "Materiais de Consumo", objeto: "AQUISIÇÃO DE MATERIAL DE CONSUMO HT (REPUBLICAR)", ataVigente: true, vigencia: "01/11/2026", licitacao: "90031/2025", status: "NÃO INICIADO", observacao: "" },
      { categoria: "Materiais de Consumo", objeto: "AQUISIÇÃO DE LÂMPADA LED", ataVigente: true, vigencia: "01/10/2026", licitacao: "", status: "NÃO INICIADO", observacao: "" },
      { categoria: "Contratação de Serviços", objeto: "SERVIÇO DE MANUTENÇÃO DE MOBILIÁRIO", ataVigente: false, vigencia: "", licitacao: "", status: "ADEQUAÇÃO PÓS CJU - APROVADO", observacao: "Não se trata de serviços essenciais, porém é uma contratação interessante para atender às demandas pontuais das OMs Apoiadas, bem como eventuais utilizações de OMs de outras GUARNAE,  como por exemplo o DECEA" },
      { categoria: "Contratação de Serviços", objeto: "CESSÃO DE USO SIRI DA ILHA*", ataVigente: true, vigencia: "01/07/2026", licitacao: "", status: "CONTRATO VIGENTE - MIGRAR PARA CONTRAPARTIDA", observacao: "Devido à determinações do Alto Comando, será necessário que façamos uma nova licitação onde o pagamento realizado pelo locatário seja feita por contrapartida (Através de prestação de serviços de engenharia)" },
      { categoria: "Contratação de Serviços", objeto: "SERVIÇO DE POSTAGEM - CORREIOS", ataVigente: true, vigencia: "", licitacao: "", status: "HOMOLOGADO", observacao: "" },
      { categoria: "Contratação de Serviços", objeto: "SERVIÇO DE MANUTENÇÃO DE GERADORES", ataVigente: false, vigencia: "", licitacao: "90017/2025", status: "HOMOLOGADO", observacao: "" },
      { categoria: "Contratação de Serviços", objeto: "CURSO ÁREAS VERDES", ataVigente: false, vigencia: "", licitacao: "", status: "NÃO INICIADO", observacao: "Não esssencial, porém com as determinações do Alto Comando sobre o projeto internalizar, seria interessante possuir uma contratação de empresa especializada em aplicar cursos de conservação de áreas verdes para os soldados e sargentos" },
      { categoria: "Contratação de Serviços", objeto: "SERCIÇO DE CONFECÇÃO DE UNIFORMES ", ataVigente: false, vigencia: "", licitacao: "", status: "FASE INTERNA", observacao: "Como melhorias na apresentação pessoal de taifeiros arrumadores, bem como dos motoristas da Garagem, a contratação de mpresa especializada na confecção de uniformes possui certa relevância para o GAP-GL e Unidades não Apoiadas que eventualmente necessitem desse serviço" },
      { categoria: "Contratação de Serviços", objeto: "SERVIÇO DE AUTOESCOLA*", ataVigente: true, vigencia: "01/09/2026", licitacao: "90043/GAP-RJ/2025", status: "NÃO INICIADO", observacao: "Atualmente somos participantes da licitação do GAP-RJ, porém é importante a autonomia do GAP-GL na referida licitação" },
      { categoria: "Contratação de Serviços", objeto: "SERVIÇO DE CONFECÇÃO DE PERSIANA", ataVigente: false, vigencia: "", licitacao: "", status: "NÃO INICIADO", observacao: "Nunca tivemos esta contratação. Trata-se de inovação" },
      { categoria: "Contratação de Serviços", objeto: "SERVIÇOS DE TRANSMISSÃO DE EVENTOS", ataVigente: false, vigencia: "", licitacao: "", status: "FASE INTERNA", observacao: "Esta Contratação trata-se de serviços de transmissão de eventos através de diária de locação de telão, tendas, geradores, tablado, etc. Bem como a transmissão ao vivo no Youtube. Essencial para os eventos institucionais de toda GUARNAE-GL (principalmente a BAGL que é sede de grandes eventos como a OMA) e para outras OMs de outras GUARNAE que utilizam com grande frequência nosso pregão." },
      { categoria: "Contratação de Serviços", objeto: "ENGENHARIA TELHADOS", ataVigente: false, vigencia: "", licitacao: "", status: "ADEQUAÇÃO PÓS CJU - APROVADO", observacao: "" },
      { categoria: "Materiais Permanentes", objeto: "AQUISIÇÃO DE ELETRODOMÉSTICOS", ataVigente: false, vigencia: "", licitacao: "", status: "FASE INTERNA", observacao: "Possuímos uma licitação que atendeu às demandas pontuais do Rancho e da copa do GAP-GL, porém é interessante realizarmos uma em atendimento de toda GUARNAE-GL" },
      { categoria: "Materiais Permanentes", objeto: "AQUISIÇÃO DE EQUIPAMENTOS AUDIOVISUAIS ", ataVigente: false, vigencia: "", licitacao: "", status: "NÃO INICIADO", observacao: "Importante implementar uma ARP para aquisição de materiais como microfone, caixa de som, pulpito, camera fotográfica e demais equipamentos que venham a atender às demandas de formaturas e eventos institucionais" },
      { categoria: "Materiais Permanentes", objeto: "AQUISIÇÃO DE AR-CONDICIONADO", ataVigente: true, vigencia: "01/08/2026", licitacao: "90039/2025", status: "NÃO INICIADO", observacao: "Ata vigente. Certame necessário licitar anualmente" },
      { categoria: "Materiais Permanentes", objeto: "AQUISIÇÃO DE EQUIPAMENTO MANUTENÇÃO ÁREAS VERDES (REPUBLICAR)", ataVigente: true, vigencia: "01/09/2026", licitacao: "90029/2024", status: "NÃO INICIADO", observacao: "Ata vigente. Necessário licitar anualmente, em virtude do Projeto \"Internalizar\"" },
      { categoria: "Materiais Permanentes", objeto: "AQUISIÇÃO DE FERRAMENTAS GARAGEM (REPUBLICAR)", ataVigente: true, vigencia: "01/07/2026", licitacao: "90035/2025", status: "NÃO INICIADO", observacao: "Ata vigente. Certame necessário licitar para complementação em virtude do Projeto \"Internalizar\"" },
      { categoria: "Materiais Permanentes", objeto: "AQUISIÇÃO DE PERMANENTE EM GERAL HT (REPUBLICAR)", ataVigente: true, vigencia: "01/10/2026", licitacao: "90024/2025", status: "NÃO INICIADO", observacao: "" },
      { categoria: "Materiais Permanentes", objeto: "AQUISIÇÃO DE MOBILIÁRIO PARA HT (REPUBLICAR)", ataVigente: true, vigencia: "01/11/2026", licitacao: "90027/2025", status: "NÃO INICIADO", observacao: "" },
      { categoria: "Materiais Permanentes", objeto: "AQUISIÇÃO DE PERMANENTE PARA AUDITÓRIO", ataVigente: false, vigencia: "", licitacao: "", status: "NÃO INICIADO", observacao: "Importante implementar uma ARP para aquisição de materiais como Longarina, projetor, tela de projeção, equipamentos para videoconferência, etc" }
    ]
  }
};
