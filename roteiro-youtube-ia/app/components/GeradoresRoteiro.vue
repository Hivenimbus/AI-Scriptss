<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
    <!-- Tab Navigation -->
    <div class="flex border-b border-gray-200 dark:border-gray-700">
      <!-- Tab 1: Geração Rápida -->
      <button
        @click="modoAtual = 'rapido'"
        :class="[
          'flex-1 px-6 py-4 font-semibold transition-colors border-b-2 focus:outline-none',
          modoAtual === 'rapido'
            ? 'text-purple-600 border-purple-600 bg-purple-50 dark:bg-purple-900/20'
            : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-800 dark:hover:text-gray-300'
        ]"
      >
        <div class="flex items-center justify-center gap-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span>Geração Rápida</span>
        </div>
      </button>

      <!-- Tab 2: Seleção de Temas -->
      <button
        @click="modoAtual = 'temas'"
        :class="[
          'flex-1 px-6 py-4 font-semibold transition-colors border-b-2 focus:outline-none',
          modoAtual === 'temas'
            ? 'text-blue-600 border-blue-600 bg-blue-50 dark:bg-blue-900/20'
            : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-800 dark:hover:text-gray-300'
        ]"
      >
        <div class="flex items-center justify-center gap-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
          </svg>
          <span>Seleção de Temas</span>
        </div>
      </button>

      <!-- Tab 3: Personalizado -->
      <button
        @click="modoAtual = 'personalizado'"
        :class="[
          'flex-1 px-6 py-4 font-semibold transition-colors border-b-2 focus:outline-none',
          modoAtual === 'personalizado'
            ? 'text-youtube-red border-youtube-red bg-red-50 dark:bg-red-900/20'
            : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-800 dark:hover:text-gray-300'
        ]"
      >
        <div class="flex items-center justify-center gap-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 17v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z" />
          </svg>
          <span>Personalizado</span>
        </div>
      </button>
    </div>

    <!-- Tab Content -->
    <div class="p-6">
      <!-- Conteúdo Geração Rápida -->
      <div v-if="modoAtual === 'rapido'">
        <GeracaoRapida />
      </div>

      <!-- Conteúdo Seleção de Temas -->
      <div v-else-if="modoAtual === 'temas'">
        <GeracaoTemas />
      </div>

      <!-- Conteúdo Personalizado -->
      <div v-else-if="modoAtual === 'personalizado'">
        <FormularioRoteiro />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const modoAtual = ref<'rapido' | 'temas' | 'personalizado'>('personalizado')
</script>
