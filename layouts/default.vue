<template>
  <v-app primary>
    <v-main class='styleapp'>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import {
  defineComponent
} from '@nuxtjs/composition-api'

const index = defineComponent({})
export default index
</script>

<style>
.focusSelect {
  border-radius: 10px;
  border: solid;
  background: #66e867 !important;
}
.styleapp {
  background:url('https://wallpaperaccess.com/full/1836503.jpg');
  background-size: cover;
}
</style>
