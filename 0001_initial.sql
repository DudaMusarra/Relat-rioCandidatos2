-- Migration number: 0001 	 2025-04-25
DROP TABLE IF EXISTS candidatos;
DROP TABLE IF EXISTS relatorios;

CREATE TABLE IF NOT EXISTS candidatos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  cargo_pretendido TEXT,
  data_entrevista TEXT,
  idade TEXT,
  onde_nasceu TEXT,
  onde_cresceu TEXT,
  com_quem_mora TEXT,
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS relatorios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  candidato_id INTEGER NOT NULL,
  destaque_tecnico TEXT,
  ama_servir TEXT,
  ama_estudar TEXT,
  entrega_resultados TEXT,
  tem_sonhos_reais TEXT,
  tem_empatia TEXT,
  sensatez_posicionamentos TEXT,
  parecer_headhunter TEXT,
  relatorio_completo TEXT,
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (candidato_id) REFERENCES candidatos(id) ON DELETE CASCADE
);

-- Criar índices
CREATE INDEX idx_candidatos_nome ON candidatos(nome);
CREATE INDEX idx_relatorios_candidato_id ON relatorios(candidato_id);
