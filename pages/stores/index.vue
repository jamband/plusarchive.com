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
        <article
          v-for="store in stores"
          :key="store.id"
          class="col-lg-6 mb-3"
        >
          <section class="mb-1">
            <a :href="store.url" rel="noopener" target="_blank">
              <strong>
                <fa icon="external-link-alt" fixed-width />
                {{ store.name }}
              </strong>
            </a>
          </section>
          <section class="mb-1">
            <span class="me-2 text-body">Country:</span>
            {{ store.country }}
          </section>
          <section class="mb-1">
            <span class="me-2 text-body">Links:</span>
            <BrandIconLink :links="store.link" />
          </section>
          <section class="mb-1">
            <span class="me-2 text-body">Tags:</span>
            <NLink
              v-for="tag in store.tags"
              :key="tag.id"
              class="tag"
              :to="{ name: 'stores', query: { tag: tag.name } }"
            >
              {{ tag.name }}
            </NLink>
          </section>
          <hr class="text-muted">
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
import { BrandIconLink } from '~/components/brand-icon-link'
import { PaginationMinimal } from '~/components/pagination-minimal'
import { TotalCount } from '~/components/total-count'
import { SearchDropdown } from '~/components/search-dropdown'
import { SearchForm } from '~/components/search-form'

export default {
  components: {
    BrandIconLink,
    PaginationMinimal,
    TotalCount,
    SearchDropdown,
    SearchForm
  },
  async asyncData ({ $axios, query }) {
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
