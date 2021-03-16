<template>
  <div class="row">
    <div v-for="bookmark in bookmarks" :key="bookmark.id" class="col-lg-6 mb-4">
      <a :href="bookmark.url" class="font-weight-bold" rel="noopener" target="_blank">
        <fa icon="external-link-alt" fixed-width /> {{ bookmark.name }}
      </a>
      <br>
      <span class="badge badge-secondary">Country:</span>
      {{ bookmark.country }}
      <br>
      <span class="badge badge-secondary">Link:</span>
      <BrandIconLink :links="bookmark.link" />
      <br>
      <span class="badge badge-secondary">Tag:</span>
      <NLink v-for="tag in bookmark.tags" :key="tag.id" :to="{ query: { tag: tag.name } }" class="badge badge-secondary" append>
        {{ tag.name }}
      </NLink>
      <hr>
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
