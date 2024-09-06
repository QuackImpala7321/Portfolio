document.addEventListener('DOMContentLoaded', async function() {
	const res = await fetch('/components/navbar.html')
	const data = await res.blob()
	const str = await data.text()
	const doc = Document.parseHTMLUnsafe(str)

	const wrapper = doc.querySelector('.navbar-wrapper')
	console.log(wrapper)

	const body = document.querySelector('body')
	body.appendChild(wrapper)
})