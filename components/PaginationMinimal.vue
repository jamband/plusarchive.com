<template>
  <nav v-if="hasPage()" class="text-center" aria-label="Page navigation">
    <ul class="pagination">
      <li :class="itemClass('first')">
        <NLink
          :to="link('first')"
          :class="linkClass()"
          aria-label="First"
          :aria-disabled="disabled('first')"
          :tabindex="disabled('first') ? -1 : 0"
          @click.native.capture="blur"
        >
          <fa icon="angle-double-left" />
        </NLink>
      </li>
      <li :class="itemClass('previous')">
        <NLink
          :to="link('previous')"
          :class="linkClass()"
          aria-label="Previous"
          :aria-disabled="disabled('previous')"
          :tabindex="disabled('previous') ? -1 : 0"
          @click.native.capture="blur"
        >
          <fa icon="angle-left" />
        </NLink>
      </li>
      <li :class="itemClass('next')">
        <NLink
          :to="link('next')"
          :class="linkClass()"
          aria-label="Next"
          :aria-disabled="disabled('next')"
          :tabindex="disabled('next') ? -1 : 0"
          @click.native.capture="blur"
        >
          <fa icon="angle-right" />
        </NLink>
      </li>
      <li :class="itemClass('last')">
        <NLink
          :to="link('last')"
          :class="linkClass()"
          aria-label="Last"
          :aria-disabled="disabled('last')"
          :tabindex="disabled('last') ? -1 : 0"
          @click.native.capture="blur"
        >
          <fa icon="angle-double-right" />
        </NLink>
      </li>
    </ul>
    <div :class="$style.information" aria-label="Page information">
      {{ currentPage }}/{{ pageCount }}
    </div>
  </nav>
</template>

<script>
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
      return ['first', 'previous'].includes(part)
        ? this.currentPage < 2
        : this.currentPage >= this.pageCount
    },
    blur (event) {
      event.currentTarget.blur()
    },
    link (part) {
      let page = 1

      if (part === 'previous' && this.currentPage > 1) {
        page = this.currentPage - 1
      } else if (part === 'next' && this.currentPage === this.pageCount) {
        page = this.pageCount
      } else if (part === 'next' && this.currentPage !== this.pageCount) {
        page = this.currentPage + 1
      } else if (part === 'last') {
        page = this.pageCount
      }

      return {
        name: this.$route.name,
        query: { ...this.$route.query, page }
      }
    },
    itemClass (part) {
      let selector = 'page-item flex-fill'
      if (this.disabled(part)) {
        selector += ' disabled'
      }
      return selector
    },
    linkClass () {
      let selector = `page-link ${this.$style.link}`
      if (!this.hasTouchScreen) {
        selector += ` ${this.$style.clickable}`
      }
      return selector
    },
    hasPage () {
      return this.pageCount > 1
    }
  }
}
</script>

<style lang="scss" module>
@import "../assets/css/variables";
@import "../node_modules/bootstrap/scss/mixins/breakpoints";

.link {
  @include media-breakpoint-down(sm) {
    font-size: 85%;
  }
}

.clickable {
  &:hover {
    background-color: $pagination-focus-bg;
  }
}

.information {
  color: var(--bs-secondary);
  position: relative;
  z-index: -1;

  @include media-breakpoint-down(sm) {
    bottom: 3.7em;
    font-size: 75%;
  }

  @include media-breakpoint-up(sm) {
    bottom: 3.3em;
    font-size: 85%;
  }
}
</style>
