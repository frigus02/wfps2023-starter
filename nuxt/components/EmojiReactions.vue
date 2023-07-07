<script setup lang="ts">
defineProps<{
  groups: Array<{
    content: string;
    reactors: {
      totalCount: number;
    };
  }>;
}>();

const pickerIsVisible = ref(false);

const togglePicker = () => {
  pickerIsVisible.value = !pickerIsVisible.value;
};

const EMOJI_LOOKUP = new Map([
  ["THUMBS_UP", "👍"],
  ["THUMBS_DOWN", "👎"],
  ["LAUGH", "😄"],
  ["HOORAY", "🎉"],
  ["CONFUSED", "😕"],
  ["HEART", "❤️"],
  ["ROCKET", "🚀"],
  ["EYES", "👀"],
]);
</script>
<template>
  <template v-for="group in groups" :key="group.content">
    <button v-if="group.reactors.totalCount > 0" disabled>
      {{ EMOJI_LOOKUP.get(group.content) }} {{ group.reactors.totalCount }}
    </button>
  </template>
  <button @click="togglePicker">Add reaction</button>
  <dialog :open="pickerIsVisible">
    <button v-for="group in groups" :key="group.content">
      {{ EMOJI_LOOKUP.get(group.content) }}
    </button>
  </dialog>
</template>
