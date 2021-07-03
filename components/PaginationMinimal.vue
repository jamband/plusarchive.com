<template>
  <nav v-if="hasPage()" class="text-center" aria-label="Page navigation">
    <div class="d-flex" @click.capture="blur">
      <NLink
        :to="link('first')"
        :class="linkClass('first')"
        aria-label="First"
        :aria-disabled="disabled('first')"
        :tabindex="disabled('first') ? -1 : 0"
      >
        <fa icon="angle-double-left" />
      </NLink>
      <NLink
        :to="link('previous')"
        :class="linkClass('previous')"
        aria-label="Previous"
        :aria-disabled="disabled('previous')"
        :tabindex="disabled('previous') ? -1 : 0"
      >
        <fa icon="angle-left" />
      </NLink>
      <NLink
        :to="link('next')"
        :class="linkClass('next')"
        aria-label="Next"
        :aria-disabled="disabled('next')"
        :tabindex="disabled('next') ? -1 : 0"
      >
        <fa icon="angle-right" />
      </NLink>
      <NLink
        :to="link('last')"
        :class="linkClass('last')"
        aria-label="Last"
        :aria-disabled="disabled('last')"
        :tabindex="disabled('last') ? -1 : 0"
      >
        <fa icon="angle-double-right" />
      </NLink>
    </div>
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
      event.target.blur()
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
    linkClass (part) {
      let selector = `flex-fill py-2 ${this.$style.link}`

      if (part === 'first') {
        selector += ` ${this.$style.first}`
      } else if (part === 'last') {
        selector += ` ${this.$style.last}`
      }

      if (this.hasTouchScreen) {
        selector += ` ${this.$style.touchable}`
      } else {
        selector += ` ${this.$style.clickable}`
      }

      if (this.disabled(part)) {
        selector += ` ${this.$style.disabled}`
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
@import "../node_modules/bootstrap/scss/mixins/transition";

.first {
  border-bottom-left-radius: $border-radius;
  border-top-left-radius: $border-radius;
}

.last {
  border-bottom-right-radius: $border-radius;
  border-top-right-radius: $border-radius;
}

.link {
  @include transition($pagination-transition);
}

.touchable {
  &:hover {
    color: $link-color;
  }

  &:active {
    background-color: $pagination-hover-bg;
    box-shadow: $pagination-focus-box-shadow;
  }
}

.clickable {
  &:hover {
    background-color: $pagination-hover-bg;
  }

  &:focus {
    box-shadow: $pagination-focus-box-shadow;
    outline: 0;
  }
}

.disabled {
  color: $pagination-disabled-color;
  pointer-events: none;

  &:hover {
    color: $pagination-disabled-color;
  }
}

.information {
  color: var(--bs-secondary);
  position: relative;
  z-index: -1;

  @include media-breakpoint-down(sm) {
    bottom: 2.4em;
    font-size: 75%;
  }

  @include media-breakpoint-up(sm) {
    bottom: 2.2em;
    font-size: 85%;
  }
}
</style>
