import type { BaseEntity } from "@/types";

import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";

import { fetchMany } from "@/utils";

export const useStoriesListingStore = defineStore("storiesListing", () => {
  const stories = ref<BaseEntity[]>([]);
  const isStoriesLoading = ref(false);

  async function fetchNewStories(limit: number, batchSize: number) {
    const storiesIdsRequest = await fetch(
      "https://hacker-news.firebaseio.com/v0/newstories.json"
    );
    const storiesIds = await storiesIdsRequest.json();
    const usedStoriesIds = storiesIds.slice(0, limit);

    return await fetchMany(
      "https://hacker-news.firebaseio.com/v0/item/$.json",
      usedStoriesIds,
      batchSize
    );
  }

  async function refreshStories(withLoading: boolean = true) {
    if (isStoriesLoading.value) {
      return;
    }

    if (withLoading) {
      isStoriesLoading.value = true;
    }

    const newStories = await fetchNewStories(100, 25);
    stories.value = newStories;

    if (withLoading) {
      isStoriesLoading.value = false;
    }
  }

  return {
    stories,
    isStoriesLoading,
    fetchNewStories,
    refreshStories,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useStoriesListingStore, import.meta.hot)
  );
}
