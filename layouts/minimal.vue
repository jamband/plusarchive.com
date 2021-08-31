<template>
  <div>
    <TheHeader />
    <Nuxt class="container pt-4 pb-8 pb-sm-7" />
    <TheFooterMinimal />
  </div>
</template>

<script>
import { TheFooterMinimal } from '~/components/the-footer-minimal'
import { TheHeader } from '~/components/the-header'

export default {
  name: 'LayoutsMinimal',
  components: {
    TheFooterMinimal,
    TheHeader
  }
}
</script>
