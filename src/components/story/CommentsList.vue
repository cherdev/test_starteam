<template>
  <q-tree :nodes="props.comments" node-key="id" @lazy-load="onLazyLoad">
    <template v-slot:default-header="prop">
      <comments-item :comment="prop.node" />
    </template>
  </q-tree>
</template>

<script setup lang="ts">
import type { CommentNode } from "@/types";

import { useStoryDetailStore } from "@/stores/storyDetail";

import CommentsItem from "@/components/story/CommentsItem.vue";

const props = defineProps<{
  comments: CommentNode[];
}>();

const storyStore = useStoryDetailStore();

async function onLazyLoad({ node, done }) {
  const comments = await storyStore.fetchComments(node.kids, 10);
  storyStore.checkSubcomments(comments);
  storyStore.filterDeletedComments(comments);
  done(comments);
}
</script>
