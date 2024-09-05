const modsDir = "/database/projects/mods"

document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.item-container')
    getModList()
    .then(mods => {
        for (const dir of mods)
            displayMod(dir, container)
    })
    .catch(e => console.error(e))
})

/**
 * Adds the mod page to 
 * @param {string} dir 
 * @param {Element} container
 */
function displayMod(dir, container) {
    const modDir = `${modsDir}/${dir}`
    getJson(`${modDir}/manifest.json`)
    .then(info => {
        console.log(info)

        const listNode = document.createElement('li')
        const a = document.createElement('a')
        a.className = 'mod-item'
        a.href = info.source ? info.source : '#'

        const image = document.createElement('img')
        const title = document.createElement('h2')
        const paragraph = document.createElement('p')
        const bottomRow = document.createElement('ol')
        bottomRow.className = 'item-button-row'

        // bottom row
        const source = document.createElement('a')
        const downloads = document.createElement('a')
        source.className = 'source-buttom'
        downloads.className = 'source-button'
        const sourceParagraph = document.createElement('p')
        const downloadsParagraph = document.createElement('p')

        sourceParagraph.appendChild(document.createTextNode('Source'))
        downloadsParagraph.appendChild(document.createTextNode('Downloads'))
        source.appendChild(sourceParagraph)
        downloads.appendChild(downloadsParagraph)
        bottomRow.appendChild(source)
        bottomRow.appendChild(downloads)

        // item body
        image.src = `${modDir}/icon.png`
        title.appendChild(document.createTextNode(info.name))
        paragraph.appendChild(document.createTextNode(info.short_description))

        listNode.appendChild(a)
        a.appendChild(image)
        a.appendChild(title)
        a.appendChild(paragraph)
        a.appendChild(bottomRow)
        container.appendChild(a)
    })
    .catch(e => console.error(e))
}

/**
 * Gets the mod list from mods.json
 * @returns {Promise<string[]>}
 */
function getModList() {
    return getJson(`${modsDir}/mods.json`)
    .then(json => json.dirs)
    .catch(e => console.error(e))
}

/**
 * Gets the json contents of file
 * @param {string} path 
 * @returns {Promise<any>}
 */
function getJson(path) {
    return fetch(path)
    .then(res => res.json())
    .catch(e => console.error(e))
}