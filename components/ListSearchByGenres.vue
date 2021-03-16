<template>
  <div>
    <div v-for="genre in genres" :key="genre.id" class="d-inline-block">
      <NLink :to="{ name: 'tracks', query: { genre } }" class="badge badge-secondary">{{ genre }}</NLink>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    genres: {
      type: Array,
      required: true
    }
  }
}
</script>
