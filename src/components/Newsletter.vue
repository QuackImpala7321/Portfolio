<script lang="ts">
import { getJson } from '@/util';

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

export default {
    async mounted() {
        const el: HTMLElement = this.$el
        const entries: string[] = await getJson("/database/newsletter/entries.json")
        for (const entry of entries) {
            const filename = entry.substring(0, entry.lastIndexOf('.'))
            console.log(filename)

            const [ date, time ] = filename.split(' ')
            const [ month, day, year ] = date.split('-')
            const [ hour, minute ] = time.split('-')

            const monthName = months[Number.parseInt(month) - 1]
            console.log(monthName)
        }
    },
}
</script>

<template>
<Suspense>
    <div class="newsletter"></div>
</Suspense>
</template>