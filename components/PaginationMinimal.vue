<template>
  <nav v-if="hasPage()" class="text-center" aria-label="Page navigation">
    <ul class="pagination d-flex" @click="blur">
      <li :class="disabledSelector('first')" class="page-item flex-fill">
        <NLink
          :to="pageLink(1)"
          :aria-current-value="null"
          :aria-disabled="disabled('first')"
          :tabindex="disabled('first') ? -1 : 0"
          class="page-link"
          :class="{ 'pagination-minimal-link': !hasTouchScreen }"
          aria-label="First"
        >
          <fa icon="angle-double-left" />
        </NLink>
      </li>
      <li :class="disabledSelector('prev')" class="page-item flex-fill">
        <NLink
          :to="pageLink(currentPage - 1)"
          :aria-current-value="null"
          :aria-disabled="disabled('prev')"
          :tabindex="disabled('prev') ? -1 : 0"
          class="page-link"
          :class="{ 'pagination-minimal-link': !hasTouchScreen }"
          aria-label="Previous"
        >
          <fa icon="angle-left" />
        </NLink>
      </li>
      <li :class="disabledSelector('next')" class="page-item flex-fill">
        <NLink
          :to="pageLink(currentPage + 1)"
          :aria-current-value="null"
          :aria-disabled="disabled('next')"
          :tabindex="disabled('next') ? -1 : 0"
          class="page-link"
          :class="{ 'pagination-minimal-link': !hasTouchScreen }"
          aria-label="Next"
        >
          <fa icon="angle-right" />
        </NLink>
      </li>
      <li :class="disabledSelector('next')" class="page-item flex-fill">
        <NLink
          :to="pageLink(pageCount)"
          :aria-current-value="null"
          :aria-disabled="disabled('last')"
          :tabindex="disabled('last') ? -1 : 0"
          class="page-link"
          :class="{ 'pagination-minimal-link': !hasTouchScreen }"
          aria-label="Last"
        >
          <fa icon="angle-double-right" />
        </NLink>
      </li>
    </ul>
    <div class="pagination-minimal-info" aria-label="Page information">
      {{ currentPage }}/{{ pageCount }}
    </div>
  </nav>
</template>

<script>
import { scrollToTop } from '~/plugins/scroll'
import { hasTouchScreen } from '~/utils/screen'

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
  data () {
    return {
      hasTouchScreen: false
    }
  },
  mounted () {
    this.hasTouchScreen = hasTouchScreen()
  },
  methods: {
    disabled (part) {
      return ['first', 'prev'].includes(part)
        ? this.currentPage < 2
        : this.currentPage >= this.pageCount
    },
    disabledSelector (part) {
      return this.disabled(part) ? 'disabled' : ''
    },
    blur (event) {
      event.target.blur()
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
@import "../assets/css/variables";
@import "~bootstrap/scss/mixins/breakpoints";

.pagination-minimal {
  &-info {
    color: #474747;
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

  &-link {
    &:hover {
      background-color: $pagination-focus-bg;
      color: $primary;
    }
  }
}
</style>
