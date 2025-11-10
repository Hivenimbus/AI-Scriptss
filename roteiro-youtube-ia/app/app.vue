<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors flex">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <main class="flex-1 overflow-auto">
      <div class="max-w-5xl mx-auto px-6 py-8">
        <!-- Page Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Criar Novo Roteiro
          </h1>
          <p class="text-gray-600 dark:text-gray-400">
            Gere roteiros incríveis para seus vídeos no YouTube com inteligência artificial
          </p>
        </div>

        <!-- Formulário e Configurações -->
        <div class="space-y-6">
          <!-- Formulário de Geração -->
          <FormularioRoteiro />

          <!-- Configurações Avançadas -->
          <ConfiguracoesAvancadas />

          <!-- Roteiros Gerados Recentemente -->
          <div v-if="roteirosRecentes.length > 0" class="mt-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Roteiros Gerados
            </h2>
            <div class="grid grid-cols-1 gap-4">
              <CardRoteiro
                v-for="roteiro in roteirosRecentes"
                :key="roteiro.id"
                :roteiro="roteiro"
                @delete="confirmarExcluir"
              />
            </div>
          </div>
        </div>
      </div>
    </main>

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
  </div>
</template>

<script setup lang="ts">
const roteiroStore = useRoteiroStore()
const roteiroParaExcluir = ref<string | null>(null)

// Carrega dados do localStorage quando o componente é montado
onMounted(() => {
  roteiroStore.carregarDoLocalStorage()
})

// Mostra apenas os 5 roteiros mais recentes na página principal
const roteirosRecentes = computed(() =>
  roteiroStore.roteirosPorData.slice(0, 5)
)

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
</script>
