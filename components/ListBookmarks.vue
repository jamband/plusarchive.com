<template>
  <div class="row">
    <div v-for="bookmark in bookmarks" :key="bookmark.id" class="col-lg-6 mb-3 mb-sm-4">
      <a :href="bookmark.url" class="d-block fw-bold" rel="noopener" target="_blank">
        <fa icon="external-link-alt" size="sm" fixed-width />
        {{ bookmark.name }}
      </a>
      <span class="me-2 text-body">Country:</span>
      {{ bookmark.country }}
      <br>
      <span class="me-2 text-body">Link:</span>
      <BrandIconLink :links="bookmark.link" />
      <br>
      <span class="me-2 text-body">Tag:</span>
      <NLink
        v-for="tag in bookmark.tags"
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
    bookmarks: {
      type: Array,
      required: true
    }
  }
}
</script>
