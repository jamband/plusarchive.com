<template>
  <div class="row">
    <div v-for="label in labels" :key="label.id" class="col-lg-6 mb-3 mb-sm-4">
      <a :href="label.url" class="fw-bold" rel="noopener" target="_blank">
        <fa icon="external-link-alt" size="sm" fixed-width />
        {{ label.name }}
      </a>
      <br>
      <span class="me-2 text-body">Country:</span>
      {{ label.country }}<br>
      <span class="me-2 text-body">Link:</span>
      <BrandIconLink :links="label.link" /><br>
      <span class="me-2 text-body">Tag:</span>
      <NLink
        v-for="tag in label.tags"
        :key="tag.id"
        :to="{ query: { tag: tag.name } }"
        class="tag"
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
    labels: {
      type: Array,
      required: true
    }
  }
}
</script>
