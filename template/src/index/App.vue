<template lang="pug">
  .app
    svg.icon
      use(xlink:href="#hexagon")
    h1 {{ appTitle }}
</template>

<style lang="scss">
  @import "~src/shared/fonts/font.css";

  body {
    font-family: "DidactGothic", sans-serif;
  }

  .app {
    align-items: center;
    box-sizing: border-box;
    display: flex;
    padding: 50px;
  }

  .icon {
    height: 2em;
    margin-right: 1em;
    width: 2em;
  }
</style>
