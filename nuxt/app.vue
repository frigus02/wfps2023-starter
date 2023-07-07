<script setup lang="ts">
const menuItems = computed(() => {
  const {matched} = useRoute()
  const matchedName = matched[0]?.name

  return [
    {
      name: 'index',
      href: '/',
      label: 'Discussions',
    },
    {
      name: 'about',
      href: '/about',
      label: 'About',
    }
  ].map(item => Object.assign({
    isActive: matchedName === item.name
  }, item))
})
</script>
<style scoped>
nav li.active {
  font-weight: bold;
}
</style>
<template>
  <nav>
    <ul>
      <li v-for="item in menuItems" :key="item.name" :class="{ active: item.isActive }">
        <NuxtLink :href="item.href">{{ item.label }}</NuxtLink>
      </li>
    </ul>
  </nav>
  <main>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </main>
</template>
