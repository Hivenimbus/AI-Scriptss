import type { Roteiro, ConfiguracoesRoteiro } from '~/types/roteiro'

export const useGerarRoteiro = () => {
  const roteiroStore = useRoteiroStore()
  const isLoading = ref(false)
  const erro = ref<string | null>(null)

  /**
   * Gera um roteiro baseado no tema e configurações
   * NOTA: Esta é uma implementação mock/placeholder
   * Para integração com IA real, substitua esta função
   */
  const gerar = async (tema: string, config?: Partial<ConfiguracoesRoteiro>): Promise<Roteiro | null> => {
    isLoading.value = true
    erro.value = null

    try {
      // Simula chamada à API (delay de 2 segundos)
      await new Promise(resolve => setTimeout(resolve, 2000))

      const configuracoes = {
        ...roteiroStore.configuracoes,
        ...config
      }

      // Gera um ID único
      const id = `roteiro-${Date.now()}`

      // Mock de conteúdo gerado
      const conteudo = gerarConteudoMock(tema, configuracoes)

      const novoRoteiro: Roteiro = {
        id,
        titulo: `Roteiro: ${tema}`,
        descricao: `Roteiro gerado sobre ${tema}`,
        conteudo,
        duracao: configuracoes.duracao,
        tom: configuracoes.tom,
        publicoAlvo: configuracoes.publicoAlvo || 'Público geral',
        criadoEm: new Date(),
        tags: extrairTags(tema)
      }

      // Adiciona ao store
      roteiroStore.adicionarRoteiro(novoRoteiro)

      return novoRoteiro
    } catch (err) {
      erro.value = 'Erro ao gerar roteiro. Tente novamente.'
      console.error('Erro ao gerar roteiro:', err)
      return null
    } finally {
      isLoading.value = false
    }
  }

  return {
    gerar,
    isLoading: readonly(isLoading),
    erro: readonly(erro)
  }
}

/**
 * Função auxiliar para gerar conteúdo mock
 * SUBSTITUIR quando integrar com IA real
 */
function gerarConteudoMock(tema: string, config: ConfiguracoesRoteiro): string {
  let conteudo = ''

  if (config.incluirIntroducao) {
    conteudo += `# Introdução (30s)\n`
    if (config.tom === 'informal') {
      conteudo += `E aí, galera! Hoje vamos falar sobre ${tema}!\n\n`
    } else if (config.tom === 'formal') {
      conteudo += `Olá, sejam bem-vindos. Neste vídeo, abordaremos ${tema}.\n\n`
    } else if (config.tom === 'educativo') {
      conteudo += `Olá! Hoje vamos aprender sobre ${tema} de forma clara e didática.\n\n`
    } else {
      conteudo += `Preparados para uma jornada incrível sobre ${tema}? Vamos lá!\n\n`
    }
  }

  conteudo += `# Desenvolvimento Principal\n`
  conteudo += `## Ponto 1: O que é ${tema}? (2min)\n`
  conteudo += `Vamos começar entendendo o conceito básico...\n\n`

  conteudo += `## Ponto 2: Por que ${tema} é importante? (2min)\n`
  conteudo += `Aqui explicamos a relevância do tema...\n\n`

  conteudo += `## Ponto 3: Como aplicar ${tema}? (2min)\n`
  conteudo += `Dicas práticas e exemplos reais...\n\n`

  if (config.incluirChamadaInscricao) {
    conteudo += `## Chamada para Ação (15s)\n`
    conteudo += `Se você está gostando do conteúdo, deixa aquele like e se inscreve no canal!\n\n`
  }

  if (config.incluirConclusao) {
    conteudo += `# Conclusão (30s)\n`
    if (config.tom === 'informal') {
      conteudo += `E aí, gostou? Deixa nos comentários o que você achou sobre ${tema}!`
    } else {
      conteudo += `Espero que este conteúdo sobre ${tema} tenha sido útil para você.`
    }
  }

  return conteudo
}

/**
 * Extrai tags relevantes do tema
 */
function extrairTags(tema: string): string[] {
  const palavras = tema.toLowerCase().split(' ')
  return palavras.filter(p => p.length > 3).slice(0, 5)
}
