<template>
  <q-list bordered separator>
    <story-item
      v-for="(item, index) in props.stories"
      :key="index"
      :story="item"
      :index="index"
    />
  </q-list>
</template>

<script setup lang="ts">
import type { BaseEntity } from "@/types";

import StoryItem from "@/components/home/StoryItem.vue";

const props = defineProps<{
  stories: BaseEntity[];
}>();
</script>
