<template>
  <q-header bordered class="bg-primary text-white">
    <q-toolbar>
      <q-toolbar-title> Hacker news clone </q-toolbar-title>

      <div v-if="route.name === 'home'" class="row no-wrap q-gutter-sm">
        <q-btn
          color="white"
          text-color="black"
          label="Refresh stories"
          @click="handleStoriesRefresh"
        />
      </div>

      <div v-else-if="route.name === 'story'" class="row no-wrap q-gutter-sm">
        <q-btn color="white" text-color="black" label="Home" to="/" />
        <q-btn
          color="white"
          text-color="black"
          label="Refresh comments"
          @click="handleCommentsRefresh"
        />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

import { useStoriesListingStore } from "@/stores/storiesListing";
import { useStoryDetailStore } from "@/stores/storyDetail";

const route = useRoute();
const storiesListingStore = useStoriesListingStore();
const storyDetailStore = useStoryDetailStore();

async function handleStoriesRefresh() {
  await storiesListingStore.refreshStories();
}

async function handleCommentsRefresh() {
  await storyDetailStore.refreshComments();
}
</script>
