<script lang="js">
import { getJson } from '@/util';
import { ssrRenderComponent } from 'vue/server-renderer';
import NewsItem from './NewsItem.vue';

export default {
    async mounted() {
        const entries = await getJson("/database/newsletter/entries.json")
        for (let i = 0; i < entries.length; i++) {
            const entry = entries[i]

            const buffer = await ssrRenderComponent(NewsItem, { src: entry })
            const doc = document.createElement('html')
            doc.innerHTML = buffer[0]
            const item = doc.querySelector('.news-item')
            this.$el.appendChild(item)

            if (i < entries.length - 1) {
                const div = document.createElement('div')
                div.className = 'hr-wrapper'
                const hr = document.createElement('hr')
                div.appendChild(hr)
                this.$el.appendChild(div)
            }
        }
    },
}
</script>

<template>
<Suspense>
    <div class="newsletter"></div>
</Suspense>
</template>