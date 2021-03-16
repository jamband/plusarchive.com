<template>
  <span class="badge text-muted pl-3">
    {{ total === 0 ? 'No results found' : `${total} results` }}
  </span>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      required: true
    }
  }
}
</script>
