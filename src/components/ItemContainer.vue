<script lang="ts">
import { getModList as getEntries } from '../util.ts'
import { ssrRenderComponent } from 'vue/server-renderer';
import ModTile from './ModTile.vue';

export default {
    name: 'item-container',
    props: ['dir'],
    mounted() {
        this.populateModList()
    },
    methods: {
        populateModList() {
            const container: Element = this.$el.firstChild
            getEntries(this.dir).then(mods => {
                for (const mod of mods) {
                    const r = ssrRenderComponent(ModTile, { src: `${this.dir}/${mod}` })
                    if (!(r instanceof Promise))
                        throw new Error("Component is not async!")
                    r.then(buffer => {
                        const doc = document.createElement('html')
                        doc.innerHTML = buffer.toString()
                        const tile = doc.querySelector('body')?.firstChild
                        if (!tile) {
                            console.error("Tile does not contain body child.")
                            return
                        }
                        container.appendChild(tile)
                    })
                }
            })
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