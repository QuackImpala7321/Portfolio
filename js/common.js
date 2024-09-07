document.addEventListener('DOMContentLoaded', async function() {
	const body = document.querySelector('body')
	const members = body.querySelectorAll('.ehtml')
	for (const member of members) {
		const path = member.getAttribute('src')

		const res = await fetch(path)
		const data = await res.blob()
		const str = await data.text()
		const doc = Document.parseHTMLUnsafe(str)

		const wrapper = doc.getElementById('thtml')
		const element = wrapper.children.item(0)
		body.replaceChild(element, member)
	}
})