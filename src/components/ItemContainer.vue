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
            const tiles = new Array(mods.length)
            for (let i = 0; i < mods.length; i++) {
                const mod = mods[i]
                const buffer = await ssrRenderComponent(ModTile, { src: `${this.dir}/${mod}` })
                const doc = document.createElement('html')
                doc.innerHTML = buffer[0].toString()
                const tile = doc.querySelector('body')?.firstChild as HTMLElement
                const image = tile.querySelector('img') as HTMLImageElement

                image.onload = () => {
                    tiles[i] = tile
                    if (!tiles.includes(undefined))
                        for (const tile of tiles)
                            container.appendChild(tile)
                }
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