<template>
  <div>
    <!-- Tela inicial (sem temas) -->
    <div v-if="!mostrarTemas" class="space-y-4 flex flex-col items-center">
      <!-- Ícone acima do botão -->
      <svg
        class="w-20 h-20 text-blue-600 mb-3 mt-4"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
      </svg>

      <!-- Título grande -->
      <h3 class="text-3xl font-bold text-white mb-4 text-center">
        Escolha um Tema
      </h3>

      <!-- Texto descritivo menor e cinza -->
      <p class="text-gray-400 text-center mb-8 max-w-sm">
        Selecione um tema sugerido e deixe a IA gerar um roteiro personalizado
      </p>

      <!-- Botão para gerar temas -->
      <button
        @click="handleGerarTemas"
        :disabled="isLoading"
        class="w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <svg
          v-if="isLoading"
          class="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span>{{ isLoading ? 'Gerando...' : 'Gerar Temas' }}</span>
      </button>
    </div>

    <!-- Temas e Personalização (após clicar no botão) -->
    <div v-else class="space-y-6">
      <!-- Step 1: Seleção de Tema -->
      <div v-if="!temaSelecionado">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
            Escolha um tema:
          </h3>
          <button
            @click="handleGerarNovosTemas"
            :disabled="isLoading"
            class="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              v-if="isLoading"
              class="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>🔄 Gerar Novos Temas</span>
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            v-for="tema in temasSugeridos"
            :key="tema"
            @click="selecionarTema(tema)"
            class="p-4 text-left border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition"
          >
            <div class="font-semibold text-gray-800 dark:text-white">{{ tema }}</div>
          </button>
        </div>
      </div>

      <!-- Step 2: Personalização -->
      <div v-else>
        <div class="flex items-center gap-3 mb-6">
          <button
            @click="temaSelecionado = null"
            class="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
          >
            ← Voltar
          </button>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
            Personalizando: {{ temaSelecionado }}
          </h3>
        </div>

        <div class="space-y-4 mb-6">
          <!-- Descrição Adicional -->
          <div>
            <label for="descricao-tema" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Adicione detalhes (Opcional)
            </label>
            <textarea
              id="descricao-tema"
              v-model="descricaoAdicional"
              rows="3"
              placeholder="Ex: Foque em iniciantes, inclua exemplos práticos..."
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent dark:bg-gray-700 dark:text-white transition resize-none"
              :disabled="isLoading"
            />
          </div>

          <!-- Duração -->
          <div>
            <label for="duracao-tema" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Duração do Vídeo
            </label>
            <select
              id="duracao-tema"
              v-model="duracao"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent dark:bg-gray-700 dark:text-white transition"
              :disabled="isLoading"
            >
              <option value="3-5min">3-5 minutos</option>
              <option value="5-10min">5-10 minutos</option>
              <option value="10-15min">10-15 minutos</option>
              <option value="15-20min">15-20 minutos</option>
              <option value="20+min">20+ minutos</option>
            </select>
          </div>

          <!-- Tom -->
          <div>
            <label for="tom-tema" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tom do Vídeo
            </label>
            <select
              id="tom-tema"
              v-model="tom"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent dark:bg-gray-700 dark:text-white transition"
              :disabled="isLoading"
            >
              <option value="informal">Informal</option>
              <option value="formal">Formal</option>
              <option value="educativo">Educativo</option>
              <option value="entretenimento">Entretenimento</option>
            </select>
          </div>
        </div>

        <!-- Botão de Geração -->
        <button
          @click="handleGeracaoPorTema"
          :disabled="isLoading"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <svg
            v-if="isLoading"
            class="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>{{ isLoading ? 'Gerando...' : 'Gerar Roteiro' }}</span>
        </button>
      </div>

      <!-- Mensagens -->
      <div v-if="erro" class="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
        {{ erro }}
      </div>

      <div v-if="roteiroGerado" class="p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-lg">
        ✓ Roteiro gerado com sucesso! Confira no histórico ao lado.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const mostrarTemas = ref(false)
const temaSelecionado = ref<string | null>(null)
const descricaoAdicional = ref('')
const duracao = ref<'3-5min' | '5-10min' | '10-15min' | '15-20min' | '20+min'>('5-10min')
const tom = ref<'informal' | 'formal' | 'educativo' | 'entretenimento'>('informal')
const isLoading = ref(false)
const erro = ref<string | null>(null)
const roteiroGerado = ref(false)

const { gerar } = useGerarRoteiro()

const temasSugeridos = [
  'Como começar um blog de sucesso',
  'Dicas de produtividade',
  'Culinária rápida e fácil',
  'Introdução à programação',
  'Fotografia com smartphone',
  'Saúde e bem-estar',
  'Design e criatividade',
  'Viagem e turismo',
  'Educação e aprendizado',
  'Negócios e empreendedorismo',
  'Tecnologia e inovação',
  'Marketing digital',
]

const selecionarTema = (tema: string) => {
  temaSelecionado.value = tema
  descricaoAdicional.value = ''
}

const handleGerarTemas = async () => {
  isLoading.value = true
  // Simula o carregamento de temas
  await new Promise(resolve => setTimeout(resolve, 1000))
  mostrarTemas.value = true
  isLoading.value = false
}

const handleGerarNovosTemas = async () => {
  isLoading.value = true
  // Simula a geração de novos temas
  await new Promise(resolve => setTimeout(resolve, 1500))
  // Aqui no futuro você pode adicionar temas dinamicamente gerados pela IA
  isLoading.value = false
}

const handleGeracaoPorTema = async () => {
  if (!temaSelecionado.value || isLoading.value) return

  isLoading.value = true
  erro.value = null
  roteiroGerado.value = false

  try {
    const temaCompleto = descricaoAdicional.value
      ? `${temaSelecionado.value}. Detalhes: ${descricaoAdicional.value}`
      : temaSelecionado.value

    const resultado = await gerar(temaCompleto, {
      tom: tom.value,
      duracao: duracao.value
    })

    if (resultado) {
      roteiroGerado.value = true
      temaSelecionado.value = null
      mostrarTemas.value = false

      setTimeout(() => {
        roteiroGerado.value = false
      }, 3000)
    }
  } catch (err) {
    erro.value = 'Erro ao gerar roteiro. Tente novamente.'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}
</script>
