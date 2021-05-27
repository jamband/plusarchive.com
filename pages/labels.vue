<template>
  <div class="row">
    <div class="col-lg-4">
      <h1 class="mt-0 mb-3">Labels</h1>
      <NLink :to="{ name: 'labels' }" class="text-light">
        <fa icon="redo-alt" size="sm" fixed-width /> Reset All
      </NLink>
      <TotalCount class="mx-3" :total="pagination.totalCount" />
      <br class="d-md-none d-lg-block">
      <SearchDropdown
        id="searchLabelsCountries"
        class="d-inline-block"
        label="Countries"
        query="country"
        items="labels/countries"
      />
      <SearchDropdown
        id="searchLabelsTags"
        class="d-inline-block"
        label="Tags"
        query="tag"
        items="labels/tags"
      />
      <SearchForm class="d-md-none my-2" />
    </div>
    <div class="col-lg-8 mt-md-3 mt-lg-0">
      <ListLabels :labels="labels" />
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
    const labels = await $axios.$get(
      `labels${query.q ? '/search' : ''}?expand=tags`,
      { params: query }
    )

    store.dispatch('pagination/fetchItem', labels._meta)

    return {
      labels: labels.items
    }
  },
  head () {
    return {
      title: 'Labels'
    }
  },
  computed: {
    pagination () {
      return this.$store.state.pagination
    }
  },
  watchQuery: ['country', 'page', 'q', 'tag']
}
</script>
