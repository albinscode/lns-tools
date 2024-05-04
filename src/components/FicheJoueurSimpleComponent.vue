<!-- allows to display simple attributes from information générales (simple key/values) -->
<template>

  <v-container>
    <v-row>
      <v-col cols="12" v-for="(columnName, key) in model[section]" :key="key">
        <span class="text-body1">{{columnName}}</span>
        <v-text-field v-if="typeof fiche[section][columnName] === 'string'">{{fiche[section][columnName]}}</v-text-field>
        <v-number-input v-if="typeof fiche[section][columnName] === 'number'" :model-value="fiche[section][columnName]" />
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


