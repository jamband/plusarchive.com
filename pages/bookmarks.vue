<template>
  <div class="row">
    <div class="col-lg-4">
      <h2 class="my-2">Bookmarks</h2>
      <NLink :to="{ name: 'bookmarks' }" class="text-light">
        <fa icon="redo-alt" fixed-width /> Reset All
      </NLink>
      <TotalCount :total="pagination.totalCount" />
      <br>
      <SearchDropdown label="Countries" query="country" items="bookmarks/countries" />
      <SearchDropdown label="Tags" query="tag" items="bookmarks/tags" />
      <SearchForm class="d-lg-none mt-1 mb-3" />
    </div>
    <ListBookmarks />
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Bookmarks'
    }
  },
  computed: {
    pagination () {
      return this.$store.state.pagination
    }
  }
}
</script>
