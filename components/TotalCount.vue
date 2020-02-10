<template functional>
  <span class="badge text-muted pl-3">
    {{ props.total === 0 ? 'No results found' : `${props.total} results` }}
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
