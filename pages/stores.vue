<template>
  <div class="row">
    <div class="col-lg-4">
      <h1 class="mt-0 mb-3">Stores</h1>
      <NLink :to="{ name: 'stores' }" class="tag">
        <fa icon="redo-alt" size="sm" /> Reset All
      </NLink>
      <TotalCount class="me-3" :total="pagination.totalCount" />
      <br class="d-md-none d-lg-block">
      <SearchDropdown
        id="searchStoresCountries"
        class="d-inline-block"
        label="Countries"
        query="country"
        items="stores/countries"
      />
      <SearchDropdown
        id="searchStoresTags"
        class="d-inline-block"
        label="Tags"
        query="tag"
        items="stores/tags"
      />
      <SearchForm class="d-md-none my-2" />
    </div>
    <div class="col-lg-8 mt-md-3 mt-lg-0">
      <div class="row">
        <div v-for="store in stores" :key="store.id" class="col-lg-6 mb-3 mb-sm-4">
          <a :href="store.url" class="fw-bold" rel="noopener" target="_blank">
            <fa icon="external-link-alt" size="sm" fixed-width />
            {{ store.name }}
          </a>
          <br>
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
      <PaginationMinimal
        :current-page="pagination.currentPage"
        :page-count="pagination.pageCount"
      />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $axios, query, store }) {
    const stores = await $axios.$get(
      `stores${query.q ? '/search' : ''}?expand=tags`,
      { params: query }
    )

    return {
      stores: stores.items,
      pagination: stores._meta
    }
  },
  head () {
    return {
      title: 'Stores'
    }
  },
  watchQuery: ['country', 'page', 'q', 'tag']
}
</script>
