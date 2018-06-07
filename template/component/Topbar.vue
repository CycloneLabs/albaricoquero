<template lang="pug">
  div
    div logo
    button(@click = "logout") Выйти
</template>

<script>
  export default {
    methods: {
      logout() {
        window.location.assign('/login.html');
      },
    },
  };
</script>
