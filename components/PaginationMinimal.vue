<template>
  <nav v-if="hasPage()" aria-label="Page navigation">
    <ul class="pagination text-center">
      <li class="page-item w-25" :class="disabled('first')">
        <NLink :to="pageLink(1)" class="page-link" append exact>
          <fa icon="angle-double-left" />
        </NLink>
      </li>
      <li class="page-item w-25" :class="disabled('prev')">
        <NLink :to="pageLink(currentPage - 1)" class="page-link" append exact>
          <fa icon="angle-left" />
        </NLink>
      </li>
      <li class="page-item w-25" :class="disabled('next')">
        <NLink :to="pageLink(currentPage + 1)" class="page-link" exact>
          <fa icon="angle-right" />
        </NLink>
      </li>
      <li class="page-item w-25" :class="disabled('last')">
        <NLink :to="pageLink(pageCount)" class="page-link" exact>
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
import { scrollToTop } from '~/plugins/scroll'

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
      scrollToTop()
      return { query: { ...this.$route.query, page } }
    },
    hasPage () {
      return this.pageCount > 1
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination-minimal {
  &-info {
    color: $gray-700;
    position: relative;
    z-index: -1;

    @include media-breakpoint-only(xs) {
      bottom: 3.4em;
      font-size: 75%;
    }

    @include media-breakpoint-up(sm) {
      bottom: 3.1em;
      font-size: 85%;
    }
  }
}
</style>
