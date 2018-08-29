<template lang="pug">
  .root
    v-topbar
    transition(name="fade", mode="out-in", appear)
      router-view.router-view
</template>

<script>
  import router from 'js/router';
  import topbar from './Topbar';

  export default {
    router,
    components: {
      'v-topbar': topbar,
    },
  };
</script>

<style lang="scss">
  :root {
    --material-shadow: 0 3px 6px rgba(0, 0, 0, 0.19), 0 3px 6px rgba(0, 0, 0, 0.23);
    --offset: 16px;
    --topbar-height: 70px;
  }

  body {
    font-family: sans-serif;
    height: 100vh;
    margin: 0;
  }

  .root {
    background: #F1F1F1;
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
  }

  .router-view {
    height: 100%;
    overflow: auto;
    padding: var(--offset);
    word-break: break-all;
  }

  .fade {
    &-enter-active,
    &-leave-active {
      transition: opacity 0.25s;
    }

    &-enter,
    &-leave-to {
      opacity: 0;
    }
  }

</style>
