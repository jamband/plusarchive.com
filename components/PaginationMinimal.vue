<template>
  <nav v-if="hasPage()" class="text-center" aria-label="Page navigation">
    <div class="d-flex" role="presentation" @click="blur">
      <NLink
        :to="pageLink(1)"
        class="flex-fill py-2"
        :class="[
          $style.first,
          $style.touch,
          { [$style.link]: !hasTouchScreen },
          { [$style.disabled]: disabled('first') }
        ]"
        aria-label="First"
        :aria-disabled="disabled('first')"
        :tabindex="disabled('first') ? -1 : 0"
      >
        <fa icon="angle-double-left" />
      </NLink>
      <NLink
        :to="pageLink(currentPage - 1)"
        class="flex-fill py-2"
        :class="[
          $style.touch,
          { [$style.link]: !hasTouchScreen },
          { [$style.disabled]: disabled('previous') }
        ]"
        aria-label="Previous"
        :aria-disabled="disabled('previous')"
        :tabindex="disabled('previous') ? -1 : 0"
      >
        <fa icon="angle-left" />
      </NLink>
      <NLink
        :to="pageLink(currentPage + 1)"
        class="flex-fill py-2"
        :class="[
          $style.touch,
          { [$style.link]: !hasTouchScreen },
          { [$style.disabled]: disabled('next') }
        ]"
        aria-label="Next"
        :aria-disabled="disabled('next')"
        :tabindex="disabled('next') ? -1 : 0"
      >
        <fa icon="angle-right" />
      </NLink>
      <NLink
        :to="pageLink(pageCount)"
        class="flex-fill py-2"
        :class="[
          $style.last,
          $style.touch,
          { [$style.link]: !hasTouchScreen },
          { [$style.disabled]: disabled('last') }
        ]"
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
import { scrollToTop } from '~/utils/scroll'
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

<style lang="scss" module>
@import "../assets/css/variables";
@import "../node_modules/bootstrap/scss/mixins/breakpoints";

.first {
  border-bottom-left-radius: $border-radius;
  border-top-left-radius: $border-radius;
}

.last {
  border-bottom-right-radius: $border-radius;
  border-top-right-radius: $border-radius;
}

.touch {
  &:hover {
    color: $link-color;
  }

  &:active {
    background-color: rgba(white, 0.05);
    color: $link-hover-color;
  }
}

.link {
  &:hover {
    background-color: rgba(white, 0.05);
    color: $link-hover-color;
  }
}

.disabled {
  color: var(--bs-secondary);
  pointer-events: none;

  &:hover {
    color: var(--bs-secondary);
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
