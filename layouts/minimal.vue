<template>
  <div>
    <TheHeader />
    <div class="container">
      <nuxt />
    </div>
    <TheFooterMinimal />
  </div>
</template>

<script>
import TheFooterMinimal from '~/components/TheFooterMinimal'
import TheHeader from '~/components/TheHeader'

export default {
  components: {
    TheFooterMinimal,
    TheHeader
  }
}
</script>
