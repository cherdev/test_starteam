<template>
  <div>
    by {{ props.story.by }}
    <template v-if="storyPoints"> | {{ storyPoints }} </template>
    <template v-if="storyComments"> | {{ storyComments }} </template>
    <template v-if="storyDate"> | {{ storyDate }}</template>
  </div>
</template>

<script setup lang="ts">
import type { BaseEntity } from "@/types";

import { computed } from "vue";

import { pluralize, formatTime } from "@/utils";

const props = defineProps<{
  story: BaseEntity;
}>();

const storyPoints = computed(() => {
  if (props.story.score) {
    return `${props.story.score} ${pluralize(props.story.score, "point")}`;
  } else {
    return null;
  }
});

const storyComments = computed(() => {
  if (props.story.descendants !== undefined) {
    return `${props.story.descendants} ${pluralize(
      props.story.descendants,
      "comment"
    )}`;
  } else {
    return null;
  }
});

const storyDate = computed(() => {
  if (props.story.time) {
    return formatTime(props.story.time);
  } else {
    return null;
  }
});
</script>
