<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 border border-gray-200 dark:border-gray-700">
    <div class="flex justify-between items-start mb-3">
      <h3 class="font-semibold text-gray-800 dark:text-white line-clamp-1">
        {{ roteiro.titulo }}
      </h3>
      <button
        @click="emit('delete', roteiro.id)"
        class="text-red-500 hover:text-red-700 transition"
        title="Excluir roteiro"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>

    <p class="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
      {{ roteiro.descricao }}
    </p>

    <div class="flex flex-wrap gap-2 mb-3">
      <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
        {{ roteiro.tom }}
      </span>
      <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
        {{ roteiro.duracao }}
      </span>
      <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
        {{ roteiro.publicoAlvo }}
      </span>
    </div>

    <div class="flex flex-wrap gap-1 mb-3">
      <span
        v-for="tag in roteiro.tags.slice(0, 3)"
        :key="tag"
        class="text-xs text-gray-500 dark:text-gray-400"
      >
        #{{ tag }}
      </span>
    </div>

    <div class="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
      <span class="text-xs text-gray-500 dark:text-gray-400">
        {{ formatarData(roteiro.criadoEm) }}
      </span>
      <button
        @click="expanded = !expanded"
        class="text-youtube-red hover:text-red-700 font-medium text-sm transition"
      >
        {{ expanded ? 'Ocultar' : 'Ver mais' }}
      </button>
    </div>

    <div v-if="expanded" class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <div class="prose dark:prose-invert max-w-none">
        <pre class="whitespace-pre-wrap text-sm bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-auto max-h-96">{{ roteiro.conteudo }}</pre>
      </div>
      <div class="mt-3 flex gap-2">
        <button
          @click="copiarConteudo"
          class="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition"
        >
          {{ copiado ? '✓ Copiado!' : 'Copiar Roteiro' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Roteiro } from '~/types/roteiro'

interface Props {
  roteiro: Roteiro
}

const props = defineProps<Props>()
const emit = defineEmits<{
  delete: [id: string]
}>()

const expanded = ref(false)
const copiado = ref(false)

const formatarData = (data: Date) => {
  return new Date(data).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

const copiarConteudo = async () => {
  try {
    await navigator.clipboard.writeText(props.roteiro.conteudo)
    copiado.value = true
    setTimeout(() => {
      copiado.value = false
    }, 2000)
  } catch (err) {
    console.error('Erro ao copiar:', err)
  }
}
</script>
