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

// Estrutura completa do Caderno de Inspeção
export const inspectionData = [
  {
      section: "B/1",
      title: "ADMINISTRAÇÃO",
      subsections: [
          {
              id: "1.1",
              title: "Produção da SAD - Gestão de documentos",
              items: [
                  { id: "a", description: "Os assentamentos das Praças BM estão atualizados e devidamente assinados por autoridade competente? (serão verificadas, por amostragem, as folhas de alterações)" },
                  { id: "b", description: "Os Boletins internos das OBMs e do CBA estão atualizados, lançados no portal e disponibilizados para a leitura?" },
                  { id: "c", description: "Publicação em Boletim (no mês anterior ao de referência) da Escala de Expediente dos militares da atividade-meio?" },
                  { id: "d", description: "Publicação em Boletim (no mês anterior ao de referência) da Escala de Serviço Operacional dos militares do expediente?" },
                  { id: "e", description: "O Plano de Chamada dos militares está atualizado e de acordo com o sistema DGP? (A atualização deve ser mensal e os endereços/telefones devem corresponder ao informado no sistema DGP)" },
                  { id: "f", description: "O Mapa da Força está atualizado e de acordo com o sistema DGP? (A atualização deve ser mensal e as informações devem corresponder às constantes no sistema DGP)" },
                  { id: "g", description: "Há Livro de Ordens (meio físico ou digital)?" }
              ]
          },
          {
              id: "1.2",
              title: "Sistema de controle e gerenciamento de pessoal",
              items: [
                  { id: "a", description: "Controle de dispensa e licença para tratamento de saúde: é feita a publicação em Boletim Interno dos militares com DM/LTS? É feita a atualização e o controle?" },
                  { id: "b", description: "Controle de férias dos militares: Ocorre a publicação em Boletim Interno e o devido registro nos assentamentos do militar (meio físico e digital)? É realizada a atualização e o lançamento no sistema DGP? Existe verificação de férias? Como ocorre?" },
                  { id: "c", description: "Endereço e telefone dos militares devidamente atualizados? Como é verificado?" },
                  { id: "d", description: "Controle e verificação do lançamento de dados (sistema DGP) referentes à justiça e disciplina: é feita a publicação em Boletim Interno e inserção de dados no sistema DGP?" },
                  { id: "e", description: "Os dados referentes aos militares são devidamente lançados no sistema DGP (Assentamentos) de forma a gerar Folha de Alterações com dados atualizados e pertinentes?" },
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
              title: "Produção e armazenamento de documentos",
              items: [
                  { id: "a", description: "Rede de Acesso Internet?" },
                  { id: "b", description: "Linha telefônica?" },
                  { id: "c", description: "Email para uso exclusivo da AI?" },
                  { id: "d", description: "Armazenamento de imagens em local de restrito acesso nas unidades em que houver circuito fechado de televisão (CFTV)?" }
              ]
          },
          {
              id: "3.1",
              title: "Produção de conhecimento operacional",
              items: [
                  { id: "a", description: "Identificação das áreas de risco da área operacional para as guarnições?" },
                  { id: "b", description: "Identificação das localidades com maior incidência de eventos?" },
                  { id: "c", description: "Acompanhamento do noticiários dos principais meios de comunicação dos municípios da área operacional?" },
                  { id: "d", description: "Principais incidências de transgressão disciplinar?" }
              ]
          },
          {
              id: "3.2",
              title: "Documentos produzidos e controlados",
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
          },
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
      section: "B/3",
      title: "OPERAÇÕES",
      subsections: [
          {
              id: "1.1",
              title: "Recepção da autoridade inspecionante",
              items: [
                  { id: "a", description: "Execução do pique de alerta e anúncio verbal da chegada da autoridade?" },
                  { id: "b", description: "Toque de corneta da maior autoridade presente?" },
                  { id: "c", description: "Apresentação da Guarda pelo Comandante da Guarda?" },
                  { id: "d", description: "Brado geral e acionamento dos dispositivos sonoros e de iluminação das viaturas?" },
                  { id: "e", description: "Apresentação da tropa pelo Comandante da Unidade?" },
                  { id: "f", description: "Esmero da tropa na formatura?" }
              ]
          },
          {
              id: "2.1",
              title: "Honras e sinais de continências",
              items: [
                  { id: "a", description: "Cerimônia de hasteamento do Pavilhão Nacional?" },
                  { id: "b", description: "Todo contigente formado (Oficiais e praças de serviço e expediente)?" },
                  { id: "c", description: "Cânticos dos Hinos e ou canções por todos os militares presentes na formatura?" },
                  { id: "d", description: "Boa conservação do Pavilhão Nacional?" },
                  { id: "e", description: "Boa conservação de outros símbolos (Bandeira do Estado e flâmula do Cmt)?" }
              ]
          },
          {
              id: "3.1",
              title: "Documentação Operacional",
              items: [
                  { id: "a", description: "QTS atualizado e exposto em local visível?" },
                  { id: "b", description: "Cópia das Operações simuladas (últimos 2 anos)?" },
                  { id: "c", description: "Cópias dos Planos (Emprego, Chamada, Seção) arquivadas na SsCO/sala do Oficial de Dia (último ano)?" },
                  { id: "d", description: "Relatório Mensal das Instruções (Oficiais e Praças)?" },
                  { id: "e", description: "Quesitos e Certidões de Ocorrência (Controle)?" },
                  { id: "f", description: "Quesitos e Certidões de Ocorrência (Informações sobre condições de segurança contra incêndio e pânico dos locais sinistrados)?" },
                  { id: "g", description: "Integração SOP/SST (se a SOP informa, oficialmente, à SST sobre as condições de segurança contra incêndio e pânico das edificações e áreas de risco, registradas nos quesitos)?" },
                  { id: "h", description: "Plano de Operações conforme NPCI?" },
                  { id: "i", description: "Extrato do Plano de Operações acessível no telefone funcional do Comandante de SOS?" },
                  { id: "j", description: "Planejamento quanto a organização e execução dos recursos disponíveis para a execução do TOD?" },
                  { id: "k", description: "Relatório de análises dos Testes operacionais diários?" },
                  { id: "l", description: "Arquivamento das fichas de registros do TOD?" }
              ]
          },
          {
              id: "4.1",
              title: "Teste Operacional Diário (TOD)",
              items: [
                  { id: "a", description: "Execução do TOD?" },
                  { id: "b", description: "Supervisão do TOD?" },
                  { id: "c", description: "Estabelecimento das viaturas de socorro?" },
                  { id: "d", description: "Utilização correta do POP?" },
                  { id: "e", description: "Houve utilização de rádios no TOD?" },
                  { id: "f", description: "Utilizaram corretamente a roupa de aproximação?" },
                  { id: "g", description: "Utilizaram corretamente os equipamento de proteção respiratória (EPR)?" },
                  { id: "h", description: "Manusearam corretamente a motossera ou o moto rebolo?" },
                  { id: "i", description: "No item anterior, utilizaram o EPI correto?" },
                  { id: "j", description: "Manusearam corretamente o Desencarcerador?" },
                  { id: "k", description: "No item anterior, utilizaram o EPI correto?" },
                  { id: "l", description: "Utilização correta da técnica denominada \"Bomba Armar\" para montar duas linhas, com uma mangueira na ligação e uma em cada linha?" },
                  { id: "m", description: "No item anterior, utilizaram o EPI correto?" },
                  { id: "n", description: "Utilização correta das técnicas de mobilização e transporte de vítimas até o interior da ASE?" },
                  { id: "o", description: "No item anterior, utilizaram o EPI correto?" },
                  { id: "p", description: "TOD está no SISGEO? (Escolher um mês para fazer a conferência)" }
              ]
          },
          {
              id: "5.1",
              title: "Área Operacional",
              items: [
                  { id: "a", description: "O mapa da área operacional está acessível aos militares de serviço na Subseção de Controle Operacional?" },
                  { id: "b", description: "A demarcação da área operacional no mapa operacional?" },
                  { id: "c", description: "A demarcação dos recursos hídricos no mapa operacional?" },
                  { id: "d", description: "A demarcação dos Pontos Críticos relevantes?" },
                  { id: "e", description: "A demarcação de outros recursos disponíveis (hospitais, UBM, BPM, DP, etc...)?" }
              ]
          },
          {
              id: "6.1",
              title: "Procedimento no Acionamento do Socorro",
              items: [
                  { id: "a", description: "Execução do carrilhão e brado de alerta?" },
                  { id: "b", description: "Descrição da solicitação de socorro através do sistema de som da UBM ?" },
                  { id: "c", description: "Brado final?" },
                  { id: "d", description: "Deslocamento dos bombeiros militares com presteza?" },
                  { id: "e", description: "Sonorização e Iluminação das Viaturas?" },
                  { id: "f", description: "Tempo de saída do Socorro conforme as normas vigentes?" }
              ]
          },
          {
              id: "7.1",
              title: "Instalações da Subseção de Controle Operacional (SsCO)",
              items: [
                  { id: "a", description: "Ambiente ergonômico?" },
                  { id: "b", description: "Notas publicadas e POPs disponibilizados aos operadores ?" },
                  { id: "c", description: "Todos os Militares capacitados pelo COCBMERJ?" },
                  { id: "d", description: "Pleno acesso ao sistema de despacho de viaturas \"on call\"?" },
                  { id: "e", description: "Pleno acesso ao sistema de monitoramento, estatísticas e relatórios \"SisGeO\"?" },
                  { id: "f", description: "Telefones 193 e linhas privativas operando?" },
                  { id: "g", description: "Visualização do pátio de viaturas operacionais?" },
                  { id: "h", description: "Visualização das instalações da OBM por CFTV?" },
                  { id: "i", description: "Arquivo na SsCO da descrição da rede de abastecimento Pública de água?" },
                  { id: "j", description: "Sistema de recebimento e despacho de vtrs em funcionamento?" }
              ]
          },
          {
              id: "8.1",
              title: "Viaturas Operacionais",
              items: [
                  { id: "a", description: "A relação dos bombeiros militares de serviço foram lançadas no SISGEO?" },
                  { id: "b", description: "A GRD está lançada no SISGEO?" }
              ]
          },
          {
              id: "9.1",
              title: "Recursos Hídricos",
              items: [
                  { id: "a", description: "Relatório de corrida de área?" },
                  { id: "b", description: "Cadastramento do Recursos Hídricos no SisGeO?" }
              ]
          }
      ]
  },
  {
      section: "B/4",
      title: "LOGÍSTICA",
      subsections: [
          {
              id: "1.1",
              title: "Logística de Materiais",
              items: [
                  { id: "a", description: "As condições de armazenamento dos materiais estão adequadas?" },
                  { id: "b", description: "Existe controle e registro da manutenção dos materiais?" },
                  { id: "c", description: "Existe controle dos materiais (relação carga e cautelas)?" },
                  { id: "d", description: "Existe Identificação da OBM nos materiais?" },
                  { id: "e", description: "Bens inoperantes: se estão dando prosseguimento para o descarte do material (inservível) ou estão providenciando a manutenção necessária para voltar a operar?" }
              ]
          },
          {
              id: "1.2",
              title: "Materiais Permanentes",
              items: [
                  { id: "a", description: "As condições de armazenamento dos materiais estão adequadas?" },
                  { id: "b", description: "Existe controle e registro da manutenção dos materiais?" },
                  { id: "c", description: "Existe controle dos materiais (relação carga e cautelas)?" },
                  { id: "d", description: "Existe Identificação da OBM nos materiais?" }
              ]
          },
          {
              id: "1.3",
              title: "Materiais de Consumo",
              items: [
                  { id: "a", description: "O SISCOM (controle de estoque) está sendo atualizado corretamente?" },
                  { id: "b", description: "A Transferência, Aquisição ou Perda de material foram comunicados via SEI ao EMG (BM4)?" }
              ]
          },
          {
              id: "1.4",
              title: "Uniformes e EPI",
              items: [
                  { id: "a", description: "Lançamento dos EPI que estão sendo fornecidos aos militares de forma individual na no sistema DGP?" },
                  { id: "b", description: "Recolhimento dos EPI dos militares q passaram pra a reserva remunerada?" },
                  { id: "c", description: "O cadastro das medidas antropométricas dos militares está atualizada?" },
                  { id: "d", description: "Está atualizado o controle de fornecimento de fardamento aos Cabos e Soldados?" }
              ]
          },
          {
              id: "2.1",
              title: "Logística de Frota",
              items: [
                  { id: "a", description: "O plano de manutenção está sendo seguido (a manutenção de 1º escalão está sendo realizada e a de 2º escalão em diante está sendo solicitada?" },
                  { id: "b", description: "Há ficha de acidentes nas viaturas?" },
                  { id: "c", description: "Correto preenchimento e atualização do check-list das vtrs (conferência da vtr e material)?" },
                  { id: "d", description: "O sistema SISGEO está sendo preenchido (controle e manutenção)?" },
                  { id: "e", description: "Existe controle de validade das carteiras de habilitação dos condutores e operadores de viaturas/aeronaves/embarcações?" },
                  { id: "f", description: "Existe controle de cursos dos condutores e operadores de viaturas/aeronaves/embarcações?" },
                  { id: "g", description: "Informações do SISGEO estão de acordo e atualizadas?" }
              ]
          },
          {
              id: "3.1", 
              title: "Logística de Bens Imóveis",
              items: [
                  { id: "a", description: "O estado de conservação da iluminação?" },
                  { id: "b", description: "O estado de conservação do mobiliário?" },
                  { id: "c", description: "O estado de conservação dos condicionadores de ar?" },
                  { id: "d", description: "Alocação/empenho dos materiais administrativos fornecidos (ar-condicionado, mobília, TV, etc)?" },
                  { id: "e", description: "Possui o Plano Diretor da OBM (PDOBM) atualizado, que reflete todas as necessidades de infraestrutura da unidade?" }
              ]
          },
          {
              id: "4.1",
              title: "Logística da Unidade de Alimentação e Nutrição",
              items: [
                  { id: "a", description: "A edificação está em boas condições de conservação (piso, teto, paredes sem rachaduras, buracos, frestas) sem sinais de mofo?" },
                  { id: "b", description: "As paredes são revestidas de material lavável, impermeável e de fácil higienização?" },
                  { id: "c", description: "As áreas estão em boas condições de higiene e limpeza?" },
                  { id: "d", description: "Há telas milimétricas nas janelas e saídas dos exaustores?" },
                  { id: "e", description: "Há protetores nas soleiras das portas?" },
                  { id: "f", description: "Os equipamentos estão em bom estado de conservação e em boas condições de uso?" },
                  { id: "g", description: "Há equipamentos sem uso ou inservíveis na UAN (descarregar, se possível)?" },
                  { id: "h", description: "Há ventilação natural, ar condicionado ou exaustores para renovação do ar e conforto térmico?" },
                  { id: "i", description: "Há pias com torneiras exclusivas para lavagem das mãos nas cozinhas e nos refeitórios?" },
                  { id: "j", description: "Há saboneteiras com sabonete líquido antiséptico e papeleiras com papel não reciclado?" },
                  { id: "k", description: "Há lixeiras com pedal na cozinha e em demais áreas, forradas com sacos plásticos?" },
                  { id: "l", description: "A área está organizada, sem caixas de papelão ou de madeira (alimentos perecíveis devem ser acondicionados em recipientes plásticos, preferencialmente)?" },
                  { id: "m", description: "As carnes são descongeladas adequadamente (sob refrigeração)?" },
                  { id: "n", description: "Há controle da validade das mercadorias com o sistema PVPS (primeiro que vence, primeiro que sai)?" },
                  { id: "o", description: "O pré-preparo dos alimentos (corte de carnes, descascamento e fracionamento de hortaliças e frutas e demais etapas anteriores a cocção) é feito em área específica?" },
                  { id: "p", description: "Os alimentos prontos ficam em espera em estufa ou balcão térmico?" }
              ]
          },
          {
              id: "4.2",
              title: "Condições Higiênico-Sanitárias",
              items: [
                  { id: "a", description: "No caso de Unidades que servem quentinhas (ex: guarda-vidas), existe a presença de hot box boas e em condições de conservação e higiene?" },
                  { id: "b", description: "Há desinsetização e desratização periódica da uan (ver certificado)?" },
                  { id: "c", description: "Há cardápio semanal disponível para consulta?" },
                  { id: "d", description: "Todos os militares que manipulam alimentos estão APTOS em inspeção de saúde?" },
                  { id: "e", description: "Possui Laudo de análise química e biológica da água, na validade e afixado em local disponível para conferência?" }
              ]
          }
      ]
  },
  {
      section: "B/5",
      title: "SST",
      subsections: [
          {
              id: "1.1",
              title: "Estrutura Material da SST",
              items: [
                  { id: "a", description: "Existência de computadores para atender a demanda da seção?" },
                  { id: "b", description: "Viatura exclusiva para atendimento da demanda da seção?" },
                  { id: "c", description: "Rede de acesso à internet?" },
                  { id: "d", description: "Existência de acessórios e impressoras para atender a demanda da seção?" },
                  { id: "e", description: "Material para análise e vistorias" }
              ]
          },
          {
              id: "1.2",
              title: "Estrutura Física da SST",
              items: [
                  { id: "a", description: "Acesso" },
                  { id: "b", description: "Acomodações" },
                  { id: "c", description: "Comodidades" }
              ]
          },
          {
              id: "1.3",
              title: "Estrutura de Pessoal da SST",
              items: [
                  { id: "a", description: "Login individualizado e atualizado nos sistemas Web de Análise, Emolumentos e Controle de Fiscalização para os militares da SST?" },
                  { id: "b", description: "Conhecimento e acesso à Legislação de Segurança Contra Incêndio e Pânico?" },
                  { id: "c", description: "Oficiais com especialização ou graduação de interesse (CEPrevI/Engenharia/Arquitetura)?" },
                  { id: "d", description: "Efetivo compatível com a demanda?" }
              ]
          },
          {
              id: "2.1",
              title: "Processos e Procedimentos Gerais",
              items: [
                  { id: "a", description: "Controle de Notas?" },
                  { id: "b", description: "Arquivo físico de processos?" },
                  { id: "c", description: "Montagem de banco de dados e ativação do ciclo operacional pelas SOp/SST?" },
                  { id: "d", description: "A seção adota procedimentos e ou tecnologias inovadoras com vistas a melhoria do planejamento, organização e controle dos processos?" }
              ]
          },
          {
              id: "2.2",
              title: "Análise",
              items: [
                  { id: "a", description: "Controle de prazos de tramitação no sistema Web de análise de processos? A análise deve respeitar a ordem cronológica e/ou de complexidade." },
                  { id: "b", description: "Atualização contínua dos documentos (Certificado de Aprovação, Laudo de Exigências, Despachos Deferidos e Indeferidos e Autorizações) e status dos processos?" },
                  { id: "c", description: "Controle de Folhas Especiais (arquivamento, quantitativo e relação de documentação expedida com cada folha)?" },
                  { id: "d", description: "Estatística mensal dos documentos de regularização expedidos no ano anterior e no ano corrente até o mês anterior à inspeção (Certificados de Aprovação, Laudos de Exigências, etc)?" }
              ]
          },
          {
              id: "2.3",
              title: "Fiscalização",
              items: [
                  { id: "a", description: "Acompanhamento dos prazos e continuidade dos processos de fiscalização?" },
                  { id: "b", description: "Atualização do sistema de controle de fiscalização?" },
                  { id: "c", description: "Lançamento imediato de Auto de Infração no Sistema emolumentos para gerar o DAEM de multa?" },
                  { id: "d", description: "Comunicação das Interdições aos órgãos cabíveis (DGST, PCERJ, PMERJ, MPERJ e Prefeitura)?" },
                  { id: "e", description: "Controle das denúncias recebidas (entrada, processamento e respostas)?" },
                  { id: "f", description: "Formatação do processo administrativo eletrônico (documentos anexados com a sua respectiva nomenclatura e em ordem cronológica dos fatos)?" },
                  { id: "g", description: "Estatística mensal dos documentos de fiscalização expedidos no ano anterior e no ano corrente até o mês anterior à inspeção (Notificação, Auto de Infração, etc)?" }
              ]
          },
          {
              id: "2.4",
              title: "Atendimento da Taxa de Incêndio",
              items: [
                  { id: "a", description: "Relação dos militares pertencentes ao atendimento da taxa de incêndio atualizada junto ao FUNESBOM?" },
                  { id: "b", description: "Controle da remessa mensal, ao FUNESBOM, da estatística de atendimento da taxa de incêndio (conforme Nota FUNESBOM 040, publicada no Boletim SEDEC/CBMERJ)?" },
                  { id: "c", description: "Controle de protocolo e remessa dos requerimentos referentes às solicitações da taxa de incêndio ao FUNESBOM, atendendo o prazo de 10 (dez) dias?" },
                  { id: "d", description: "Acesso às normas e solicitações relativas à taxa de incêndio?" },
                  { id: "e", description: "Capacitação dos militares para atendimento ao público (conforme Nota FUNESBOM 033/2021, publicada no Boletim SEDEC/CBMERJ 104 de 07/06/2021)?" }
              ]
          }
      ]
  },
  {
      section: "B/6",
      title: "SAÚDE",
      subsections: [
          {
              id: "1.1",
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
              id: "2.1",
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
          },
          {
              id: "3.1",
              title: "Mapa de Eventos",
              items: [
                  { id: "a", description: "Planilha de atendimentos da OBM por Tipo de Evento - SISGEO" },
                  { id: "b", description: "Mancha termal dos eventos de trânsito da OBM" },
                  { id: "c", description: "Identificação de eventos clínicos preveníveis" }
              ]
          },
          {
              id: "4.1",
              title: "Postos Médicos e APH",
              items: [
                  { id: "a", description: "Estrutura física (espaço dedicado e climatizado, computador e acesso a internet)" },
                  { id: "b", description: "Almoxarifado posto médico - as condições de armazenamento e quantitativo dos insumos estão adequados?" },
                  { id: "c", description: "Almoxarifado APH - as condições de armazenamento e quantitativo dos insumos estão adequados?" }
              ]
          }
      ]
  },
  {
      section: "B/7",
      title: "ODONTOLOGIA",
      subsections: [
          {
              id: "1.1",
              title: "Estrutura Física",
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
              id: "1.2",
              title: "Administrativo",
              items: [
                  { id: "a", description: "Os assentamentos dos militares da odontologia estão atualizados e devidamente assinados por autoridade competente? (Serão verificados, por amostragem, as folhas de alterações)" },
                  { id: "b", description: "Há livro de ordens em vigor, físico ou digital, com as devidas publicações?" },
                  { id: "c", description: "Relatório atualizado de bens patrimoniais" },
                  { id: "d", description: "Boletim interno atualizado, se aplicável" },
                  { id: "e", description: "Disponibilização da escala de expediente em local acessível da unidade" }
              ]
          },
          {
              id: "1.3",
              title: "Controle de Pessoal",
              items: [
                  { id: "a", description: "Controle de afastamentos por licenças e dispensas dos militares da Odontoclínica/UAO" },
                  { id: "b", description: "Controle de férias dos militares da Odontoclínica/UAO" },
                  { id: "c", description: "Atualização Mensal dos dados que constam do Plano de Chamada no Sistema DGP" },
                  { id: "d", description: "Atualização do Mapa da força da Odontoclínica/UAO" }
              ]
          },
          {
              id: "2.1",
              title: "Técnico - Operacional",
              items: [
                  { id: "a", description: "Efetivo – Verificar se o efetivo é suficiente, excedente ou deficiente para a demanda e número de consultórios da Unidade" },
                  { id: "b", description: "Correto lançamento dos registros de atendimentos odontológicos no Prontuário eletrônico (agenda, status de agendamento dos pacientes, procedimentos)" },
                  { id: "c", description: "Disponibilidade de Agenda física / eletrônica" },
                  { id: "d", description: "Planilha de controle de encaminhamentos de pacientes indicados e/ou de regulação para as diversas especialidades" },
                  { id: "e", description: "Equipamentos – Se estão em bom estado e funcionando satisfatoriamente. (Detalhar em observações se falta algum equipamento, se estão obsoletos ou necessitando de manutenção)" },
                  { id: "f", description: "Registro de manutenção preventiva e corretiva dos equipamentos (Livro de alterações/acompanhamento)" },
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