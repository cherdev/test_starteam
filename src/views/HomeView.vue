<template>
  <div class="row">
    <div v-if="storiesListingStore.isStoriesLoading" class="q-mx-auto">
      <q-circular-progress
        indeterminate
        rounded
        size="50px"
        color="light-blue"
        class="q-ma-md"
      />
    </div>

    <stories-list
      v-else
      class="col-10 q-mx-auto"
      :stories="storiesListingStore.stories"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from "vue";

import { useStoriesListingStore } from "@/stores/storiesListing";

import StoriesList from "@/components/home/StoriesList.vue";

const storiesListingStore = useStoriesListingStore();
let refreshTimer: number | null = null;

onMounted(async () => {
  if (storiesListingStore.stories.length === 0) {
    await storiesListingStore.refreshStories();
  }

  refreshTimer = setInterval(async () => {
    await storiesListingStore.refreshStories(false);
  }, 60 * 1000);
});

onBeforeUnmount(() => {
  if (refreshTimer) {
    clearInterval(refreshTimer);
  }
});
</script>
