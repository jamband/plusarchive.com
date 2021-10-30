<template>
  <footer class="p-3 fixed-bottom text-center fw-bold bg-dark">
    <div :class="$style.contents">
      {{ appName }}
    </div>
  </footer>
</template>

<script>
import { APP_NAME } from '~/constants/app'

export default {
  name: 'TheFooterMinimal',
  data () {
    return {
      appName: APP_NAME
    }
  }
}
</script>

<style lang="scss" src="./style.scss" module></style>
