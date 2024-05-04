<template>
  <v-container class="fill-height">
    <v-responsive
      class="align-top mx-auto"
      max-width="800"
    >
      <FicheJoueurSimpleComponent
        :fiche="ficheJoueurData"
        :model="ficheJoueurModel"
        :section="'infosGenerales'"
      />
      <FicheJoueurCaracteristiquesComponent
        :fiche="ficheJoueurData"
        :model="ficheJoueurModel"
        :section="'caracteristiquesPrincipales'"
      />
      <FicheJoueurCaracteristiquesComponent
        :fiche="ficheJoueurData"
        :model="ficheJoueurModel"
        :section="'caracteristiquesSecondaires'"
      />
    </v-responsive>
  </v-container>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import FicheJoueurSimpleComponent from '@/components/FicheJoueurSimpleComponent.vue'
import FicheJoueurCaracteristiquesComponent from '@/components/FicheJoueurCaracteristiquesComponent.vue'

// on récupère un fichier de test pour l'instant
import ficheJoueur from '@/tests/joueur1.json'


export default defineComponent ({
  components: {
    FicheJoueurSimpleComponent,
    FicheJoueurCaracteristiquesComponent,
  },
  data() {
    return {
      ficheJoueurModel: {},
      ficheJoueurData: {},
    }
  },
  methods: {
    async getFicheJoueurSimpleModel() {
      try {
        const response = await fetch('config/ficheJoueurModel.json')
        return response.json()
      }
      catch (e) {
        console.log(e)
      }
    }
  },
  async mounted() {
    this.ficheJoueurModel = await this.getFicheJoueurSimpleModel()
    this.ficheJoueurData = ficheJoueur
  }
})

</script>
