<script lang="ts">
import { getJson } from '@/util.ts'
import { modsDir } from '@/pages/Mods/mods.ts'
import { ref } from 'vue';

export default {
    name: 'mod-item',
    props: ['src'],
    async setup(props, ctx) {
        const modDir = `${modsDir}/${props.src}`
        const info = await getJson(`${modDir}/manifest.json`)

        return {
            title: ref(info.name),
            img: ref(`${modDir}/icon.png`),
            short: ref(info.short_description),
            desc: ref(info.description),
            
            source: ref(info.source),
            downloads: ref(info.downloads)
        }
    }
}
</script>

<template>
<Suspense>
    <div class="mod-item">
        <div class="mod-item-body">
            <img :src="img">
            <div class="mod-item-head">
                <h2>{{ title }}</h2>
                <p>{{ short }}</p>
            </div>
        </div>
        <div class="button-row">
            <a :href="source" v-if="source">
                <p>Source</p>
            </a>
            <a :href="downloads" v-if="downloads">
                <p>Downloads</p>
            </a>
        </div>
    </div>
</Suspense>
</template>