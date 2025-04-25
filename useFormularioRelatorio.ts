'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

// Tipos para os dados do formulário
interface CandidatoFormData {
  nome: string;
  cargo_pretendido: string;
  data_entrevista: string;
  idade: string;
  onde_nasceu: string;
  onde_cresceu: string;
  com_quem_mora: string;
}

interface ValoresFormData {
  destaque_tecnico: string;
  ama_servir: string;
  ama_estudar: string;
  entrega_resultados: string;
  tem_sonhos_reais: string;
  tem_empatia: string;
  sensatez_posicionamentos: string;
}

interface RelatorioFormData {
  candidato: CandidatoFormData;
  valores: ValoresFormData;
  parecer_headhunter: string;
}

export default function FormularioRelatorio() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dados-pessoais');
  const [formData, setFormData] = useState<RelatorioFormData>({
    candidato: {
      nome: '',
      cargo_pretendido: '',
      data_entrevista: new Date().toISOString().split('T')[0],
      idade: '',
      onde_nasceu: '',
      onde_cresceu: '',
      com_quem_mora: '',
    },
    valores: {
      destaque_tecnico: '',
      ama_servir: '',
      ama_estudar: '',
      entrega_resultados: '',
      tem_sonhos_reais: '',
      tem_empatia: '',
      sensatez_posicionamentos: '',
    },
    parecer_headhunter: '',
  });
  const [relatorioGerado, setRelatorioGerado] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Função para atualizar os dados do candidato
  const handleCandidatoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      candidato: {
        ...formData.candidato,
        [id]: value,
      },
    });
  };

  // Função para atualizar os valores da empresa
  const handleValoresChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      valores: {
        ...formData.valores,
        [id]: value,
      },
    });
  };

  // Função para atualizar o parecer da head hunter
  const handleParecerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      parecer_headhunter: e.target.value,
    });
  };

  // Validação do formulário
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validar dados do candidato
    if (!formData.candidato.nome.trim()) {
      newErrors.nome = 'O nome do candidato é obrigatório';
    }

    // Validar valores da empresa (pelo menos um deve estar preenchido)
    const valoresPreenchidos = Object.values(formData.valores).some(valor => valor.trim() !== '');
    if (!valoresPreenchidos) {
      newErrors.valores = 'Pelo menos um valor da empresa deve ser preenchido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Função para gerar o relatório
  const gerarRelatorio = (): string => {
    let relatorio = `# RELATÓRIO DE PERFIL DE CANDIDATO\n\n`;
    
    // Dados Pessoais
    relatorio += `## Dados Pessoais\n`;
    relatorio += `${formData.candidato.nome}\n`;
    if (formData.candidato.cargo_pretendido) {
      relatorio += `${formData.candidato.cargo_pretendido}\n`;
    }
    if (formData.candidato.data_entrevista) {
      relatorio += `${formData.candidato.data_entrevista}\n`;
    }
    relatorio += `\n`;
    
    // Valores da empresa
    if (formData.valores.destaque_tecnico) {
      relatorio += `## Destaque Técnico\n${formData.valores.destaque_tecnico}\n\n`;
    }
    
    if (formData.valores.ama_servir) {
      relatorio += `## Ama Servir\n${formData.valores.ama_servir}\n\n`;
    }
    
    if (formData.valores.ama_estudar) {
      relatorio += `## Ama Estudar\n${formData.valores.ama_estudar}\n\n`;
    }
    
    if (formData.valores.entrega_resultados) {
      relatorio += `## Entrega Resultados\n${formData.valores.entrega_resultados}\n\n`;
    }
    
    if (formData.valores.tem_sonhos_reais) {
      relatorio += `## Tem Sonhos Reais\n${formData.valores.tem_sonhos_reais}\n\n`;
    }
    
    if (formData.valores.tem_empatia) {
      relatorio += `## Tem Empatia / Tem Mentalidade de Aprendiz\n${formData.valores.tem_empatia}\n\n`;
    }
    
    if (formData.valores.sensatez_posicionamentos) {
      relatorio += `## Sensatez nos Posicionamentos\n${formData.valores.sensatez_posicionamentos}\n\n`;
    }
    
    // Parecer da Head Hunter
    relatorio += `## Parecer da Head Hunter\n`;
    
    // Informações pessoais
    let infoPessoal = "";
    if (formData.candidato.idade) {
      infoPessoal += `${formData.candidato.nome.split(' ')[0]} tem ${formData.candidato.idade} anos`;
    }
    
    if (formData.candidato.onde_nasceu) {
      if (infoPessoal) {
        infoPessoal += `, nasceu em ${formData.candidato.onde_nasceu}`;
      } else {
        infoPessoal += `${formData.candidato.nome.split(' ')[0]} nasceu em ${formData.candidato.onde_nasceu}`;
      }
    }
    
    if (formData.candidato.onde_cresceu) {
      if (infoPessoal) {
        infoPessoal += ` e cresceu em ${formData.candidato.onde_cresceu}`;
      } else {
        infoPessoal += `${formData.candidato.nome.split(' ')[0]} cresceu em ${formData.candidato.onde_cresceu}`;
      }
    }
    
    if (formData.candidato.com_quem_mora) {
      if (infoPessoal) {
        infoPessoal += `. Atualmente mora com ${formData.candidato.com_quem_mora}. `;
      } else {
        infoPessoal += `${formData.candidato.nome.split(' ')[0]} mora com ${formData.candidato.com_quem_mora}. `;
      }
    } else if (infoPessoal) {
      infoPessoal += ". ";
    }
    
    relatorio += infoPessoal + formData.parecer_headhunter;
    
    return relatorio;
  };

  // Função para verificar palavras proibidas
  const verificarPalavrasProibidas = (texto: string): string[] => {
    const palavrasProibidas = ['trajetória sólida', 'excepcional', 'excelente', 'extraordinário'];
    const encontradas: string[] = [];
    
    palavrasProibidas.forEach(palavra => {
      if (texto.toLowerCase().includes(palavra.toLowerCase())) {
        encontradas.push(palavra);
      }
    });
    
    return encontradas;
  };

  // Função para salvar o relatório
  const salvarRelatorio = async () => {
    if (!validateForm()) {
      setActiveTab('dados-pessoais');
      return;
    }
    
    // Verificar palavras proibidas em todo o texto
    const textoCompleto = Object.values(formData.valores).join(' ') + ' ' + formData.parecer_headhunter;
    const palavrasProibidas = verificarPalavrasProibidas(textoCompleto);
    
    if (palavrasProibidas.length > 0) {
      alert(`Atenção: O relatório contém palavras que devem ser evitadas: ${palavrasProibidas.join(', ')}`);
      return;
    }
    
    // Gerar o relatório completo
    const relatorioTexto = gerarRelatorio();
    setRelatorioGerado(relatorioTexto);
    
    // Aqui seria feita a chamada à API para salvar o relatório
    // Por enquanto, apenas simulamos o salvamento
    alert('Relatório gerado com sucesso!');
    
    // Redirecionar para a visualização do relatório
    setActiveTab('visualizar');
  };

  // Função para exportar o relatório como arquivo de texto
  const exportarRelatorio = () => {
    const element = document.createElement("a");
    const file = new Blob([relatorioGerado], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `Relatorio_${formData.candidato.nome.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Função para copiar o relatório para a área de transferência
  const copiarRelatorio = () => {
    navigator.clipboard.writeText(relatorioGerado);
    alert('Relatório copiado para a área de transferência!');
  };

  // Efeito para gerar o relatório quando mudar para a aba de visualização
  useEffect(() => {
    if (activeTab === 'visualizar' && formData.candidato.nome) {
      setRelatorioGerado(gerarRelatorio());
    }
  }, [activeTab]);

  return {
    activeTab,
    setActiveTab,
    formData,
    handleCandidatoChange,
    handleValoresChange,
    handleParecerChange,
    errors,
    relatorioGerado,
    salvarRelatorio,
    exportarRelatorio,
    copiarRelatorio
  };
}
