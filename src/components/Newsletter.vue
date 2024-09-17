<script lang="ts">
import { API_URL } from '@/pages/Home/index.ts';

export default {
	methods: {
		async submit(e: MouseEvent) {
			const emailElement: any = document.getElementById('email')
			const email: string = emailElement.value

			if (!email.includes('@') || !email.includes('.'))
				return

			console.log(email)
			const res = await fetch(API_URL, {
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "text/plain"
				},
				body: email
			})

			const form: any = (e.target as Element).closest(".newsletter-form")
			form.style.display = 'none'
		}
	}
}
</script>

<template>
	<form class="newsletter-form">
		<h1>Sign up for the Newsletter!</h1><br>
		<label for="email">Email</label>
		<input class="news-input" id="email" type="text" placeholder="example@example.com">
		<div class="button-row">
			<a href="#" @click="submit">
				<p>Submit</p>
			</a>
		</div>
	</form>
</template>