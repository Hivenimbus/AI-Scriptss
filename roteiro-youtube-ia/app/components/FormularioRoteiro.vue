<template>
  <div>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="tema" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Tema do Vídeo
        </label>
        <input
          id="tema"
          v-model="tema"
          type="text"
          placeholder="Ex: Como fazer bolo de chocolate"
          class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-youtube-red focus:border-transparent dark:bg-gray-700 dark:text-white transition"
          :disabled="isLoading"
        />
      </div>

      <div>
        <label for="descricao" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Descrição Adicional (Opcional)
        </label>
        <textarea
          id="descricao"
          v-model="descricao"
          rows="3"
          placeholder="Adicione mais detalhes sobre o que você quer no roteiro..."
          class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-youtube-red focus:border-transparent dark:bg-gray-700 dark:text-white transition resize-none"
          :disabled="isLoading"
        />
      </div>

      <button
        type="submit"
        :disabled="!tema || isLoading"
        class="w-full bg-youtube-red hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <svg
          v-if="isLoading"
          class="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <span>{{ isLoading ? 'Gerando...' : 'Gerar Roteiro' }}</span>
      </button>
    </form>

    <div v-if="erro" class="mt-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
      {{ erro }}
    </div>

    <div v-if="roteiroGerado" class="mt-6 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-lg">
      ✓ Roteiro gerado com sucesso! Confira no histórico ao lado.
    </div>
  </div>
</template>

<script setup lang="ts">
const tema = ref('')
const descricao = ref('')
const roteiroGerado = ref(false)

const { gerar, isLoading, erro } = useGerarRoteiro()

const handleSubmit = async () => {
  if (!tema.value) return

  roteiroGerado.value = false
  const resultado = await gerar(tema.value)

  if (resultado) {
    roteiroGerado.value = true
    tema.value = ''
    descricao.value = ''

    // Remove mensagem de sucesso após 3 segundos
    setTimeout(() => {
      roteiroGerado.value = false
    }, 3000)
  }
}
</script>
