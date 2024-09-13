<script lang="tsx">
import { getJson } from '@/util'
import { modsDir } from '@/mods'
import { ref } from 'vue';

export default {
    name: 'mod-item',
    props: ['src'],
    async setup(props, ctx) {
        const modDir = `${modsDir}/${props.src}`
        const info = await getJson(`${modDir}/manifest.json`)

        const title = ref(info.name)
        const img = ref(`${modDir}/icon.png`)
        const short = ref(info.short_description)
        const desc = ref(info.description)

        const source = ref(info.source)
        const downloads = ref(info.downloads)

        return {
            title,
            img,
            short,
            desc,
            
            source,
            downloads
        }
    }
}
</script>

<template id="mod-item">
<Suspense>
    <div class="mod-item">
        <div class="mod-item-body">
            <img :src="img">
            <h2>{{ title }}</h2>
            <p>{{ short }}</p>
            <!-- <div>
                <p class="smaller">{{ desc }}</p>
            </div> -->
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