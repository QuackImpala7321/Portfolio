import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { InputOption } from 'rollup'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    const inputOptions: InputOption = {
        main: resolve(__dirname, 'index.html'),
        mods: resolve(__dirname, 'mods.html')
    }
    
    return {
        appType: 'mpa',
        plugins: [
            vue(),
            vueJsx(),
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        base: '/',
        build: {
            rollupOptions: {
                input: inputOptions
            }
        }
    }
})
