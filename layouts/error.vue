<template>
  <v-app primary style="width:100%;display:flex;justify-content:center;align-items: center;">
  <NuxtLink class='link' to="/">&nbsp;&nbsp;⇤ Click to Get Back</NuxtLink>
    <div v-if="error.statusCode === 404" style="margin:auto">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqI3lHFjBbLelg5rGnkZVukHUI2cd9cnEGOQ&usqp=CAU" alt="404" height="200px">
    </div>
    <h1 v-else>
      {{ otherError }}
    </h1>
    
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title = this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
.link {
  text-decoration: none;
  color:#111;
  font-style: italic;
}
</style>
