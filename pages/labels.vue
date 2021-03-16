<template>
  <div class="row">
    <div class="col-lg-4">
      <h2 class="my-2">Labels</h2>
      <NLink :to="{ name: 'labels' }" class="text-light">
        <fa icon="redo-alt" fixed-width /> Reset All
      </NLink>
      <TotalCount :total="pagination.totalCount" />
      <br>
      <SearchDropdown label="Countries" query="country" items="labels/countries" />
      <SearchDropdown label="Tags" query="tag" items="labels/tags" />
      <SearchForm class="d-lg-none mt-1 mb-3" />
    </div>
    <div class="col-lg-8">
      <ListLabels :labels="labels" />
      <PaginationMinimal :current-page="pagination.currentPage" :page-count="pagination.pageCount" />
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
  watchQuery: ['country', 'page', 'tag']
}
</script>
