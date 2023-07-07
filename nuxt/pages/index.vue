<script lang="ts" setup>
import type { DiscussionListResponse } from "../server/api/discussions";

const { data } = await useFetch<DiscussionListResponse>("/api/discussions");
</script>
<template>
  <section>
    <h1>Discussions</h1>
    <ol class="discussions" v-if="data">
      <li v-for="discussion in data.discussions" :key="discussion.id">
        <NuxtLink :href="`/discussions/${discussion.number}`">{{
          discussion.title
        }}</NuxtLink>
        <p>
          {{ discussion.author }} started
          <relative-time :ts="discussion.createdAt" />
        </p>
      </li>
    </ol>
  </section>
</template>
