<template lang="pug">
  div
    v-topbar
    router-view.router-view
</template>

<script>
  import router from './../js/router';
  import topbar from './Topbar.vue';

  export default {
    router,
    components: {
      'v-topbar': topbar,
    },
  };
</script>
