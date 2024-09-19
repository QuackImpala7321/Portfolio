<script lang="ts">
export default {
    props: ['text']
}
</script>

<template>
    <div class="checkbox">
        <input type="checkbox">
        <p v-if="text">{{ text }}</p>
    </div>
</template>