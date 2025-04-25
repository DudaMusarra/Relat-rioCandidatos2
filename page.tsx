'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import useRelatorios from '@/hooks/useRelatorios';

export default function Relatorios() {
  const { relatorios, carregando, erro, buscarRelatorios, excluirRelatorio } = useRelatorios();
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const handleExcluir = async (id: number) => {
    if (confirmDelete === id) {
      await excluirRelatorio(id);
      setConfirmDelete(null);
    } else {
      setConfirmDelete(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Relatórios Salvos</h1>
        <Link 
          href="/"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Voltar para Início
        </Link>
      </div>

      {erro && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">{erro}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800">Relatórios de Candidatos</h2>
          <p className="text-sm text-gray-600">Visualize, edite ou exporte relatórios anteriormente salvos.</p>
        </div>
        
        {carregando ? (
          <div className="p-6 text-center">
            <p className="text-gray-500">Carregando relatórios...</p>
          </div>
        ) : (
          <>
            {relatorios.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nome do Candidato
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cargo Pretendido
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data da Entrevista
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {relatorios.map((relatorio) => (
                      <tr key={relatorio.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{relatorio.nome}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{relatorio.cargo}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{relatorio.data}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <Link 
                            href={`/relatorios/${relatorio.id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Visualizar
                          </Link>
                          <Link 
                            href={`/relatorios/${relatorio.id}/editar`}
                            className="text-green-600 hover:text-green-900"
                          >
                            Editar
                          </Link>
                          <button 
                            onClick={() => handleExcluir(relatorio.id)}
                            className={`${
                              confirmDelete === relatorio.id 
                                ? "text-red-800 font-bold" 
                                : "text-red-600 hover:text-red-900"
                            }`}
                          >
                            {confirmDelete === relatorio.id ? "Confirmar" : "Excluir"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-6 text-center">
                <p className="text-gray-500">Nenhum relatório encontrado.</p>
              </div>
            )}
          </>
        )}
        
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between">
          <Link 
            href="/novo-relatorio"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Criar Novo Relatório
          </Link>
          <button
            onClick={() => buscarRelatorios()}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition-colors"
          >
            Atualizar Lista
          </button>
        </div>
      </div>
    </div>
  );
}
