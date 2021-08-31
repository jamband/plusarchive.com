<template>
  <h6 class="dropdown-header" :class="$style.header"><slot /></h6>
</template>

<script>
export default {
  name: 'AppDropdownHeader'
}
</script>

<style lang="scss" src="./style.scss" module></style>
