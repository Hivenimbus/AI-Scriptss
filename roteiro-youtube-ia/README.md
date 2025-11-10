# Gerador de Roteiros para YouTube com IA

Sistema inteligente para geração de roteiros de vídeos para YouTube, construído com Nuxt 4, Vue 3, TypeScript e Tailwind CSS.

## Funcionalidades

- **Geração de Roteiros**: Interface intuitiva para gerar roteiros personalizados
- **Configurações Avançadas**: Ajuste tom, duração, público-alvo e estrutura do roteiro
- **Exemplos e Templates**: Biblioteca de roteiros exemplo para inspiração
- **Histórico**: Salve e gerencie todos os roteiros gerados
- **Dark Mode**: Tema claro e escuro
- **Persistência Local**: Roteiros salvos automaticamente no localStorage
- **Design Responsivo**: Interface otimizada para desktop, tablet e mobile

## Tecnologias

- **Nuxt 4** - Framework Vue.js full-stack
- **Vue 3** - Composition API e script setup
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utility-first
- **Pinia** - Gerenciamento de estado
- **VueUse** - Coleção de utilities Vue
- **Zod** - Validação de schemas

## Estrutura do Projeto

```
roteiro-youtube-ia/
├── app/
│   └── app.vue              # Página principal
├── components/
│   ├── CardRoteiro.vue      # Card de exibição de roteiro
│   ├── ConfiguracoesAvancadas.vue
│   ├── ExemplosTemplates.vue
│   ├── FormularioRoteiro.vue
│   └── HistoricoRoteiros.vue
├── composables/
│   └── useGerarRoteiro.ts   # Lógica de geração de roteiros
├── stores/
│   └── useRoteiroStore.ts   # Store Pinia para roteiros
├── types/
│   └── roteiro.ts           # Tipos TypeScript
└── assets/
    └── css/
        └── main.css         # Estilos globais
```

## Instalação

```bash
npm install
```

## Desenvolvimento

Inicie o servidor de desenvolvimento em `http://localhost:3000`:

```bash
npm run dev
```

## Produção

Build para produção:

```bash
npm run build
```

Preview do build de produção:

```bash
npm run preview
```

## Como Usar

1. **Gerar Roteiro**: Digite o tema do vídeo no formulário principal e clique em "Gerar Roteiro"
2. **Configurar**: Expanda as "Configurações Avançadas" para ajustar tom, duração e público-alvo
3. **Explorar Exemplos**: Veja templates prontos na seção "Exemplos de Roteiros"
4. **Gerenciar Histórico**: Todos os roteiros gerados ficam salvos no painel "Histórico"
5. **Copiar/Editar**: Clique em "Ver mais" nos roteiros para copiar o conteúdo

## Integração com IA

Atualmente o sistema usa uma implementação mock para gerar roteiros. Para integrar com uma API de IA real:

1. Edite o arquivo `composables/useGerarRoteiro.ts`
2. Substitua a função `gerar()` pela chamada à API desejada (OpenAI, Anthropic, etc.)
3. Configure as variáveis de ambiente necessárias no `.env`

Exemplo de integração futura:
```typescript
// No .env
NUXT_PUBLIC_OPENAI_API_KEY=sua-chave-aqui

// No composable
const config = useRuntimeConfig()
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  headers: { 'Authorization': `Bearer ${config.public.openaiApiKey}` }
})
```

## Licença

MIT

## Documentação

- [Nuxt 4](https://nuxt.com/docs)
- [Vue 3](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Pinia](https://pinia.vuejs.org/)
