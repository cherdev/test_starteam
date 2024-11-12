<template>
  <q-item :to="`/story/${props.story.id}`" clickable v-ripple>
    <q-item-section avatar>
      {{ index + 1 }}
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.story.title }}</q-item-label>

      <q-item-label caption>
        <story-details :story="props.story" />
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import type { BaseEntity } from "@/types";

import StoryDetails from "@/components/common/StoryDetails.vue";

const props = defineProps<{
  story: BaseEntity;
  index: number;
}>();
</script>
