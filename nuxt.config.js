export default {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */

  head: {
    title: "Labqik",
    meta: [
      {
        charset: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        hid: "description",
        name: "description",
        content: "e-commerce starter using Strapi, Nuxt.js and Snipcart",
      },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico",
      },
    ],
    script: [],
  },
  /*
   ** Global CSS
   */
  css: ["@node_modules/normalize.css/normalize.css"],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    //"@nuxtjs/tailwindcss",
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    "bootstrap-vue/nuxt",
    "@nuxtjs/strapi",
    "nuxt-session",
    "@nuxtjs/axios",
    "@nuxtjs/proxy",
  ],
  axios: {
    proxy: true,
  },
  env: {
    storeUrl: process.env.STORE_URL || "http://localhost:1337",
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    transpile: ["vee-validate"],
    postcss: {
      plugins: {
        "postcss-custom-properties": false,
      },
    },
    babel: {
      compact: true,
    },
    extractCSS: true,
  },
};
