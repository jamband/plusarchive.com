<template>
  <nav v-if="hasPage()" aria-label="Page navigation">
    <ul class="pagination">
      <li class="page-item w-25" :class="disabled('first')">
        <NLink :to="pageLink(1)" class="page-link text-center" append exact>
          <fa icon="angle-double-left" />
        </NLink>
      </li>
      <li class="page-item w-25" :class="disabled('prev')">
        <NLink :to="pageLink(currentPage - 1)" class="page-link text-center" append exact>
          <fa icon="angle-left" />
        </NLink>
      </li>
      <li class="page-item w-25" :class="disabled('next')">
        <NLink :to="pageLink(currentPage + 1)" class="page-link text-center" exact>
          <fa icon="angle-right" />
        </NLink>
      </li>
      <li class="page-item w-25" :class="disabled('last')">
        <NLink :to="pageLink(pageCount)" class="page-link text-center" exact>
          <fa icon="angle-double-right" />
        </NLink>
      </li>
    </ul>
    <div class="pagination-minimal-info text-center">
      {{ currentPage }}/{{ pageCount }}
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    pageCount: {
      type: Number,
      required: true
    }
  },
  methods: {
    disabled (part) {
      if (/^(first|prev)$/.test(part)) {
        return this.currentPage < 2 ? 'disabled' : ''
      } else {
        return this.currentPage >= this.pageCount ? 'disabled' : ''
      }
    },
    pageLink (page) {
      this.$scroll.toTop()
      return { query: { ...this.$route.query, page } }
    },
    hasPage () {
      return this.pageCount > 1
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/css/variables";
@import "~bootstrap/scss/mixins/breakpoints";

.pagination-minimal {
  &-info {
    position: relative;
    z-index: -1;
    color: $gray-700;

    @include media-breakpoint-only(xs) {
      font-size: 75%;
      bottom: 3.4em;
    }

    @include media-breakpoint-up(sm) {
      font-size: 85%;
      bottom: 3.1em;
    }
  }
}
</style>
