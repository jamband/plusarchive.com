<template>
  <h6 class="dropdown-header" :class="$style.header"><slot /></h6>
</template>

<style lang="scss" module>
@use "sass:color";

.header {
  margin-bottom: 0.2rem;
  text-decoration: underline;
  text-decoration-color: color.scale(gray, $lightness: 100%, $alpha: -80%);
  text-decoration-thickness: 0.1em;
  text-underline-offset: 0.3em;
}
</style>
