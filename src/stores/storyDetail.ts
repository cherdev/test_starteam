import type { BaseEntity, CommentNode } from "@/types";

import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";

import { fetchMany, filterInPlace } from "@/utils";

export const useStoryDetailStore = defineStore("storyDetail", () => {
  const story = ref<BaseEntity | null>(null);
  const isStoryLoading = ref(true);

  const comments = ref<CommentNode[]>([]);
  const isCommentsLoading = ref(false);

  function filterDeletedComments(comments: CommentNode[]) {
    filterInPlace(comments, (el: CommentNode) => el.deleted !== true);
  }

  function checkSubcomments(comments: CommentNode[]) {
    for (let i = 0; i < comments.length; i++) {
      if (comments[i].kids) {
        comments[i].lazy = true;
      }
    }
  }

  async function fetchStory(storyId: number): Promise<BaseEntity> {
    const result = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
    );
    const data = await result.json();
    return data;
  }

  async function refreshStory(storyId: number) {
    isStoryLoading.value = true;

    const newStory = await fetchStory(storyId);
    story.value = newStory;

    isStoryLoading.value = false;
  }

  async function fetchComments(
    commentIds: number[],
    batchSize: number
  ): Promise<CommentNode[]> {
    return await fetchMany(
      "https://hacker-news.firebaseio.com/v0/item/$.json",
      commentIds,
      batchSize
    );
  }

  async function refreshComments() {
    if (story.value === null || !story.value.kids) {
      return;
    }

    isCommentsLoading.value = true;

    const newComments = await fetchComments(story.value.kids, 10);
    checkSubcomments(newComments);
    filterDeletedComments(newComments);
    comments.value = newComments;

    isCommentsLoading.value = false;
  }

  function $reset() {
    story.value = null;
    comments.value.length = 0;
    isStoryLoading.value = true;
    isCommentsLoading.value = false;
  }

  return {
    story,
    isStoryLoading,
    fetchStory,
    refreshStory,
    comments,
    isCommentsLoading,
    fetchComments,
    refreshComments,
    filterDeletedComments,
    checkSubcomments,
    $reset,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoryDetailStore, import.meta.hot));
}
