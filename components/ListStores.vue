<template>
  <div class="row">
    <div v-for="store in stores" :key="store.id" class="col-lg-6 mb-4">
      <a :href="store.url" class="font-weight-bold" rel="noopener" target="_blank">
        <fa icon="external-link-alt" fixed-width /> {{ store.name }}
      </a>
      <br>
      <span class="badge badge-secondary">Country:</span>
      {{ store.country }}
      <br>
      <span class="badge badge-secondary">Link:</span>
      <BrandIconLink :links="store.link" />
      <br>
      <span class="badge badge-secondary">Tag:</span>
      <NLink v-for="tag in store.tags" :key="tag.id" :to="{ query: { tag: tag.name } }" class="badge badge-secondary" append>
        {{ tag.name }}
      </NLink>
      <hr>
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
