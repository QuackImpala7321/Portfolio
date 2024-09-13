import { modsDir } from "./mods"

export async function getJson(path: string): Promise<any> {
    const contents = await fetch(path)
    return await contents.json()
}
export async function getModList(): Promise<string[]> {
    const json = await getJson(`${modsDir}/mods.json`)
    return json.dirs
}