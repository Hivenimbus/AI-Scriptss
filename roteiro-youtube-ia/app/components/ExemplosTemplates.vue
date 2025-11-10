<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
    <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
      Exemplos de Roteiros
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="exemplo in exemplos"
        :key="exemplo.id"
        class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer border border-gray-200 dark:border-gray-600"
        @click="verExemplo(exemplo)"
      >
        <h3 class="font-semibold text-gray-800 dark:text-white mb-2">
          {{ exemplo.titulo }}
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {{ exemplo.descricao }}
        </p>
        <div class="flex flex-wrap gap-2">
          <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {{ exemplo.tom }}
          </span>
          <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            {{ exemplo.duracao }}
          </span>
        </div>
      </div>
    </div>

    <!-- Modal para visualizar exemplo -->
    <div
      v-if="exemploSelecionado"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click="fecharModal"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto"
        @click.stop
      >
        <div class="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
          <h3 class="text-xl font-bold text-gray-800 dark:text-white">
            {{ exemploSelecionado.titulo }}
          </h3>
          <button
            @click="fecharModal"
            class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="p-6">
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {{ exemploSelecionado.tom }}
            </span>
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              {{ exemploSelecionado.duracao }}
            </span>
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              {{ exemploSelecionado.publicoAlvo }}
            </span>
          </div>

          <div class="prose dark:prose-invert max-w-none mb-4">
            <pre class="whitespace-pre-wrap text-sm bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">{{ exemploSelecionado.conteudo }}</pre>
          </div>

          <div class="flex gap-3">
            <button
              @click="usarComoBase(exemploSelecionado)"
              class="flex-1 bg-youtube-red hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition"
            >
              Usar como Base
            </button>
            <button
              @click="copiarExemplo"
              class="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium transition"
            >
              {{ copiado ? '✓ Copiado!' : 'Copiar' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EXEMPLOS_ROTEIROS } from '~/types/roteiro'
import type { Roteiro } from '~/types/roteiro'

const roteiroStore = useRoteiroStore()
const exemploSelecionado = ref<Roteiro | null>(null)
const copiado = ref(false)

const exemplos = EXEMPLOS_ROTEIROS

const verExemplo = (exemplo: Roteiro) => {
  exemploSelecionado.value = exemplo
}

const fecharModal = () => {
  exemploSelecionado.value = null
  copiado.value = false
}

const usarComoBase = (exemplo: Roteiro) => {
  const novoRoteiro: Roteiro = {
    ...exemplo,
    id: `roteiro-${Date.now()}`,
    titulo: `${exemplo.titulo} (Cópia)`,
    criadoEm: new Date()
  }
  roteiroStore.adicionarRoteiro(novoRoteiro)
  fecharModal()
}

const copiarExemplo = async () => {
  if (!exemploSelecionado.value) return

  try {
    await navigator.clipboard.writeText(exemploSelecionado.value.conteudo)
    copiado.value = true
    setTimeout(() => {
      copiado.value = false
    }, 2000)
  } catch (err) {
    console.error('Erro ao copiar:', err)
  }
}
</script>
