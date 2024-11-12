<template>
  <div>
    <a :href="props.story?.url" class="text-h6">
      {{ props.story?.title }}
    </a>

    <div>
      <story-details :story="props.story" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BaseEntity } from "@/types";

import StoryDetails from "@/components/common/StoryDetails.vue";

const props = defineProps<{
  story: BaseEntity;
}>();
</script>
