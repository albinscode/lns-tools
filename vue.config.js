const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  pwa: {
    name: 'Outils pour LNS',
    short_name: 'Outils JDR LNS',
    description: 'Fournit des outils pour le jeu de rôle LNS : dictionnaire des phases, recherche, etc...',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#41b383',
  },
})
