import { createApp } from 'vue'
import App from './Mods.vue'
import { getJson } from '@/util'

export const modsDir = "/database/projects"
createApp(App).mount('#app')

export async function getModList(dir: string): Promise<string[]> {
    const json = await getJson(`${modsDir}/${dir}/entries.json`)
    return json.dirs
}