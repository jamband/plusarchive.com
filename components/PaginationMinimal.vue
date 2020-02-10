<template>
  <nav v-if="hasPage()" aria-label="Page navigation">
    <ul class="pagination">
      <li class="page-item w-25" :class="disabled('first')">
        <n-link :to="pageLink(1)" class="page-link text-center" append exact ontouchstart="">
          <fa icon="angle-double-left" />
        </n-link>
      </li>
      <li class="page-item w-25" :class="disabled('prev')">
        <n-link :to="pageLink(currentPage - 1)" class="page-link text-center" append exact ontouchstart="">
          <fa icon="angle-left" />
        </n-link>
      </li>
      <li class="page-item w-25" :class="disabled('next')">
        <n-link :to="pageLink(currentPage + 1)" class="page-link text-center" exact ontouchstart="">
          <fa icon="angle-right" />
        </n-link>
      </li>
      <li class="page-item w-25" :class="disabled('last')">
        <n-link :to="pageLink(pageCount)" class="page-link text-center" exact ontouchstart="">
          <fa icon="angle-double-right" />
        </n-link>
      </li>
    </ul>
    <div class="info text-center">
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

.pagination {
  > li {
    @include media-breakpoint-down(sm) {
      font-size: 80%;
    }
  }

  .page-link {
    &:hover {
      @include media-breakpoint-down(sm) {
        color: $primary;
        background-color: transparent;
      }
    }

    &:active {
      outline: 0;
      box-shadow: 0 0 0 .2rem rgba($primary, .25);

      @include media-breakpoint-down(sm) {
        color: $link-hover-color;
        background-color: $pagination-hover-bg;
      }
    }
  }
}

.info {
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
</style>
