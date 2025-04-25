// src/lib/database.ts
// Versão simplificada para testes sem dependência do Cloudflare

// Interfaces para os modelos de dados
export interface Candidato {
  id?: number;
  nome: string;
  cargo_pretendido: string;
  data_entrevista: string;
  idade: string;
  onde_nasceu: string;
  onde_cresceu: string;
  com_quem_mora: string;
  criado_em?: string;
}

export interface Relatorio {
  id?: number;
  candidato_id: number;
  destaque_tecnico: string;
  ama_servir: string;
  ama_estudar: string;
  entrega_resultados: string;
  tem_sonhos_reais: string;
  tem_empatia: string;
  sensatez_posicionamentos: string;
  parecer_headhunter: string;
  relatorio_completo: string;
  criado_em?: string;
  atualizado_em?: string;
}

export interface RelatorioCompleto {
  candidato: Candidato;
  relatorio: Relatorio;
}

// Dados simulados para testes
const candidatosSimulados: Candidato[] = [
  {
    id: 1,
    nome: "Ana Silva",
    cargo_pretendido: "Desenvolvedora Full Stack",
    data_entrevista: "2025-04-25",
    idade: "28",
    onde_nasceu: "São Paulo, SP",
    onde_cresceu: "Campinas, SP",
    com_quem_mora: "esposo e um cachorro",
    criado_em: "2025-04-25T14:30:00Z"
  },
  {
    id: 2,
    nome: "Carlos Oliveira",
    cargo_pretendido: "Product Manager",
    data_entrevista: "2025-04-24",
    idade: "32",
    onde_nasceu: "Rio de Janeiro, RJ",
    onde_cresceu: "Rio de Janeiro, RJ",
    com_quem_mora: "sozinho",
    criado_em: "2025-04-24T10:15:00Z"
  },
  {
    id: 3,
    nome: "Mariana Santos",
    cargo_pretendido: "UX Designer",
    data_entrevista: "2025-04-23",
    idade: "26",
    onde_nasceu: "Belo Horizonte, MG",
    onde_cresceu: "São Paulo, SP",
    com_quem_mora: "dois amigos",
    criado_em: "2025-04-23T16:45:00Z"
  }
];

