<style>
nav .router-link-active {
  font-weight: bold;
}
</style>
<template>
  <nav>
    <ul>
      <li><NuxtLink to="/">Discussions</NuxtLink></li>
      <li><NuxtLink to="/about">About</NuxtLink></li>
    </ul>
  </nav>
  <main>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </main>
</template>
