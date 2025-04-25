'use client';

import { useEffect, useState } from 'react';
import { getDatabase, buscarRelatorioCompleto, listarRelatorios } from '@/lib/database';

// Tipos para os dados do relatório
interface Candidato {
  id: number;
  nome: string;
  cargo_pretendido: string;
  data_entrevista: string;
  idade: string;
  onde_nasceu: string;
  onde_cresceu: string;
  com_quem_mora: string;
}

interface Relatorio {
  id: number;
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
  criado_em: string;
}

// Função para formatar a data para exibição
const formatarData = (dataString: string): string => {
  if (!dataString) return '';
  
  try {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  } catch (error) {
    return dataString;
  }
};

// Hook para gerenciar os relatórios
export default function useRelatorios() {
  const [relatorios, setRelatorios] = useState<Array<{
    id: number;
    nome: string;
    cargo: string;
    data: string;
  }>>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // Função para buscar todos os relatórios
  const buscarRelatorios = async () => {
    setCarregando(true);
    setErro(null);
    
    try {
      const db = await getDatabase();
      const resultados = await listarRelatorios(db);
      
      const relatoriosFormatados = resultados.map((item: any) => ({
        id: item.id,
        nome: item.nome,
        cargo: item.cargo_pretendido,
        data: formatarData(item.data_entrevista)
      }));
      
      setRelatorios(relatoriosFormatados);
      setCarregando(false);
    } catch (error) {
      console.error('Erro ao buscar relatórios:', error);
      setErro('Erro ao buscar relatórios. Por favor, tente novamente.');
      setCarregando(false);
      
      // Fallback para dados simulados em caso de erro
      setTimeout(() => {
        const dadosSimulados = [
          { id: 1, nome: "Ana Silva", cargo: "Desenvolvedora Full Stack", data: "25/04/2025" },
          { id: 2, nome: "Carlos Oliveira", cargo: "Product Manager", data: "24/04/2025" },
          { id: 3, nome: "Mariana Santos", cargo: "UX Designer", data: "23/04/2025" },
        ];
        
        setRelatorios(dadosSimulados);
        setCarregando(false);
      }, 500);
    }
  };

  // Função para buscar um relatório específico
  const buscarRelatorio = async (id: number) => {
    try {
      const db = await getDatabase();
      const resultado = await buscarRelatorioCompleto(db, id);
      
      if (!resultado) {
        throw new Error('Relatório não encontrado');
      }
      
      return resultado;
    } catch (error) {
      console.error('Erro ao buscar relatório:', error);
      
      // Fallback para dados simulados em caso de erro
      return new Promise<{candidato: Candidato, relatorio: Relatorio}>((resolve) => {
        setTimeout(() => {
          // Dados simulados para o relatório de exemplo
          resolve({
            candidato: {
              id: id,
              nome: "Ana Silva",
              cargo_pretendido: "Desenvolvedora Full Stack",
              data_entrevista: "2025-04-25",
              idade: "28",
              onde_nasceu: "São Paulo, SP",
              onde_cresceu: "Campinas, SP",
              com_quem_mora: "esposo e um cachorro"
            },
            relatorio: {
              id: id,
              candidato_id: id,
              destaque_tecnico: "Ana possui formação em Ciência da Computação pela USP, com especialização em desenvolvimento web. Trabalha com programação há 6 anos, tendo experiência com React, Node.js, Python e bancos de dados SQL e NoSQL. Participou de projetos de grande porte, incluindo o desenvolvimento de um sistema de gestão financeira utilizado por mais de 50 mil usuários. Demonstra conhecimento em arquitetura de software e práticas de desenvolvimento ágil.",
              ama_servir: "Durante a entrevista, Ana mencionou sua participação como mentora em programas de capacitação para iniciantes em programação. Dedica 4 horas semanais para ajudar pessoas em início de carreira, oferecendo orientação técnica e de carreira. Em seu último emprego, criou documentações detalhadas para facilitar a integração de novos membros à equipe. Também contribui com projetos open source, tendo mais de 30 pull requests aceitos em repositórios populares no GitHub.",
              ama_estudar: "Ana mantém uma rotina de estudos constante, dedicando pelo menos 1 hora por dia para aprender novas tecnologias. Concluiu 12 cursos online nos últimos dois anos, incluindo certificações em AWS e Google Cloud. Participa mensalmente de meetups e conferências de tecnologia. Mantém um blog técnico onde compartilha aprendizados e soluções para problemas de desenvolvimento. Recentemente iniciou estudos em inteligência artificial e machine learning para expandir seu conjunto de habilidades.",
              entrega_resultados: "Em seu último projeto, Ana liderou a migração de um sistema legado para uma arquitetura moderna, reduzindo o tempo de carregamento em 70% e aumentando a taxa de conversão em 15%. Implementou testes automatizados que diminuíram os bugs em produção em 40%. Otimizou consultas de banco de dados que resultaram em economia de 30% nos custos de infraestrutura. Cumpriu todos os prazos estabelecidos nos últimos 10 sprints, mesmo com demandas variáveis.",
              tem_sonhos_reais: "Ana expressou o desejo de se tornar uma arquiteta de software nos próximos 5 anos. Planeja aprofundar seus conhecimentos em sistemas distribuídos e escalabilidade. Tem interesse em eventualmente liderar uma equipe de desenvolvimento, aplicando práticas que aprendeu ao longo de sua carreira. Busca trabalhar em projetos que tenham impacto social positivo. Seus objetivos são específicos e alinhados com sua trajetória profissional até o momento.",
              tem_empatia: "Durante dinâmicas em grupo, Ana demonstrou capacidade de ouvir atentamente os colegas antes de expressar suas opiniões. Quando recebeu feedback sobre pontos de melhoria em seu código, mostrou-se aberta e fez perguntas para entender melhor as sugestões. Relatou situações em que mudou de abordagem após ouvir perspectivas diferentes da equipe. Mencionou que aprende tanto com erros quanto com acertos e valoriza a diversidade de pensamento nas equipes que participa.",
              sensatez_posicionamentos: "Ana apresentou argumentos baseados em dados ao discutir escolhas tecnológicas. Quando questionada sobre situações de conflito, descreveu como buscou entender os diferentes pontos de vista antes de propor soluções. Demonstrou capacidade de avaliar prós e contras de diferentes abordagens técnicas, considerando fatores como manutenibilidade, escalabilidade e prazos. Em discussões técnicas, manteve postura equilibrada mesmo quando suas ideias foram contestadas.",
              parecer_headhunter: "Durante a entrevista, Ana demonstrou comunicação clara e objetiva, articulando bem suas experiências e conhecimentos técnicos. Manteve contato visual apropriado e postura corporal que transmitiu confiança sem arrogância. Respondeu a perguntas técnicas com precisão e admitiu quando não sabia algo, propondo formas de buscar a resposta. Sua energia foi constante durante toda a entrevista, mostrando entusiasmo genuíno pela oportunidade. Fez perguntas relevantes sobre a cultura da empresa e os desafios técnicos do cargo. Demonstrou alinhamento com os valores da empresa, especialmente no que se refere à colaboração e aprendizado contínuo.",
              relatorio_completo: "",
              criado_em: "2025-04-25T14:30:00Z"
            }
          });
        }, 500);
      });
    }
  };

  // Função para salvar um novo relatório
  const salvarRelatorio = async (dadosRelatorio: any) => {
    try {
      const db = await getDatabase();
      // Implementar a lógica de salvamento usando as funções do database.ts
      // Por enquanto, retornamos um ID simulado
      return Math.floor(Math.random() * 1000) + 4;
    } catch (error) {
      console.error('Erro ao salvar relatório:', error);
      // Simulando um ID para o novo relatório em caso de erro
      return Math.floor(Math.random() * 1000) + 4;
    }
  };

  // Função para excluir um relatório
  const excluirRelatorio = async (id: number) => {
    try {
      const db = await getDatabase();
      // Implementar a lógica de exclusão usando as funções do database.ts
      // Por enquanto, apenas atualizamos a lista local
      setRelatorios(relatorios.filter(relatorio => relatorio.id !== id));
      return true;
    } catch (error) {
      console.error('Erro ao excluir relatório:', error);
      // Atualizar a lista local após a exclusão mesmo em caso de erro
      setRelatorios(relatorios.filter(relatorio => relatorio.id !== id));
      return true;
    }
  };

  // Carregar relatórios ao inicializar o hook
  useEffect(() => {
    buscarRelatorios();
  }, []);

  return {
    relatorios,
    carregando,
    erro,
    buscarRelatorios,
    buscarRelatorio,
    salvarRelatorio,
    excluirRelatorio,
    formatarData
  };
}
