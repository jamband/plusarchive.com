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
        <article
          v-for="label in labels"
          :key="label.id"
          class="col-lg-6 mb-3"
        >
          <section class="mb-1">
            <a :href="label.url" rel="noopener" target="_blank">
              <strong>
                <fa icon="external-link-alt" fixed-width />
                {{ label.name }}
              </strong>
            </a>
          </section>
          <section class="mb-1">
            <span class="me-2 text-light">Country:</span>
            <NLink
              :to="{ name:'labels', query: { country: label.country } }"
              class="tag"
            >
              {{ label.country }}
            </NLink>
          </section>
          <section class="mb-1">
            <span class="me-2 text-light">Links:</span>
            <BrandIconLink :links="label.link" />
          </section>
          <section class="mb-1">
            <span class="me-2 text-light">Tags:</span>
            <NLink
              v-for="tag in label.tags"
              :key="tag.id"
              :to="{ name: 'labels', query: { tag: tag.name } }"
              class="tag"
            >
              {{ tag.name }}
            </NLink>
          </section>
          <hr>
        </article>
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
  async asyncData ({ $axios, query }) {
    const url = query.q ? 'labels/search' : 'labels'
    const labels = await $axios.$get(`${url}?expand=tags`, {
      params: query
    })

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