const relatoriosSimulados: Relatorio[] = [
  {
    id: 1,
    candidato_id: 1,
    destaque_tecnico: "Ana possui formação em Ciência da Computação pela USP, com especialização em desenvolvimento web. Trabalha com programação há 6 anos, tendo experiência com React, Node.js, Python e bancos de dados SQL e NoSQL. Participou de projetos de grande porte, incluindo o desenvolvimento de um sistema de gestão financeira utilizado por mais de 50 mil usuários. Demonstra conhecimento em arquitetura de software e práticas de desenvolvimento ágil.",
    ama_servir: "Durante a entrevista, Ana mencionou sua participação como mentora em programas de capacitação para iniciantes em programação. Dedica 4 horas semanais para ajudar pessoas em início de carreira, oferecendo orientação técnica e de carreira. Em seu último emprego, criou documentações detalhadas para facilitar a integração de novos membros à equipe. Também contribui com projetos open source, tendo mais de 30 pull requests aceitos em repositórios populares no GitHub.",
    ama_estudar: "Ana mantém uma rotina de estudos constante, dedicando pelo menos 1 hora por dia para aprender novas tecnologias. Concluiu 12 cursos online nos últimos dois anos, incluindo certificações em AWS e Google Cloud. Participa mensalmente de meetups e conferências de tecnologia. Mantém um blog técnico onde compartilha aprendizados e soluções para problemas de desenvolvimento. Recentemente iniciou estudos em inteligência artificial e machine learning para expandir seu conjunto de habilidades.",
    entrega_resultados: "Em seu último projeto, Ana liderou a migração de um sistema legado para uma arquitetura moderna, reduzindo o tempo de carregamento em 70% e aumentando a taxa de conversão em 15%. Implementou testes automatizados que diminuíram os bugs em produção em 40%. Otimizou consultas de banco de dados que resultaram em economia de 30% nos custos de infraestrutura. Cumpriu todos os prazos estabelecidos nos últimos 10 sprints, mesmo com demandas variáveis.",
    tem_sonhos_reais: "Ana expressou o desejo de se tornar uma arquiteta de software nos próximos 5 anos. Planeja aprofundar seus conhecimentos em sistemas distribuídos e escalabilidade. Tem interesse em eventualmente liderar uma equipe de desenvolvimento, aplicando práticas que aprendeu ao longo de sua carreira. Busca trabalhar em projetos que tenham impacto social positivo. Seus objetivos são específicos e alinhados com sua trajetória profissional até o momento.",
    tem_empatia: "Durante dinâmicas em grupo, Ana demonstrou capacidade de ouvir atentamente os colegas antes de expressar suas opiniões. Quando recebeu feedback sobre pontos de melhoria em seu código, mostrou-se aberta e fez perguntas para entender melhor as sugestões. Relatou situações em que mudou de abordagem após ouvir perspectivas diferentes da equipe. Mencionou que aprende tanto com erros quanto com acertos e valoriza a diversidade de pensamento nas equipes que participa.",
    sensatez_posicionamentos: "Ana apresentou argumentos baseados em dados ao discutir escolhas tecnológicas. Quando questionada sobre situações de conflito, descreveu como buscou entender os diferentes pontos de vista antes de propor soluções. Demonstrou capacidade de avaliar prós e contras de diferentes abordagens técnicas, considerando fatores como manutenibilidade, escalabilidade e prazos. Em discussões técnicas, manteve postura equilibrada mesmo quando suas ideias foram contestadas.",
    parecer_headhunter: "Durante a entrevista, Ana demonstrou comunicação clara e objetiva, articulando bem suas experiências e conhecimentos técnicos. Manteve contato visual apropriado e postura corporal que transmitiu confiança sem arrogância. Respondeu a perguntas técnicas com precisão e admitiu quando não sabia algo, propondo formas de buscar a resposta. Sua energia foi constante durante toda a entrevista, mostrando entusiasmo genuíno pela oportunidade. Fez perguntas relevantes sobre a cultura da empresa e os desafios técnicos do cargo. Demonstrou alinhamento com os valores da empresa, especialmente no que se refere à colaboração e aprendizado contínuo.",
    relatorio_completo: "",
    criado_em: "2025-04-25T14:30:00Z",
    atualizado_em: "2025-04-25T14:30:00Z"
  },
  {
    id: 2,
    candidato_id: 2,
    destaque_tecnico: "Carlos tem formação em Administração de Empresas com MBA em Gestão de Produtos Digitais. Possui 8 anos de experiência em gestão de produtos, tendo trabalhado em empresas de tecnologia de diferentes portes. Demonstra conhecimento sólido em metodologias ágeis, design thinking e técnicas de priorização de backlog. Tem experiência com ferramentas como Jira, Trello, Figma e Google Analytics.",
    ama_servir: "Carlos relatou como implementou um programa de feedback contínuo em sua equipe atual, dedicando tempo semanalmente para ouvir as necessidades dos desenvolvedores e designers. Criou documentação detalhada de processos que ajudou a reduzir o tempo de onboarding de novos membros da equipe em 40%. Participa de um programa de mentoria para jovens interessados em gestão de produtos.",
    ama_estudar: "Mantém-se atualizado através de cursos, podcasts e livros sobre gestão de produtos e tendências de mercado. Concluiu recentemente uma certificação em Product Management pela Product School. Participa ativamente de comunidades online de product managers e frequenta eventos do setor. Está estudando análise de dados para aprimorar suas habilidades de tomada de decisão baseada em dados.",
    entrega_resultados: "Em seu último projeto, liderou o lançamento de um novo produto que atingiu 30% acima da meta de aquisição de usuários no primeiro trimestre. Implementou um processo de discovery que reduziu o tempo de validação de hipóteses em 50%. Otimizou o funil de conversão, resultando em um aumento de 25% na taxa de retenção de usuários. Conseguiu reduzir o ciclo de desenvolvimento de novas funcionalidades de 3 semanas para 10 dias.",
    tem_sonhos_reais: "Carlos deseja se tornar um Head of Product nos próximos 3 anos. Planeja especializar-se em produtos B2B SaaS e tem interesse em eventualmente trabalhar com produtos de impacto social. Busca expandir sua experiência internacional, possivelmente liderando equipes remotas globais. Seus objetivos são bem estruturados e baseados em sua trajetória atual.",
    tem_empatia: "Durante dinâmicas de grupo, demonstrou habilidade em mediar conflitos e encontrar soluções que atendessem às necessidades de diferentes stakeholders. Relatou como mudou sua abordagem de comunicação após receber feedback de que suas mensagens eram muito diretas para alguns membros da equipe. Mostrou-se aberto a diferentes perspectivas e valoriza a diversidade de pensamento em suas equipes.",
    sensatez_posicionamentos: "Apresentou uma visão equilibrada sobre trade-offs em decisões de produto, considerando tanto aspectos técnicos quanto de negócio. Quando questionado sobre falhas em projetos anteriores, demonstrou maturidade ao assumir responsabilidade e compartilhar aprendizados. Baseou suas opiniões em dados e experiências concretas, evitando generalizações.",
    parecer_headhunter: "Carlos demonstrou excelente capacidade de comunicação e articulação de ideias complexas de forma clara. Manteve uma postura profissional e engajada durante toda a entrevista. Respondeu às perguntas com exemplos concretos de sua experiência, demonstrando consistência em sua trajetória. Fez perguntas pertinentes sobre a cultura da empresa e os desafios do produto, mostrando interesse genuíno na posição. Sua experiência anterior alinha-se bem com as necessidades da vaga, e sua abordagem orientada a dados complementa nosso foco em decisões baseadas em métricas.",
    relatorio_completo: "",
    criado_em: "2025-04-24T10:15:00Z",
    atualizado_em: "2025-04-24T10:15:00Z"
  },
  {
    id: 3,
    candidato_id: 3,
    destaque_tecnico: "Mariana é formada em Design Digital com especialização em UX/UI. Possui 4 anos de experiência trabalhando com design de interfaces para aplicativos móveis e web. Tem conhecimento avançado em ferramentas como Figma, Adobe XD, Sketch e Principle. Demonstra compreensão de princípios de acessibilidade e design responsivo. Tem experiência com pesquisa de usuários e testes de usabilidade.",
    ama_servir: "Mariana compartilhou como criou um kit de componentes reutilizáveis que ajudou sua equipe atual a reduzir o tempo de design em 30%. Organizou workshops internos para ensinar conceitos de UX para desenvolvedores e product managers. Participa de um grupo que oferece mentoria gratuita para estudantes de design. Sempre se disponibiliza para revisar o trabalho de colegas e oferecer feedback construtivo.",
    ama_estudar: "Mantém um hábito de estudar novas tendências e ferramentas de design regularmente. Concluiu cursos de Design Systems e Acessibilidade Digital no último ano. Participa ativamente de comunidades de design como Behance e Dribbble, onde também compartilha seus projetos pessoais. Está aprendendo programação front-end para melhorar a comunicação com desenvolvedores.",
    entrega_resultados: "Redesenhou a interface principal de um aplicativo, resultando em aumento de 40% no tempo médio de sessão e redução de 25% na taxa de abandono. Implementou um processo de design sprint que reduziu o tempo de ideação e prototipagem de 3 semanas para 5 dias. Suas melhorias de usabilidade em um formulário de checkout aumentaram a taxa de conversão em 18%. Criou um design system que garantiu consistência visual em todos os produtos da empresa.",
    tem_sonhos_reais: "Mariana deseja se especializar em design de experiências para produtos de saúde e bem-estar. Planeja aprofundar seus conhecimentos em pesquisa com usuários e design centrado no ser humano. Tem interesse em eventualmente liderar uma equipe de design. Seus objetivos são específicos e conectados com sua paixão por criar interfaces que impactem positivamente a vida das pessoas.",
    tem_empatia: "Durante exercícios de grupo, demonstrou grande capacidade de ouvir e incorporar ideias de outras pessoas. Relatou como mudou completamente uma proposta de design após entender melhor as necessidades dos usuários através de pesquisas. Mostrou-se aberta a críticas e disposta a iterar em suas soluções com base em feedback. Valoriza a colaboração multidisciplinar e busca entender as limitações técnicas antes de propor designs.",
    sensatez_posicionamentos: "Apresentou argumentos bem fundamentados para suas decisões de design, baseados em princípios de usabilidade e dados de pesquisa com usuários. Quando questionada sobre conflitos entre estética e funcionalidade, demonstrou uma abordagem equilibrada, priorizando a experiência do usuário sem comprometer a identidade visual. Mostrou maturidade ao discutir limitações de suas propostas anteriores.",
    parecer_headhunter: "Mariana demonstrou grande entusiasmo e paixão por design durante toda a entrevista. Sua comunicação foi clara e articulada, especialmente ao explicar conceitos técnicos de forma acessível. Apresentou um portfólio impressionante com casos bem documentados, incluindo o problema, processo e resultados. Fez perguntas pertinentes sobre o processo de design da empresa e como as decisões são tomadas. Sua abordagem centrada no usuário e habilidade de colaborar com diferentes áreas a tornam uma candidata promissora para nossa equipe multidisciplinar.",
    relatorio_completo: "",
    criado_em: "2025-04-23T16:45:00Z",
    atualizado_em: "2025-04-23T16:45:00Z"
  }
];

