<script lang="ts">
import { API_URL } from '@/pages/Home/index.ts'
import Checkbox from './Checkbox.vue'

async function submit() {
	const confirmButton = document.querySelector('.confirm-button') as HTMLElement
	const enabled = confirmButton.getAttribute('enabled') === 'true'
	if (!enabled)
		return

	const emailElement: any = document.getElementById('email')
	const email: string = emailElement.value

	if (!email.includes('@') || !email.includes('.'))
		return

	const text = confirmButton.firstElementChild as HTMLElement
	const sourceBox: any = document.getElementById('source-upd')?.firstElementChild

	sourceBox.disabled = true
	text.innerText = "Submitted!"
	emailElement.setAttribute('readonly', 'readonly')
	confirmButton.setAttribute('enabled', 'false')
	
	await fetch(API_URL, {
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
}

export default {
	mounted() {
		const button = document.querySelector('.confirm-button') as HTMLElement
		button.addEventListener('click', submit)
	},
	components: {
		Checkbox
	}
}
</script>

<template>
	<form class="newsletter-form">
		<div class="news-body">
			<h1>Sign up for the Newsletter!</h1>
			<h2>Email</h2>
			<input class="news-input" id="email" type="text" placeholder="example@example.com">
			<Checkbox id="source-upd" text="Subscribe to source updates" />
		</div>
		<div class="confirm-button" enabled="true">
			<p>Confirm</p>
		</div>
	</form>
</template>