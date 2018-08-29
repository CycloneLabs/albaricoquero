<template lang="pug">
  .topbar
    router-link.router-link.logo(to="/first") Albaricoquero
    router-link.router-link(to="first") Some route
    router-link.router-link(to="second") Another route
</template>

<style lang="scss" scoped>
  .router-link {
    box-sizing: border-box;
    color: inherit;
    padding: 0 20px;
    position: relative;
    text-align: center;
    text-decoration: none;

    &::after {
      background: white;
      bottom: calc(-1 * var(--offset));
      content: "";
      display: block;
      height: 2px;
      left: 0;
      opacity: 0;
      position: absolute;
      transition: all 0.5s;
      width: 100%;
    }

    &-exact-active:not(.logo)::after {
      opacity: 1;
    }
  }

  .topbar {
    align-items: flex-end;
    background: #C2185B;
    box-shadow: var(--material-shadow);
    box-sizing: border-box;
    color: white;
    display: flex;
    font-size: 13px;
    height: var(--topbar-height);
    opacity: 1;
    padding: var(--offset) 0;
    text-transform: uppercase;
    width: 100vw;
  }

  .logo {
    @import url(https://fonts.googleapis.com/css?family=Sacramento);
    font-family: "Sacramento", cursive;
    font-size: 30px;
    height: 100%;
    text-transform: none;
  }
</style>
