import { modsDir } from "@/pages/Mods/mods.ts"

export async function getJson(path: string): Promise<any> {
    const contents = await fetch(path)
    return await contents.json()
}
export async function getModList(dir: string): Promise<string[]> {
    const json = await getJson(`${modsDir}/${dir}/entries.json`)
    return json.dirs
}