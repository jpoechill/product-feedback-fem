import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    meta: {
        htmlAttrs: {
            lang: 'en'
        },
        title: 'Product Feedback App',
        lang: 'en',
        link: [
            { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" },
            { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Jost:wght@300;400;600;900&display=swap" }
        ],
        script: [
            { src: 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js' },
            { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js' },
        ]
    },
    buildModules: [
        '@pinia/nuxt',
    ],
    "env": {
        "browser": true,
        "node": true
    },
})
