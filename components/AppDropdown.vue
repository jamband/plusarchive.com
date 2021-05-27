<template>
  <div class="dropdown">
    <a
      :id="id"
      href="#"
      role="button"
      :class="labelClass"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <template v-if="label">
        {{ label }} <fa icon="angle-down" size="sm" fixed-width />
      </template>
      <fa v-else icon="ellipsis-h" />
    </a>
    <div class="dropdown-menu" :aria-labelledby="id">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: null
    },
    nav: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    labelClass () {
      return this.nav ? 'nav-link' : 'tag'
    }
  }
}
</script>
