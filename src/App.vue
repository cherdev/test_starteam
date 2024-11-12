<template>
  <q-layout view="hHh lpR fFf">
    <v-header />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";

import VHeader from "@/components/common/VHeader.vue";
</script>
