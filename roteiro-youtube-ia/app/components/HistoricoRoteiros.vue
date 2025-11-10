<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white">
        Histórico
      </h2>
      <button
        v-if="roteiros.length > 0"
        @click="confirmarLimparHistorico"
        class="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition"
      >
        Limpar tudo
      </button>
    </div>

    <div v-if="roteiros.length === 0" class="text-center py-12">
      <svg
        class="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
        Nenhum roteiro gerado ainda
      </h3>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Comece gerando seu primeiro roteiro!
      </p>
    </div>

    <div v-else class="space-y-4 max-h-[600px] overflow-y-auto pr-2">
      <CardRoteiro
        v-for="roteiro in roteiros"
        :key="roteiro.id"
        :roteiro="roteiro"
        @delete="confirmarExcluir"
      />
    </div>

    <!-- Modal de confirmação de exclusão -->
    <div
      v-if="roteiroParaExcluir"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click="cancelarExclusao"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full"
        @click.stop
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Confirmar Exclusão
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          Tem certeza que deseja excluir este roteiro? Esta ação não pode ser desfeita.
        </p>
        <div class="flex gap-3">
          <button
            @click="cancelarExclusao"
            class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg font-medium transition"
          >
            Cancelar
          </button>
          <button
            @click="excluirRoteiro"
            class="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de confirmação de limpar histórico -->
    <div
      v-if="mostrarConfirmacaoLimpar"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click="cancelarLimparHistorico"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full"
        @click.stop
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Limpar Todo o Histórico
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          Tem certeza que deseja excluir TODOS os roteiros? Esta ação não pode ser desfeita.
        </p>
        <div class="flex gap-3">
          <button
            @click="cancelarLimparHistorico"
            class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg font-medium transition"
          >
            Cancelar
          </button>
          <button
            @click="limparHistorico"
            class="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition"
          >
            Limpar Tudo
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const roteiroStore = useRoteiroStore()
const roteiros = computed(() => roteiroStore.roteirosPorData)
const roteiroParaExcluir = ref<string | null>(null)
const mostrarConfirmacaoLimpar = ref(false)

const confirmarExcluir = (id: string) => {
  roteiroParaExcluir.value = id
}

const excluirRoteiro = () => {
  if (roteiroParaExcluir.value) {
    roteiroStore.removerRoteiro(roteiroParaExcluir.value)
    roteiroParaExcluir.value = null
  }
}

const cancelarExclusao = () => {
  roteiroParaExcluir.value = null
}

const confirmarLimparHistorico = () => {
  mostrarConfirmacaoLimpar.value = true
}

const limparHistorico = () => {
  roteiroStore.limparHistorico()
  mostrarConfirmacaoLimpar.value = false
}

const cancelarLimparHistorico = () => {
  mostrarConfirmacaoLimpar.value = false
}
</script>
