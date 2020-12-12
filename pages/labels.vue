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
    <ListLabels />
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Labels'
    }
  },
  computed: {
    pagination () {
      return this.$store.state.pagination
    }
  }
}
</script>
