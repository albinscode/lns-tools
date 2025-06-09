<!-- allows to display a Phase -->
<template>

<div class="phaseWrapper">
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
        <li v-for="(competence, key) in phase.competences" :key="key" v-html="competence">
        </li>
      </ul>
    </div>
  </div>
  <div class="sectionWrapper">
    <div class="sectionTitle">Langages</div>
    <div class="sectionContent">
      <ul>
        <li v-for="(langage, key) in phase.langages" :key="key" v-html="langage">
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

</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent ({
    props: {
      phase: {}
    }
  })

</script>


<style>
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
.searchWrapper {
  flex: 1;
}
.buttonsWrapper {
  flex: 1;
}
</style>
