<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Newsletter from '@/components/Newsletter.vue';
import NewsSignup from '@/components/NewsSignup.vue';
</script>

<template>
  <Navbar />
  <div class="main-contents" style="margin-left: 400px; margin-right: 400px;">
    <h1>Yep this is my website</h1>
    <NewsSignup />
    <Newsletter />
  </div>
</template>

<style src="@/assets/style.css" />
