<template>
  <div class="row">
    <div v-for="label in labels" :key="label.id" class="col-lg-6 mb-4">
      <a :href="label.url" class="font-weight-bold" rel="noopener" target="_blank">
        <fa icon="external-link-alt" fixed-width /> {{ label.name }}
      </a>
      <br>
      <span class="badge badge-secondary">Country:</span>
      {{ label.country }}
      <br>
      <span class="badge badge-secondary">Link:</span>
      <BrandIconLink :links="label.link" />
      <br>
      <span class="badge badge-secondary">Tag:</span>
      <NLink v-for="tag in label.tags" :key="tag.id" :to="{ query: { tag: tag.name } }" class="badge badge-secondary" append>
        {{ tag.name }}
      </NLink>
      <hr>
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
