<script lang="ts">
import { ref } from 'vue';

export default {
    props: ['desc'],
    setup(props, ctx) {
        const title = ref(document.title)
        const url = ref(document.URL)

        return { title, url }
    }
}
</script>

<template>
<head>
    <meta name="theme-color" content="#ffffff" />
    <meta property="og:type" content="website" />
    <meta property="og:title" :content="title" />
    <meta property="og:description" :content="desc" v-if="desc" />
    <meta property="og:url" :content="url" />
</head>
</template>