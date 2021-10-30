<template>
  <NLink :to="to" class="dropdown-item" @click.native="resetScrollTop">
    <slot />
  </NLink>
</template>

<script>
export default {
  name: 'AppDropdownLink',
  props: {
    to: {
      type: Object,
      required: true
    }
  },
  methods: {
    resetScrollTop (event) {
      event.target.parentNode.scrollTop = 0
    }
  }
}
</script>
