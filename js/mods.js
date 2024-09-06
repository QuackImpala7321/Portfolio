const modsDir = "/database/projects/mods"

document.addEventListener('DOMContentLoaded', async function() {
    const container = document.querySelector('.item-container')
    const mods = await getModList()
    for (const dir of mods)
        await displayMod(dir, container)
})

/**
 * Adds the mod page to 
 * @param {string} dir 
 * @param {Element} container
 * @returns {Promise<void>}
 */
async function displayMod(dir, container) {
    const modDir = `${modsDir}/${dir}`
    const info = await getJson(`${modDir}/manifest.json`)
    console.log(info)

    const listNode = document.createElement('li')
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

    tile.appendChild(body)
    tile.appendChild(buttons)
    listNode.appendChild(tile)
    body.appendChild(image)
    body.appendChild(title)
    body.appendChild(paragraph)
    container.appendChild(listNode)
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