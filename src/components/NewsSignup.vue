<script lang="js">
import { API_URL } from '@/pages/Home/index.ts'
import Checkbox from './Checkbox.vue'
import { validEmail } from '@/util'

/**
 * @param {boolean} val 
 */
function setEnabled(val) {
	const email = document.getElementById('email')
	const source = document.getElementById('source-upd')
	const confirm = document.querySelector('.confirm-button')

	email.setAttribute('readonly', !val)
	source.firstElementChild.disabled = !val
	confirm.setAttribute('enabled', val)
	confirm.firstElementChild.innerText = val ? "Confirm" : "Submitted!"
}

/**
 * @param {Event} e
 */
async function submit(e) {
	e.preventDefault()
	const confirmButton = document.querySelector('.confirm-button')
	if (confirmButton.getAttribute('enabled') !== 'true')
		return

	const emailElement = document.getElementById('email')
	const email = emailElement.value

	if (!validEmail(email))
		return

	const sourceBox = document.getElementById('source-upd').firstElementChild
	setEnabled(false)
	
	const res = await fetch(`${API_URL}?mode=signup`, {
		method: "POST",
		mode: "cors",
		headers: {
			"Content-Type": "text/plain"
		},
		body: JSON.stringify({
			email: email,
			source: sourceBox.checked
		})
	})
	const json = await res.json()
	if (!json.success)
		setEnabled(true)
}

export default {
	components: {
		Checkbox
	},
	methods: {
		submit
	}
}
</script>

<template>
	<form class="newsletter-form" @submit="submit">
		<div class="news-body">
			<h1>Sign up for the Newsletter!</h1>
			<h2>Email</h2>
			<input class="news-input" id="email" type="text" placeholder="example@example.com">
			<Checkbox id="source-upd" text="Subscribe to source updates" />
		</div>
		<div class="confirm-button" enabled="true" @click="submit">
			<p>Confirm</p>
		</div>
	</form>
</template>