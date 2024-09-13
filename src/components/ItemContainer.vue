<script lang="ts">
import { getModList } from '@/util'
import { ssrRenderComponent } from 'vue/server-renderer';
import ModTile from './ModTile.vue';

export default {
    mounted() {
        this.populateModList()
    },
    methods: {
        populateModList() {
            const container: Element = this.$el.firstChild
            getModList().then(mods => {
                for (const mod of mods) {
                    const r = ssrRenderComponent(ModTile, { src: mod })
                    if (!(r instanceof Promise))
                        throw new Error("Component is not async!")
                    r.then(buffer => {
                        const doc = Document.parseHTMLUnsafe(buffer.toString())
                        const tile = doc.body.firstChild
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