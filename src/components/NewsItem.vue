<script lang="js">
import { getJson } from '@/util';
import { ref } from 'vue';

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
    props: [ 'src' ],
    slots: {
        monga: 'monga'
    },
    async setup(props, ctx) {
        const json = await getJson(`/database/newsletter/${props.src}`)
        const filename = props.src.substring(0, props.src.lastIndexOf('.'))

        const [ date, time ] = filename.split(' ')
        const [ month, day, year ] = date.split('-')
        const [ hour, minute ] = time.split('-')

        const monthName = months[month - 1]
        const hour12 = hour > 12 ? hour - 12 : hour == 0 ? 12 : hour

        const body = json.body instanceof Array ? json.body.join('<br>') : json.body

        return {
            title: ref(json.title),
            body: ref(body),
            
            timestamp: ref(`${monthName} ${day}, ${year} at ${hour12}:${minute}${hour > 12 ? 'pm':'am'}`)
        }
    },
}
</script>

<template>
<Suspense>
    <div class="news-item">
        <h1>{{ title }}</h1>
        <div class="news-timestamp">
            <h3>{{ timestamp }}</h3>
        </div>
        <p class="news-body" v-html="body"></p>
    </div>
</Suspense>
</template>