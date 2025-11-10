import { defineStore } from 'pinia'
import type { Roteiro, ConfiguracoesRoteiro } from '~/types/roteiro'

export const useRoteiroStore = defineStore('roteiro', {
  state: () => ({
    roteiros: [] as Roteiro[],
    configuracoes: {
      tom: 'informal',
      duracao: '5-10min',
      publicoAlvo: '',
      incluirIntroducao: true,
      incluirChamadaInscricao: true,
      incluirConclusao: true
    } as ConfiguracoesRoteiro
  }),

  getters: {
    roteirosPorData: (state) => {
      return [...state.roteiros].sort((a, b) =>
        new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime()
      )
    },

    totalRoteiros: (state) => state.roteiros.length,

    roteirosPorTom: (state) => (tom: string) => {
      return state.roteiros.filter(r => r.tom === tom)
    }
  },

  actions: {
    adicionarRoteiro(roteiro: Roteiro) {
      this.roteiros.unshift(roteiro)
      this.salvarNoLocalStorage()
    },

    removerRoteiro(id: string) {
      const index = this.roteiros.findIndex(r => r.id === id)
      if (index !== -1) {
        this.roteiros.splice(index, 1)
        this.salvarNoLocalStorage()
      }
    },

    atualizarConfiguracoes(novasConfiguracoes: Partial<ConfiguracoesRoteiro>) {
      this.configuracoes = { ...this.configuracoes, ...novasConfiguracoes }
      this.salvarConfiguracoesNoLocalStorage()
    },

    salvarNoLocalStorage() {
      if (process.client) {
        localStorage.setItem('roteiros', JSON.stringify(this.roteiros))
      }
    },

    salvarConfiguracoesNoLocalStorage() {
      if (process.client) {
        localStorage.setItem('configuracoes', JSON.stringify(this.configuracoes))
      }
    },

    carregarDoLocalStorage() {
      if (process.client) {
        const roteiros = localStorage.getItem('roteiros')
        const configuracoes = localStorage.getItem('configuracoes')

        if (roteiros) {
          this.roteiros = JSON.parse(roteiros)
        }

        if (configuracoes) {
          this.configuracoes = JSON.parse(configuracoes)
        }
      }
    },

    limparHistorico() {
      this.roteiros = []
      this.salvarNoLocalStorage()
    }
  }
})
