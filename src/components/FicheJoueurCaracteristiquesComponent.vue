<!-- Affichage des caractéristiques constituées de la caractértique longue, courte, valeur et xp -->
<template>

  <v-container>
    <v-row v-for="(columnName, key) in model[section]" :key="key">
      <v-col cols="3">
        <span class="text-body1">{{columnName}}</span>
      </v-col>
      <v-col cols="3">
        <span class="text-body1">{{columnName.toUpperCase()}}</span>
      </v-col>
      <v-col cols="3">
        <v-text-field>{{fiche[section][columnName]['value']}}</v-text-field>
      </v-col>
      <v-col cols="3">
        <v-number-input :model-value="fiche[section][columnName]['xp']" />
      </v-col>
    </v-row>
  </v-container>

</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent ({
    props: {
      fiche: {},
      model: {},
      section: null,
    },
  })

</script>


