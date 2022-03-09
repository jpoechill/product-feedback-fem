<template>
  <div class="">

    <!-- <div class="p-3 d-md-none"></div> -->
    <div class="mt-5">
      <slot class="mt-5" />
    </div>
  </div>
</template>

<script>
import { useStore } from '~~/stores/store'

export default {
  components: {
  },
  data: function () {
    return {
      isToggled: false,
      productRequests: useStore().productRequests,
      categoryFilterOptions: [
        {
          name: 'all',
          title: 'All',
          isActive: true
        },
        {
          name: 'ui',
          title: 'UI',
          isActive: false
        },
        {
          name: 'ux',
          title: 'UX',
          isActive: false
        },
        {
          name: 'enhancement',
          title: 'Enhancement',
          isActive: false
        },
        {
          name: 'bug',
          title: 'Bug',
          isActive: false
        },
        {
          name: 'feature',
          title: 'Feature',
          isActive: false
        },
      ],
    }
  },
  computed: {
    activeSortOption: function () {
      return this.sortOptions.find(x => x.isActive === true)
    },
    filterSuggestions: function () {
      return this.productRequests.filter(x => x.status === 'suggestion')
    },
    filterPlanned: function () {
      return this.productRequests.filter(x => x.status === 'planned')
    },
    filterInProgress: function () {
      return this.productRequests.filter(x => x.status === 'in-progress')
    },
    filterLive: function () {
      return this.productRequests.filter(x => x.status === 'live')
    }
    // ...mapState("movies", ["movieList"]),
  },
}
</script>

<style>
html, body {
  background-color: #f8f9fa;
}
</style>
