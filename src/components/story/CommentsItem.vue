<template>
  <div class="col">
    <div class="text-weight-bold">
      {{ props.comment?.by || "Anonymous author" }}
      <template> | {{ commentDate }}</template>
    </div>

    <div v-html="props.comment?.text"></div>
  </div>
</template>

<script setup lang="ts">
import type { CommentNode } from "@/types";

import { computed } from "vue";
import { formatTime } from "@/utils";

const props = defineProps<{
  comment: CommentNode;
}>();

const commentDate = computed(() => {
  if (props.comment.time) {
    return formatTime(props.comment.time);
  } else {
    return null;
  }
});
</script>
