<template>
  <div class="row">
    <div class="col-lg-4">
      <h1 class="mt-0 mb-3">Labels</h1>
      <NLink :to="{ name: 'labels' }" class="tag">
        <fa icon="redo-alt" size="sm" /> Reset All
      </NLink>
      <TotalCount class="me-3" :total="pagination.totalCount" />
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
      <div class="row">
        <div v-for="label in labels" :key="label.id" class="col-lg-6 mb-3 mb-sm-4">
          <a :href="label.url" class="fw-bold" rel="noopener" target="_blank">
            <fa icon="external-link-alt" size="sm" fixed-width />
            {{ label.name }}
          </a>
          <br>
          <span class="me-2 text-body">Country:</span>
          {{ label.country }}
          <br>
          <span class="me-2 text-body">Link:</span>
          <BrandIconLink :links="label.link" />
          <br>
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

    return {
      labels: labels.items,
      pagination: labels._meta
    }
  },
  head () {
    return {
      title: 'Labels'
    }
  },
  watchQuery: ['country', 'page', 'q', 'tag']
}
</script>
