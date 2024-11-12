<template>
  <div class="row">
    <div v-if="storyDetailStore.isStoryLoading" class="q-mx-auto">
      <q-circular-progress
        indeterminate
        rounded
        size="50px"
        color="light-blue"
        class="q-ma-md"
      />
    </div>

    <div v-else class="column col-10 q-mx-auto">
      <story-info class="q-py-md" :story="storyDetailStore.story!" />

      <div
        v-if="
          storyDetailStore.isStoryLoading || storyDetailStore.isCommentsLoading
        "
        class="q-mx-auto"
      >
        <q-circular-progress
          indeterminate
          rounded
          size="50px"
          color="light-blue"
          class="q-ma-md"
        />
      </div>
      <comments-list
        v-else-if="storyDetailStore.comments.length"
        :comments="storyDetailStore.comments"
        class="q-pb-xl"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";

import { useStoryDetailStore } from "@/stores/storyDetail";

import StoryInfo from "@/components/story/StoryInfo.vue";
import CommentsList from "@/components/story/CommentsList.vue";

const route = useRoute();
const storyDetailStore = useStoryDetailStore();

onMounted(async () => {
  await storyDetailStore.refreshStory(+route.params.id);

  if (storyDetailStore.story?.kids) {
    await storyDetailStore.refreshComments();
  }
});

onBeforeUnmount(() => {
  storyDetailStore.$reset();
});
</script>
