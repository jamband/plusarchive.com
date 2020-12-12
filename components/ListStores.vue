<template>
  <div class="col-lg-8">
    <div v-if="$fetchState.pending" class="text-center">
      <AppLoading />
    </div>
    <div v-else-if="$fetchState.error">
      Request failure.
    </div>
    <div v-else>
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
      <PaginationMinimal :current-page="pagination.currentPage" :page-count="pagination.pageCount" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      stores: [],
      pagination: {}
    }
  },
  async fetch () {
    const stores = await this.$axios.$get('stores?expand=tags', { params: this.$route.query })
    this.stores = stores.items
    this.pagination = stores._meta
    this.$store.dispatch('pagination/fetchItem', this.pagination)
  },
  watch: {
    '$route.query': '$fetch'
  }
}
</script>
