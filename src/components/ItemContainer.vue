<script lang="ts">
import { getModList } from '@/pages/Mods/mods'
import { ssrRenderComponent } from 'vue/server-renderer';
import ModTile from './ModTile.vue';

export default {
    name: 'item-container',
    props: ['dir'],
    async mounted() {
        await this.populateModList()
    },
    methods: {
        async populateModList() {
            const container: HTMLElement = this.$el.firstChild
            const mods = await getModList(this.dir)
            for (const mod of mods) {
                const buffer = await ssrRenderComponent(ModTile, { src: `${this.dir}/${mod}` })
                const doc = document.createElement('html')
                doc.innerHTML = buffer[0].toString()
                const tile = doc.querySelector('body')?.firstChild as HTMLElement
                if (!tile) {
                    console.error("Tile does not contain body child.")
                    return
                }
                container.appendChild(tile)
                tile.hidden = true
            }
        }
    }
}

</script>

<template>
<Suspense>
    <div>
        <div class="item-container"></div>
    </div>
</Suspense>
</template>