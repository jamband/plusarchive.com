<template>
  <div class="row">
    <div v-for="store in stores" :key="store.id" class="col-lg-6 mb-3 mb-sm-4">
      <a :href="store.url" class="d-block fw-bold" rel="noopener" target="_blank">
        <fa icon="external-link-alt" size="sm" fixed-width />
        {{ store.name }}
      </a>
      <span class="me-2 text-body">Country:</span>
      {{ store.country }}
      <br>
      <span class="me-2 text-body">Link:</span>
      <BrandIconLink :links="store.link" />
      <br>
      <span class="me-2 text-body">Tag:</span>
      <NLink
        v-for="tag in store.tags"
        :key="tag.id"
        class="tag"
        :to="{ query: { tag: tag.name } }"
      >
        {{ tag.name }}
      </NLink>
      <hr class="text-muted">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stores: {
      type: Array,
      required: true
    }
  }
}
</script>
