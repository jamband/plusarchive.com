<template>
  <div class="dropdown">
    <a
      :id="id"
      href="#"
      role="button"
      :class="labelClass"
      :title="nav ? 'More' : null"
      data-bs-toggle="dropdown"
      :aria-label="nav ? 'More' : null"
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
  name: 'AppDropdown',
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
