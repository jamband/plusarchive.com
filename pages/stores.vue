<template>
  <div class="row">
    <div class="col-lg-4">
      <h2 class="my-2">Stores</h2>
      <NLink :to="{ name: 'stores' }" class="text-light">
        <fa icon="redo-alt" fixed-width /> Reset All
      </NLink>
      <TotalCount :total="pagination.totalCount" />
      <br>
      <SearchDropdown label="Countries" query="country" items="stores/countries" />
      <SearchDropdown label="Tags" query="tag" items="stores/tags" />
      <SearchForm class="d-lg-none mt-1 mb-3" />
    </div>
    <ListStores />
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Stores'
    }
  },
  computed: {
    pagination () {
      return this.$store.state.pagination
    }
  }
}
</script>
