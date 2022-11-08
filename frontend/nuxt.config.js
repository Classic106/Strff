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
    title: "STRFF",
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
        content: "e-commerce starter using Strapi and Nuxt",
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
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: "~/plugins/v-credit-card-form.js", mode: "client" },
    { src: "~/plugins/vue-cool-lightbox.js", mode: "client" },
    { src: "~/plugins/vue-custom-scrollbar.js", mode: "client" },
  ],
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
  proxy: {
    "/payment-nmi/": {
      target: "https://secure.networkmerchants.com/api/transact.php",
      pathRewrite: { "^/payment-nmi/": "" },
      changeOrigin: true,
    }
  },
  strapi: {
    url: process.env.API_URL || "http://localhost:1338",
    entities: [
      "appointment-orders",
      "appointments",
      "bestsellers",
      "articles",
      "categories",
      "sizes",
      "bundles",
      "orders",
      "order-items",
      "purchase-types",
      "subscription-types",
    ],
  },
  env: {
    storeUrl: process.env.STORE_URL || "http://localhost:1337",
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
  buildModules: ["vue-ssr-carousel/nuxt"],
};
