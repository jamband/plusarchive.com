<template>
  <div :class="$style.loading" role="status">
    <span>.</span><span>.</span><span>.</span>
  </div>
</template>

<script>
export default {
  name: 'ThePlayerLoading'
}
</script>

<style lang="scss" src="./style.scss" module></style>