// Funções simuladas para operações CRUD

// Função simulada para obter o banco de dados
export async function getDatabase() {
  // Simulação do banco de dados
  return {
    candidatos: candidatosSimulados,
    relatorios: relatoriosSimulados
  };
}

// Candidatos
export async function criarCandidato(db: any, candidato: Candidato): Promise<number> {
  const novoId = Math.max(...db.candidatos.map((c: Candidato) => c.id || 0)) + 1;
  const novoCandidato = {
    ...candidato,
    id: novoId,
    criado_em: new Date().toISOString()
  };
  
  db.candidatos.push(novoCandidato);
  return novoId;
}

export async function buscarCandidato(db: any, id: number): Promise<Candidato | null> {
  const candidato = db.candidatos.find((c: Candidato) => c.id === id);
  return candidato || null;
}

export async function listarCandidatos(db: any): Promise<Candidato[]> {
  return db.candidatos.sort((a: Candidato, b: Candidato) => {
    return new Date(b.criado_em || '').getTime() - new Date(a.criado_em || '').getTime();
  });
}

export async function atualizarCandidato(db: any, id: number, candidato: Candidato): Promise<boolean> {
  const index = db.candidatos.findIndex((c: Candidato) => c.id === id);
  if (index === -1) return false;
  
  db.candidatos[index] = {
    ...db.candidatos[index],
    ...candidato
  };
  
  return true;
}

