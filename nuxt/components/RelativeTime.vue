<script setup lang="ts">
const props = defineProps<{
  ts: string;
}>();

const relativeTime = computed(() => {
  const formatter = new Intl.RelativeTimeFormat("en", { style: "long" });
  const diffSec = (Date.now() - new Date(props.ts).getTime()) / 1000;
  if (diffSec < 60) {
    return formatter.format(-Math.floor(diffSec), "second");
  } else if (diffSec < 60 * 60) {
    return formatter.format(-Math.floor(diffSec / 60), "minute");
  } else if (diffSec < 60 * 60 * 24) {
    return formatter.format(-Math.floor(diffSec / 60 / 60), "hour");
  } else {
    return formatter.format(-Math.floor(diffSec / 60 / 60 / 24), "day");
  }
});
</script>
<template>
  <span :title="ts" class="relative-time">{{ relativeTime }}</span>
</template>
