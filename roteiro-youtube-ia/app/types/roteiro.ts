export interface Roteiro {
  id: string
  titulo: string
  descricao: string
  conteudo: string
  duracao: string
  tom: 'informal' | 'formal' | 'educativo' | 'entretenimento'
  publicoAlvo: string
  criadoEm: Date
  tags: string[]
}

export interface ConfiguracoesRoteiro {
  tom: 'informal' | 'formal' | 'educativo' | 'entretenimento'
  duracao: '3-5min' | '5-10min' | '10-15min' | '15-20min' | '20+min'
  publicoAlvo: string
  incluirIntroducao: boolean
  incluirChamadaInscricao: boolean
  incluirConclusao: boolean
}

export const EXEMPLOS_ROTEIROS: Roteiro[] = [
  {
    id: '1',
    titulo: 'Como Aprender Programação do Zero',
    descricao: 'Roteiro para iniciantes em programação',
    conteudo: `# Introdução (30s)
Olá! Se você sempre quis aprender a programar mas não sabe por onde começar, esse vídeo é para você!

# O Que É Programação? (1min)
Programação é a arte de dar instruções ao computador...

# Por Onde Começar? (2min)
1. Escolha uma linguagem (Python recomendado para iniciantes)
2. Configure seu ambiente
3. Faça tutoriais práticos

# Dicas Importantes (1min)
- Pratique todos os dias
- Construa projetos reais
- Participe de comunidades

# Conclusão (30s)
Gostou? Se inscreva no canal e ative o sininho!`,
    duracao: '5-10min',
    tom: 'educativo',
    publicoAlvo: 'iniciantes em programação',
    criadoEm: new Date('2025-01-01'),
    tags: ['programação', 'tutorial', 'iniciantes']
  },
  {
    id: '2',
    titulo: '5 Receitas Rápidas Para o Dia a Dia',
    descricao: 'Roteiro de culinária prática',
    conteudo: `# Intro Dinâmica (20s)
E aí, galera! Hoje vou mostrar 5 receitas que você pode fazer em menos de 30 minutos!

# Receita 1: Omelete Perfeita (2min)
Ingredientes e passo a passo...

# Receita 2: Macarrão Alho e Óleo (2min)
A clássica que nunca falha...

# Receita 3: Salada Completa (2min)
Nutritiva e deliciosa...

# Receita 4: Wrap de Frango (2min)
Praticidade total...

# Receita 5: Panqueca Fit (2min)
Para quem está na dieta...

# Encerramento (30s)
Deixa nos comentários qual você vai fazer primeiro! Like e se inscreve!`,
    duracao: '10-15min',
    tom: 'informal',
    publicoAlvo: 'pessoas ocupadas que gostam de cozinhar',
    criadoEm: new Date('2025-01-02'),
    tags: ['culinária', 'receitas', 'rápido']
  },
  {
    id: '3',
    titulo: 'A História da Inteligência Artificial',
    descricao: 'Documentário sobre IA',
    conteudo: `# Abertura (1min)
A inteligência artificial está transformando nosso mundo. Mas como chegamos até aqui?

# Primórdios (3min)
- Alan Turing e o Teste de Turing (1950)
- Primeiros programas de IA
- O nascimento do termo "Inteligência Artificial"

# A Primeira Era de Ouro (3min)
- Desenvolvimentos dos anos 60-70
- ELIZA e os primeiros chatbots
- Sistemas especialistas

# O Inverno da IA (2min)
- Limitações computacionais
- Promessas não cumpridas
- Redução de investimentos

# O Renascimento (3min)
- Machine Learning e Deep Learning
- Big Data e poder computacional
- Conquistas modernas

# IA Hoje e o Futuro (3min)
- ChatGPT, DALL-E, e outras ferramentas
- Implicações éticas
- O que esperar do futuro

# Conclusão (1min)
A IA é uma jornada fascinante que está apenas começando...`,
    duracao: '15-20min',
    tom: 'educativo',
    publicoAlvo: 'entusiastas de tecnologia',
    criadoEm: new Date('2025-01-03'),
    tags: ['IA', 'tecnologia', 'história', 'documentário']
  }
]
