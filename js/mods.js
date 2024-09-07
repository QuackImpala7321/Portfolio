const modsDir = "/database/projects/mods"

document.addEventListener('DOMContentLoaded', async function() {
    const container = document.querySelector('.item-container')
    const mods = await getModList()
    const tiles = []
    for (const dir of mods)
        tiles.push(await displayMod(dir, container))
    for (const tile of tiles)
        container.appendChild(tile)
})

/**
 * @param {string} dir
 * @returns {Promise<void>} The mod tile generated from dir
 */
async function displayMod(dir) {
    const modDir = `${modsDir}/${dir}`
    const info = await getJson(`${modDir}/manifest.json`)

    const buttons = document.createElement('div')
    buttons.className = 'button-row'
    const tile = document.createElement('div')
    tile.className = 'mod-item'
    const body = document.createElement('div')
    body.className = 'mod-item-body'

    const image = document.createElement('img')
    const title = document.createElement('h2')
    const paragraph = document.createElement('p')

    if (info.source) {
        const button = document.createElement('a')
        const p = document.createElement('p')
        p.appendChild(document.createTextNode('Source'))
        button.href = info.source
        button.appendChild(p)
        buttons.appendChild(button)
    }
    if (info.downloads) {
        const button = document.createElement('a')
        const p = document.createElement('p')
        p.appendChild(document.createTextNode('Downloads'))
        button.href = info.downloads
        button.appendChild(p)
        buttons.appendChild(button)
    }

    // item body
    image.src = `${modDir}/icon.png`
    title.appendChild(document.createTextNode(info.name))
    paragraph.appendChild(document.createTextNode(info.short_description))

    
    body.appendChild(image)
    body.appendChild(title)
    body.appendChild(paragraph)
    tile.appendChild(body)
    tile.appendChild(buttons)
    return tile
}

/**
 * Gets the mod list from mods.json
 * @returns {Promise<string[]>}
 */
async function getModList() {
    const json = await getJson(`${modsDir}/mods.json`)
    return json.dirs
}

/**
 * Gets the json contents of file
 * @param {string} path 
 * @returns {Promise<any>}
 */
async function getJson(path) {
    const contents = await fetch(path)
    return await contents.json()
}