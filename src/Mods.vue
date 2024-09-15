<script setup lang="ts">
import ItemContainer from './components/ItemContainer.vue';
import Navbar from './components/Navbar.vue';
</script>

<template>
  <Navbar />
  <div class="main-contents">
		<h1>Mods</h1>
    <ItemContainer dir="mods"/>
	</div>
</template>

<style src="./assets/style.css"></style>
