<template>
  <div>
    <v-container class="fill-height">
      <v-responsive
        class="align-top mx-auto"
        max-width="800"
      >
        <v-row>
          <v-col cols="3">
            <v-select
              label="Race"
              v-model="selectedRace"
              :items="phases.races"
              :item-title="'titre'"
              :item-value="'id'"
            />
          </v-col>
          <v-col cols="3">
            <v-select
              label="Culture"
              v-model="selectedCulture"
              :items="phases.cultures"
              :item-title="'titre'"
              :item-value="'id'"
            />
          </v-col>
          <v-col cols="3">
            <v-select
              label="Caste"
              v-model="selectedCaste"
              :items="phases.castes"
              :item-title="'titre'"
              :item-value="'id'"
            />
          </v-col>
          <v-col cols="3">
            <v-select
              label="Carriere"
              v-model="selectedCarriere"
              :items="phases.carrieres"
              :item-title="'titre'"
              :item-value="'id'"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="10">
            <v-text-field name="search" v-model="searchTerm" @keyup="findPhases" placeholder="Entrez un mot à rechercher" />
          </v-col>
          <v-col cols="2">
            <v-btn @click="deleteTerm">Effacer</v-btn>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col cols="3">
            <v-btn @click="generatePDF">Générer le PDF</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <div class="phasesListWrapper" v-for="(phase, key) in searchPhases" :key="key">
              <PhaseComponent :phase="phase"></PhaseComponent>
            </div>
          </v-col>
        </v-row>
      </v-responsive>
    </v-container>
    <div ref="printZone" class="phasesWrapper">
      <div class="phasesWrapper2" v-for="(phase, key) in selectedPhases" :key="key">
        <div  v-if="phase.id">
          <PhaseComponent :phase="phase"></PhaseComponent>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

.main {
  max-width: 800px;
  margin: auto;
}
.selectPhasesWrapper {
  display: flex;
}
.selectPhaseWrapper {
  margin: 10px;
  flex: 1;
  padding: 10px;
}
.phasesWrapper {
  display: flex;
}
.phasesWrapper2 {
  display: flex;
  flex: 1;
}
.phasesSearchWrapper {
  width: 500px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
}
.phasesListWrapper {
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 100%;
  margin-botton: 50px;
}
.searchWrapper {
  flex: 1;
}
.buttonsWrapper {
  flex: 1;
}
</style>


<script lang="ts">

/* import { Options } from 'vue-class-component'; */
import { defineComponent } from 'vue'
import { jsPDF } from "jspdf"
import PhaseComponent from '@/components/PhaseComponent.vue'

interface Phase {
  id: string,
  titre: string,
  soustitre: string,
  synopsis: string,
  phases_conseillees: Array<string>,
  caracteristique: Array<string>,
  competences: Array<string>,
  langages: Array<string>,
  combat: Array<string>,
  trait: Array<string>,
  avantages: Array<string>,
  materiel: string,
  niveau_de_vie: string,

}
interface PhasesMap {
  races: Array<Phase>;
  cultures: Array<Phase>;
  castes: Array<Phase>;
  carrieres: Array<Phase>;
}
interface PhaseMap {
  race: Phase;
  culture: Phase;
  caste: Phase;
  carriere: Phase;
}
export default defineComponent ({
  components: {
    PhaseComponent,
  },
  data() {
    return {
      searchTerm: '',
      selectedRace: '',
      selectedCulture: '',
      selectedCaste: '',
      selectedCarriere: '',
      selectedPhases: {
        "race": {},
        "culture": {},
        "caste": {},
        "carriere": {}
      },
      phases: {} as PhasesMap,
      searchPhases: [] as Array<Phase>
    }
  },
  watch: {
    selectedRace(newValue, oldValue) {
        this.selectPhase(newValue, oldValue, 'races', 'race')
    },
    selectedCulture(newValue, oldValue) {
        this.selectPhase(newValue, oldValue, 'cultures', 'culture')
    },
    selectedCaste(newValue, oldValue) {
        this.selectPhase(newValue, oldValue, 'castes', 'caste')
    },
    selectedCarriere(newValue, oldValue) {
        this.selectPhase(newValue, oldValue, 'carrieres', 'carriere')
    },
  },
  methods: {
    findPhases() {

      this.selectPhase('', '', 'races', 'race')
      this.selectPhase('', '', 'cultures', 'culture')
      this.selectPhase('', '', 'carrieres', 'carriere')
      this.selectPhase('', '', 'castes', 'caste')

      this.selectedRace = ''
      this.selectedCarriere = ''
      this.selectedCulture = ''
      this.selectedCaste = ''

      if (this.searchTerm) {
        this.searchPhases = this.phases['races']
            .filter(p => JSON.stringify(p).toLowerCase().includes(this.searchTerm.toLowerCase()))
      }
      else {
        this.searchPhases = []
      }
    },
    deleteTerm() {
      this.searchTerm = ''
      this.searchPhases = []
    },
    selectPhase(newValue: string, oldValue: string, phaseMapName: string, phaseName: string) {

      let all: Array<Phase> = this.phases[phaseMapName as keyof PhasesMap]
      console.log(`Sélection de phase ${newValue} pour la phase ${phaseName} parmi ${phaseMapName}`)
      if (all) {
        const found: Array<Phase> = all.filter( (p: Phase) => p.id == newValue)
        console.log(found)
        if (found.length == 1) {
          this.selectedPhases[phaseName as keyof PhaseMap] = found[0]
        }
        else {
          // not found, we erase already selected one
          this.selectedPhases[phaseName as keyof PhaseMap] = {}
        }
      }
    },
    // on charge les phases dans le répertoire de configuration
    async getPhases() {
      try {
        const response = await fetch('config/phases.json')
        return response.json()
      }
      catch (e) {
        console.log(e)
      }
    },
    generatePDF() {

      const doc = new jsPDF('landscape', 'mm', 'a4');

      // Source HTMLElement or a string containing HTML.
      const elementHTML: HTMLElement = this.$refs['printZone'] as HTMLElement

      console.log(window.screen.availWidth)
      console.log(window.screen.availHeight)
      doc.html(elementHTML, {
          callback: (doc) => {
              doc.save('phases.pdf');
          },
          x: 5,
          y: 5,
          width: 1920,
          windowWidth: 1920,
          html2canvas: {
            scale: 0.15
          }
      });
    }
  },
  async mounted() {
    this.phases = await this.getPhases()
  }
})
</script>
