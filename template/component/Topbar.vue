<template lang="pug">
  div
    router-link(to="first") first
    br
    router-link(to="second") second
    br
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