export async function excluirCandidato(db: any, id: number): Promise<boolean> {
  const index = db.candidatos.findIndex((c: Candidato) => c.id === id);
  if (index === -1) return false;
  
  db.candidatos.splice(index, 1);
  return true;
}

// Relatórios
export async function criarRelatorio(db: any, relatorio: Relatorio): Promise<number> {
  const novoId = Math.max(...db.relatorios.map((r: Relatorio) => r.id || 0)) + 1;
  const novoRelatorio = {
    ...relatorio,
    id: novoId,
    criado_em: new Date().toISOString(),
    atualizado_em: new Date().toISOString()
  };
  
  db.relatorios.push(novoRelatorio);
  return novoId;
}

export async function buscarRelatorio(db: any, id: number): Promise<Relatorio | null> {
  const relatorio = db.relatorios.find((r: Relatorio) => r.id === id);
  return relatorio || null;
}

export async function buscarRelatorioCompleto(db: any, id: number): Promise<RelatorioCompleto | null> {
  const relatorio = await buscarRelatorio(db, id);
  
  if (!relatorio) {
    return null;
  }
  
  const candidato = await buscarCandidato(db, relatorio.candidato_id);
  
  if (!candidato) {
    return null;
  }
  
  return { candidato, relatorio };
}

export async function listarRelatorios(db: any): Promise<any[]> {
  return db.relatorios.map((r: Relatorio) => {
    const candidato = db.candidatos.find((c: Candidato) => c.id === r.candidato_id);
    return {
      id: r.id,
      nome: candidato?.nome || 'Desconhecido',
      cargo_pretendido: candidato?.cargo_pretendido || '',
      data_entrevista: candidato?.data_entrevista || '',
      criado_em: r.criado_em
    };
  }).sort((a: any, b: any) => {
    return new Date(b.criado_em || '').getTime() - new Date(a.criado_em || '').getTime();
  });
}

export async function atualizarRelatorio(db: any, id: number, relatorio: Relatorio): Promise<boolean> {
  const index = db.relatorios.findIndex((r: Relatorio) => r.id === id);
  if (index === -1) return false;
  
  db.relatorios[index] = {
    ...db.relatorios[index],
    ...relatorio,
    atualizado_em: new Date().toISOString()
  };
  
  return true;
}

export async function excluirRelatorio(db: any, id: number): Promise<boolean> {
  const index = db.relatorios.findIndex((r: Relatorio) => r.id === id);
  if (index === -1) return false;
  
  db.relatorios.splice(index, 1);
  return true;
}

// Função para salvar um relatório completo (candidato + relatório)
export async function salvarRelatorioCompleto(db: any, dados: {
  candidato: Candidato;
  valores: {
    destaque_tecnico: string;
    ama_servir: string;
    ama_estudar: string;
    entrega_resultados: string;
    tem_sonhos_reais: string;
    tem_empatia: string;
    sensatez_posicionamentos: string;
  };
  parecer_headhunter: string;
  relatorio_completo: string;
}): Promise<number> {
  try {
    // 1. Criar o candidato
    const candidatoId = await criarCandidato(db, dados.candidato);
    
    // 2. Criar o relatório
    const relatorio: Relatorio = {
      candidato_id: candidatoId,
      ...dados.valores,
      parecer_headhunter: dados.parecer_headhunter,
      relatorio_completo: dados.relatorio_completo
    };
    
    const relatorioId = await criarRelatorio(db, relatorio);
    
    return relatorioId;
  } catch (error) {
    console.error('Erro ao salvar relatório completo:', error);
    throw error;
  }
}
