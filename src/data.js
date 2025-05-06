// data.js - Dados estáticos para a aplicação CBMERJ

// Lista de todos os GBMs do CBMERJ
export const gbmList = [
    { id: 1, name: "1º GBM - Centro", endereco: "Praça da República, 45 - Centro, Rio de Janeiro" },
    { id: 2, name: "2º GBM - Méier", endereco: "Rua Aristides Caire, 56 - Méier, Rio de Janeiro" },
    { id: 3, name: "3º GBM - Humaitá", endereco: "Rua Humaitá, 126 - Humaitá, Rio de Janeiro" },
    { id: 4, name: "4º GBM - Nova Iguaçu", endereco: "Av. Governador Portela, 1330 - Centro, Nova Iguaçu" },
    { id: 5, name: "5º GBM - Copacabana", endereco: "Rua Xavier da Silveira, 120 - Copacabana, Rio de Janeiro" },
    { id: 6, name: "6º GBM - Tijuca", endereco: "Rua Barão de Mesquita, 346 - Tijuca, Rio de Janeiro" },
    { id: 7, name: "7º GBM - São Cristóvão", endereco: "Av. Pedro II, 293 - São Cristóvão, Rio de Janeiro" },
    { id: 8, name: "8º GBM - Campinho", endereco: "Rua Domingos Lopes, 336 - Campinho, Rio de Janeiro" },
    { id: 9, name: "9º GBM - Macaé", endereco: "Rua Alfredo Backer, 504 - Centro, Macaé" },
    { id: 10, name: "10º GBM - Angra dos Reis", endereco: "Av. Almirante Júlio César de Noronha, 1322 - São Bento, Angra dos Reis" },
    { id: 11, name: "11º GBM - Vila Isabel", endereco: "Av. 28 de Setembro, 382 - Vila Isabel, Rio de Janeiro" },
    { id: 12, name: "12º GBM - Jacarepaguá", endereco: "Rua Henriqueta, 99 - Tanque, Rio de Janeiro" },
    { id: 13, name: "13º GBM - Campo Grande", endereco: "Av. Cesário de Melo, 3226 - Campo Grande, Rio de Janeiro" },
    { id: 14, name: "14º GBM - Duque de Caxias", endereco: "Av. Brigadeiro Lima e Silva, 1001 - Jardim 25 de Agosto, Duque de Caxias" },
    { id: 15, name: "15º GBM - Petrópolis", endereco: "Av. Barão do Rio Branco, 1957 - Centro, Petrópolis" },
    { id: 16, name: "16º GBM - Teresópolis", endereco: "Av. Oliveira Botelho, 89 - Alto, Teresópolis" },
    { id: 17, name: "17º GBM - Cabo Frio", endereco: "Av. Nilo Peçanha, s/n - Parque Central, Cabo Frio" },
    { id: 18, name: "18º GBM - Volta Redonda", endereco: "Av. Paulo de Frontin, 854 - Aterrado, Volta Redonda" },
    { id: 19, name: "19º GBM - Ilha do Governador", endereco: "Estrada do Galeão, s/n - Jardim Guanabara, Rio de Janeiro" },
    { id: 20, name: "20º GBM - São Gonçalo", endereco: "Rua Dr. Feliciano Sodré, 260 - Centro, São Gonçalo" },
    { id: 21, name: "21º GBM - Itaperuna", endereco: "Av. Santos Dumont, 40 - Aeroporto, Itaperuna" },
    { id: 22, name: "22º GBM - Nova Friburgo", endereco: "Praça da Bandeira, 1027 - Centro, Nova Friburgo" },
    { id: 23, name: "23º GBM - Resende", endereco: "Av. Saturnino Braga, 111 - Campos Elíseos, Resende" },
    { id: 24, name: "24º GBM - Irajá", endereco: "Av. Brasil, 19001 - Irajá, Rio de Janeiro" },
    { id: 25, name: "25º GBM - Gávea", endereco: "Rua Major Rubens Vaz, 194 - Gávea, Rio de Janeiro" },
    { id: 26, name: "26º GBM - Campos dos Goytacazes", endereco: "Av. 28 de Março, s/n - Centro, Campos dos Goytacazes" },
    { id: 27, name: "27º GBM - Santa Cruz", endereco: "Av. Isabel, s/n - Santa Cruz, Rio de Janeiro" },
    { id: 28, name: "28º GBM - Araruama", endereco: "Av. Nilo Peçanha, 250 - Centro, Araruama" },
    { id: 29, name: "29º GBM - Itaipava", endereco: "Estrada União e Indústria, 8117 - Itaipava, Petrópolis" }
  ];
  
  // Estrutura do Caderno de Inspeção
  export const inspectionData = [
    {
      section: "B/1",
      title: "ADMINISTRAÇÃO",
      subsections: [
        {
          id: "1.1",
          title: "Documentação Administrativa",
          items: [
            { id: "a", description: "Os assentamentos das Praças BM estão atualizados e devidamente assinados por autoridade competente? (serão verificadas, por amostragem, as folhas de alterações)" },
            { id: "b", description: "Os Boletins internos das OBMs e do CBA estão atualizados, lançados no portal e disponibilizados para a leitura?" },
            { id: "c", description: "Publicação em Boletim (no mês anterior ao de referência) da Escala de Expediente dos militares da atividade-meio?" },
            { id: "d", description: "Publicação em Boletim (no mês anterior ao de referência) da Escala de Serviço Operacional dos militares do expediente?" },
            { id: "e", description: "O Plano de Chamada dos militares está atualizado e de acordo com o sistema DGP? (A atualização deve ser mensal e os endereços/telefones devem corresponder aos constantes no sistema)" },
            { id: "f", description: "O Mapa da Força está atualizado e de acordo com o sistema DGP? (A atualização deve ser mensal e as informações devem corresponder às constantes no sistema)" },
            { id: "g", description: "Há Livro de Ordens (meio físico ou digital)?" }
          ]
        },
        {
          id: "1.2",
          title: "Gestão de Pessoal",
          items: [
            { id: "a", description: "Controle de dispensa e licença para tratamento de saúde: é feita a publicação em Boletim Interno dos militares com DM/LTS? É feita a atualização e o controle?" },
            { id: "b", description: "Controle de férias dos militares: Ocorre a publicação em Boletim Interno e o devido registro nos assentamentos do militar (meio físico e digital)? É realizada a atualização e o controle?" },
            { id: "c", description: "Endereço e telefone dos militares devidamente atualizados? Como é verificado?" },
            { id: "d", description: "Controle e verificação do lançamento de dados (sistema DGP) referentes à justiça e disciplina: é feita a publicação em Boletim Interno e inserção de dados no sistema?" },
            { id: "e", description: "Os dados referentes aos militares são devidamente lançados no sistema DGP (Assentamentos) de forma a gerar Folha de Alterções com dados atualizados e fidedignos?" },
            { id: "f", description: "O Mapa das Alas está atualizado?" },
            { id: "g", description: "Controle de distribuição do quantitativo de RAS da unidade. Como são realizados?" }
          ]
        }
      ]
    },
    {
      section: "B/2",
      title: "LOGÍSTICA",
      subsections: [
        {
          id: "2.1",
          title: "Infraestrutura da AI",
          items: [
            { id: "a", description: "Rede de Acesso Internet?" },
            { id: "b", description: "Linha telefônica?" },
            { id: "c", description: "Email para uso exclusivo da AI?" },
            { id: "d", description: "Armazenamento de imagens em local de restrito acesso nas unidades em que houver circuito fechado de televisão (CFTV)?" }
          ]
        }
      ]
    },
    {
      section: "B/3",
      title: "ANÁLISE OPERACIONAL",
      subsections: [
        {
          id: "3.1",
          title: "Atividades da Seção",
          items: [
            { id: "a", description: "Identificação das áreas de risco da área operacional para as guarnições?" },
            { id: "b", description: "Identificação das localidades com maior incidência de eventos?" },
            { id: "c", description: "Acompanhamento do noticiários dos principais meios de comunicação dos municípios da área operacional?" },
            { id: "d", description: "Principais incidências de transgressão disciplinar?" }
          ]
        },
        {
          id: "3.2",
          title: "Documentação da Seção",
          items: [
            { id: "a", description: "Assentamentos de Oficiais atualizado?" },
            { id: "b", description: "Plano de Segurança da OBM atualizado?" },
            { id: "c", description: "Contato dos demais órgãos e concessionárias de serviço público na Seção?" },
            { id: "d", description: "Listagem de militares subjudice com acompanhamento periódico?" },
            { id: "e", description: "Controle de acesso de civis, militares e automóveis à unidade?" },
            { id: "f", description: "Plano de acionamento de agentes?" },
            { id: "g", description: "Controle e contatos dos agentes da AI?" },
            { id: "h", description: "Publicação em boletim dos militares da BM2 e AI?" },
            { id: "i", description: "Contato com a BM2/EMG (email, telefone do permanência e fixo)?" }
          ]
        }
      ]
    },
    {
      section: "B/4",
      title: "ARMAMENTO",
      subsections: [
        {
          id: "4.1",
          title: "Controle de Armamentos",
          items: [
            { id: "a", description: "Local para guarda de armamento de militares de serviço?" },
            { id: "b", description: "Controle e armazenamento de armamento institucionais e particulares?" },
            { id: "c", description: "Rotina e controle de acautelamento de arma particular de militares de serviço?" }
          ]
        }
      ]
    },
    {
      section: "B/5",
      title: "SST",
      subsections: [
        {
          id: "5.1",
          title: "Estrutura Geral da SST",
          items: [
            { id: "a", description: "Existência de computadores para atender a demanda da seção?" },
            { id: "b", description: "Viatura exclusiva para atendimento da demanda da seção?" },
            { id: "c", description: "Rede de acesso à internet?" },
            { id: "d", description: "Existência de acessórios e impressoras para atender a demanda da seção?" },
            { id: "e", description: "Material para análise e vistorias" }
          ]
        }
      ]
    },
    {
      section: "B/6",
      title: "SAÚDE",
      subsections: [
        {
          id: "6.1",
          title: "Militares de APH e dos Postos Médicos",
          items: [
            { id: "a", description: "Plano de chamada atualizado de todos os militares" },
            { id: "b", description: "Atualização das informações no sistema DGP" },
            { id: "c", description: "Relação de especialidades e subespecialidades dos militares pertencentes ao serviço de APH" },
            { id: "d", description: "Os militares pertencentes ao serviço de APH participaram dos cursos obrigatórios e de relevância ao serviço?" },
            { id: "e", description: "Programação de férias de todos os militares pertencentes ao serviço de APH" },
            { id: "f", description: "Controle de licenças e afastamentos" },
            { id: "g", description: "Envio de escala mensal" },
            { id: "h", description: "Plano de chamada atualizado dos militares que atuam no posto médico" }
          ]
        },
        {
          id: "6.2",
          title: "Logística das Seções de APH/ASE e Postos Médicos",
          items: [
            { id: "a", description: "Calendário de Atividades Mensais (CAM) atualizado e exposto em local visível" },
            { id: "b", description: "Envio dos RAPHs à DGSE" },
            { id: "c", description: "Requisição de Material Permanente e insumos" },
            { id: "d", description: "Registro de Manutenção Preventiva e Corretiva dos Equipamentos" },
            { id: "e", description: "Rotina de conferência da validade dos medicamentos" },
            { id: "f", description: "Check list das viaturas (ASE) atualizados" },
            { id: "g", description: "Limpeza das viaturas (ASE)" },
            { id: "h", description: "Envio de estatísticas de atendimentos do posto para a DGS" }
          ]
        }
      ]
    },
    {
      section: "B/7",
      title: "ODONTOLOGIA",
      subsections: [
        {
          id: "7.1",
          title: "Administração",
          items: [
            { id: "a", description: "Iluminação" },
            { id: "b", description: "Refrigeração" },
            { id: "c", description: "Ventilação" },
            { id: "d", description: "Organização" },
            { id: "e", description: "Limpeza" },
            { id: "f", description: "Disposição do mobiliário e do equipo odontológico de forma ergonômica" }
          ]
        },
        {
          id: "7.2",
          title: "Técnico-Operacional",
          items: [
            { id: "a", description: "Efetivo – Verificar se o efetivo é suficiente, excedente ou deficiente para a demanda e número de consultórios da Unidade" },
            { id: "b", description: "Correto lançamento dos registros de atendimentos odontológicos no Prontuário eletrônico" },
            { id: "c", description: "Disponibilidade de Agenda física/eletrônica" },
            { id: "d", description: "Planilha de controle de encaminhamentos de pacientes" },
            { id: "e", description: "Equipamentos – Se estão em bom estado e funcionando satisfatoriamente" },
            { id: "f", description: "Registro de manutenção preventiva e corretiva dos equipamentos" },
            { id: "g", description: "Almoxarifado – Organização dos armários, atualização do Sistema Odontolog, validade dos materiais" },
            { id: "h", description: "Gerenciamento dos resíduos: descarte de lixo comum e infectante" },
            { id: "i", description: "Rotina de Biossegurança" },
            { id: "j", description: "Mecanismos de controle da esterilização" }
          ]
        }
      ]
    }
  ];
  
  // Status options for inspection items
  export const statusOptions = [
    { value: "Pendente", label: "Pendente" },
    { value: "Conforme", label: "Conforme" },
    { value: "Não Conforme", label: "Não Conforme" },
    { value: "Não Aplicável", label: "Não Aplicável" }
  ];
  
  // User roles
  export const userRoles = [
    { value: "admin", label: "Administrador" },
    { value: "inspetor", label: "Inspetor" },
    { value: "visualizador", label: "Visualizador" }
  ];
  
  // Initial users for the application (for development only)
  export const initialUsers = [
    {
      email: "admin@cbmerj.gov.br",
      password: "123456", // This should be hashed in a real application
      displayName: "Administrador",
      role: "admin"
    },
    {
      email: "inspetor@cbmerj.gov.br",
      password: "123456", // This should be hashed in a real application
      displayName: "Inspetor de Teste",
      role: "inspetor"
    }
  ];
  
  // Helper function to calculate percentage
  export const calculatePercentage = (part, total) => {
    if (total === 0) return 0;
    return Math.round((part / total) * 100);
  };