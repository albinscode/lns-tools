<template>
  <div class="main">
    <div class="selectPhasesWrapper">
      <div class="selectPhaseWrapper">
        <label>Race</label>
        <div>
            <select v-model="selectedRace">
              <option v-for="race in phases.races" :value="race.id" :text="race.titre" :key="race.id">
              </option>
            </select>
        </div>
      </div>
      <div class="selectPhaseWrapper">
        <label>Culture</label>
        <div>
            <select v-model="selectedCulture">
              <option v-for="culture in phases.cultures" :value="culture.id" :text="culture.titre" :key="culture.id">
              </option>
            </select>
        </div>
      </div>
      <div class="selectPhaseWrapper">
        <label>Caste</label>
        <div>
            <select v-model="selectedCaste">
              <option v-for="caste in phases.castes" :value="caste.id" :text="caste.titre" :key="caste.id">
                {{ caste.titre }}
              </option>
            </select>
        </div>
      </div>
      <div class="selectPhaseWrapper">
        <label>Carriere</label>
        <div>
            <select v-model="selectedCarriere">
              <option v-for="carriere in phases.carrieres" :value="carriere.id" :text="carriere.titre" :key="carriere.id">
                {{ carriere.titre }}
              </option>
            </select>
        </div>
      </div>
    </div>
    <div class="buttonsWrapper">
      <button @click="generatePDF">Générer le PDF</button>
    </div>
  </div>
  <div ref="printZone" class="phasesWrapper">
    <div class="phasesWrapper2" v-for="(phase, key) in selectedPhases" :key="key">
        <div class="phaseWrapper" v-if="phase.id">
          <div class="sectionWrapper">
            <div class="titre">{{ phase.titre }}</div>
            <div class="soustitre">{{ phase.soustitre }}</div>
            <br/>
          </div>
          <div class="sectionWrapper">
            <div class="sectionTitle">Synopsis</div>
            <div class="sectionContent">{{ phase.synopsis }}</div>
          </div>
          <div class="sectionWrapper">
            <div class="sectionTitle">Phases conseillées</div>
            <div class="sectionContent">
              <ul>
                <li v-for="(phaseConseillee, key) in phase.phases_conseillees" :key="key">
                  {{ phaseConseillee }}
                </li>
              </ul>
            </div>
          </div>
          <div class="sectionWrapper">
            <div class="sectionTitle">Caracteristiques</div>
            <div class="sectionContent">
              <ul>
                <li v-for="(caracteristique, key) in phase.caracteristiques" :key="key">
                  {{ caracteristique }}
                </li>
              </ul>
            </div>
          </div>
          <div class="sectionWrapper">
            <div class="sectionTitle">Compétences</div>
            <div class="sectionContent">
              <ul>
                <li v-for="(competence, key) in phase.competences" :key="key">
                  {{ competence }}
                </li>
              </ul>
            </div>
          </div>
          <div class="sectionWrapper">
            <div class="sectionTitle">Langages</div>
            <div class="sectionContent">
              <ul>
                <li v-for="(langage, key) in phase.langages" :key="key">
                  {{ langage }}
                </li>
              </ul>
            </div>
          </div>
          <div class="sectionWrapper">
            <div class="sectionTitle">Combat</div>
            <div class="sectionContent">
              <ul>
                <li v-for="(combat, key) in phase.combat" :key="key">
                  {{ combat }}
                </li>
              </ul>
            </div>
          </div>
          <div class="sectionWrapper">
            <div class="sectionTitle">Traits</div>
            <div class="sectionContent">
              <ul>
                <li v-for="(trait, key) in phase.traits" :key="key">
                  {{ trait }}
                </li>
              </ul>
            </div>
          </div>
          <div class="sectionWrapper">
            <div class="sectionTitle">Avantages</div>
            <div class="sectionContent">
              <ul>
                <li v-for="(avantage, key) in phase.avantages" :key="key">
                  {{ avantage }}
                </li>
              </ul>
            </div>
          </div>
          <div class="sectionWrapper">
            <div class="sectionTitle">Materiel</div>
            <div class="sectionContent">
              {{ phase.materiel}}
            </div>
          </div>
          <div class="sectionWrapper">
            <div class="sectionTitle">Niveau de vie</div>
            <div class="sectionContent">
              {{ phase.niveau_de_vie}}
            </div>
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
  border: 2px solid;
  padding: 10px;
}
.phasesWrapper {
  display: flex;
}
.phasesWrapper2 {
  display: flex;
  flex: 1;
}
.phaseWrapper {
  margin: 10px;
  flex: 1;
  /* border: 1px solid; */
}
.phaseWrapper .titre {
  font-size: 16px;
  font-weight: bold;
  padding-top: 5px;
}
.phaseWrapper .soustitre {
  font-size: 13px;
  font-weight: bold;
}
.phaseWrapper .sectionWrapper {
  border: 1px solid;
}
.phaseWrapper .sectionTitle {
  font-size: 14px;
  font-weight: bold;
  background: #a7a6a6;
  padding: 5px;
}
.phaseWrapper .sectionContent {
  padding: 5px;
  font-size: 12px;
  text-align: justify;
}
.phaseWrapper .sectionContent ul {
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin: 0px;
}
.buttonsWrapper {
  flex: 1;
}
</style>


<script lang="ts">
/* import { Options } from 'vue-class-component'; */
import { defineComponent } from 'vue'
import { jsPDF } from "jspdf";
/* import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src */


/* @Options({ */
/*   components: { */
/*     /1* HelloWorld, *1/ */
/*   }, */
/* }) */
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
  data() {
    return {
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
    selectPhase(newValue: string, oldValue: string, phaseMapName: string, phaseName: string) {
      let all: Array<Phase> = this.phases[phaseMapName as keyof PhasesMap]
      console.log(`Sélection de phase ${newValue} pour la phase ${phaseName} parmi ${phaseMapName}`)
      if (all) {
        const found: Array<Phase> = all.filter( (p: Phase) => p.id == newValue)
        console.log(found)
        if (found.length == 1) {
          this.selectedPhases[phaseName as keyof PhaseMap] = found[0]
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
