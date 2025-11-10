<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
    <button
      @click="expanded = !expanded"
      class="w-full flex items-center justify-between text-left"
    >
      <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
        Configurações Avançadas
      </h3>
      <svg
        class="w-5 h-5 transform transition-transform"
        :class="{ 'rotate-180': expanded }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <div v-if="expanded" class="mt-4 space-y-4">
      <!-- Tom do Vídeo -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Tom do Vídeo
        </label>
        <select
          v-model="localConfig.tom"
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-youtube-red"
        >
          <option value="informal">Informal</option>
          <option value="formal">Formal</option>
          <option value="educativo">Educativo</option>
          <option value="entretenimento">Entretenimento</option>
        </select>
      </div>

      <!-- Duração -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Duração Estimada
        </label>
        <select
          v-model="localConfig.duracao"
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-youtube-red"
        >
          <option value="3-5min">3-5 minutos</option>
          <option value="5-10min">5-10 minutos</option>
          <option value="10-15min">10-15 minutos</option>
          <option value="15-20min">15-20 minutos</option>
          <option value="20+min">20+ minutos</option>
        </select>
      </div>

      <!-- Público Alvo -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Público Alvo
        </label>
        <input
          v-model="localConfig.publicoAlvo"
          type="text"
          placeholder="Ex: Iniciantes, Profissionais, Jovens..."
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-youtube-red"
        />
      </div>

      <!-- Opções Adicionais -->
      <div class="space-y-2">
        <label class="flex items-center space-x-2 cursor-pointer">
          <input
            v-model="localConfig.incluirIntroducao"
            type="checkbox"
            class="w-4 h-4 text-youtube-red focus:ring-youtube-red border-gray-300 rounded"
          />
          <span class="text-sm text-gray-700 dark:text-gray-300">Incluir introdução</span>
        </label>

        <label class="flex items-center space-x-2 cursor-pointer">
          <input
            v-model="localConfig.incluirChamadaInscricao"
            type="checkbox"
            class="w-4 h-4 text-youtube-red focus:ring-youtube-red border-gray-300 rounded"
          />
          <span class="text-sm text-gray-700 dark:text-gray-300">Incluir chamada para inscrição</span>
        </label>

        <label class="flex items-center space-x-2 cursor-pointer">
          <input
            v-model="localConfig.incluirConclusao"
            type="checkbox"
            class="w-4 h-4 text-youtube-red focus:ring-youtube-red border-gray-300 rounded"
          />
          <span class="text-sm text-gray-700 dark:text-gray-300">Incluir conclusão</span>
        </label>
      </div>

      <button
        @click="salvarConfiguracoes"
        class="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition"
      >
        Salvar Configurações
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ConfiguracoesRoteiro } from '~/types/roteiro'

const roteiroStore = useRoteiroStore()
const expanded = ref(false)

const localConfig = ref<ConfiguracoesRoteiro>({ ...roteiroStore.configuracoes })

const salvarConfiguracoes = () => {
  roteiroStore.atualizarConfiguracoes(localConfig.value)
}

// Sincronizar com o store quando expandir
watch(expanded, (isExpanded) => {
  if (isExpanded) {
    localConfig.value = { ...roteiroStore.configuracoes }
  }
})
</script>
