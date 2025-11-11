<template>
  <div>
    <div class="space-y-4 flex flex-col items-center">
      <!-- Ícone acima do botão -->
      <svg
        class="w-20 h-20 text-purple-600 mb-3 mt-4"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>

      <!-- Título grande -->
      <h3 class="text-3xl font-bold text-white mb-4 text-center">
        Deixe a IA Surpreender Você!
      </h3>

      <!-- Texto descritivo menor e cinza -->
      <p class="text-gray-400 text-center mb-8 max-w-sm">
        Clique no botão abaixo e a IA escolherá um tema aleatório para você
      </p>

      <!-- Botão de Geração -->
      <button
        @click="handleGeracaoRapida"
        :disabled="isLoading"
        class="w-full max-w-sm bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
        <span>{{ isLoading ? 'Gerando...' : 'Gerar Roteiro Rápido' }}</span>
      </button>
    </div>

    <div v-if="erro" class="mt-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
      {{ erro }}
    </div>

    <div v-if="roteiroGerado" class="mt-4 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-lg">
      ✓ Roteiro gerado com sucesso! Confira no histórico ao lado.
    </div>
  </div>
</template>

<script setup lang="ts">
const roteiroStore = useRoteiroStore()
const duracao = ref<'3-5min' | '5-10min' | '10-15min' | '15-20min' | '20+min'>('5-10min')
const tom = ref<'informal' | 'formal' | 'educativo' | 'entretenimento'>('informal')
const isLoading = ref(false)
const erro = ref<string | null>(null)
const roteiroGerado = ref(false)

const { gerar } = useGerarRoteiro()

const temasAleatorios = [
  'Como começar um blog de sucesso',
  'Dicas de produtividade para home office',
  'As melhores receitas de café',
  'Introdução ao mundo da criptografia',
  'Como montar um home estúdio',
  'Segredos para melhorar a saúde mental',
  'Guia completo de fotografia com smartphone',
  'Os melhores destinos turísticos secretos',
  'Como aprender idiomas rapidamente',
  'Tendências de design para 2025',
  'O futuro da tecnologia',
  'Como começar um negócio online',
]

const handleGeracaoRapida = async () => {
  if (isLoading.value) return

  isLoading.value = true
  erro.value = null
  roteiroGerado.value = false

  try {
    const temaAleatorio = temasAleatorios[Math.floor(Math.random() * temasAleatorios.length)]

    const resultado = await gerar(temaAleatorio, {
      tom: tom.value,
      duracao: duracao.value
    })

    if (resultado) {
      roteiroGerado.value = true

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
