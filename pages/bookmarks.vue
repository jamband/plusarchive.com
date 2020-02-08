<template>
  <div class="row">
    <div class="col-lg-4">
      <h2 class="my-2">Bookmarks</h2>
      <nuxt-link :to="{ name: 'bookmarks' }" class="text-light">
        <fa icon="redo-alt" fixed-width /> Reset All
      </nuxt-link>
      <TotalCount />
      <br>
      <SearchDropdown label="Countries" query="country" :items="countries" />
      <SearchDropdown label="Tags" query="tag" :items="tags" />
      <SearchForm class="d-lg-none mt-1 mb-3" />
    </div>
    <div class="col-lg-8">
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
          <nuxt-link v-for="tag in bookmark.tags" :key="tag.id" :to="{ query: { tag: tag.name } }" class="badge badge-secondary" append>
            {{ tag.name }}
          </nuxt-link>
          <hr class="text-light">
        </div>
      </div>
      <PaginationMinimal />
    </div>
  </div>
</template>

<script>
import BrandIconLink from '~/components/BrandIconLink'
import PaginationMinimal from '~/components/PaginationMinimal'
import SearchDropdown from '~/components/SearchDropdown'
import SearchForm from '~/components/SearchForm'
import TotalCount from '~/components/TotalCount'

export default {
  components: {
    BrandIconLink,
    PaginationMinimal,
    SearchDropdown,
    SearchForm,
    TotalCount
  },
  async fetch ({ store, query, error }) {
    await Promise.all([
      store.dispatch('bookmark/fetchItems', { query, error }),
      store.dispatch('bookmark/fetchCountriesAndTags', { error })
    ])
  },
  computed: {
    bookmarks () {
      return this.$store.state.bookmark.items
    },
    countries () {
      return this.$store.state.bookmark.countries
    },
    tags () {
      return this.$store.state.bookmark.tags
    }
  },
  head () {
    return {
      title: `Bookmarks - ${this.$app.name}`
    }
  },
  watchQuery: true
}
</script>
