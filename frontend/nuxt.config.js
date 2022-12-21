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
    title: "Strff",
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
  router: {
    middleware: ["isAdminAuthenticated"],
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
    "~/plugins/axios.js",
    "~/plugins/text-mask.js",
    "~/plugins/country-region-select.js",
    "~/plugins/vue-custom-scrollbar.js",
    "~/plugins/vue-good-table",
    "~/plugins/vue-cool-lightbox.js",
    "~/plugins/v-select.js",
    { src: "~/plugins/fingerprint.js", mode: "client" },
    { src: "~/plugins/notify.client", mode: "client" },
    { src: "~/plugins/notify.server", mode: "server" },
    { src: "~/plugins/v-credit-card-form.js", mode: "client" },
    { src: "~/plugins/vue-apexchart.js", mode: "client" },
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
    "nuxt-socket-io",
    "bootstrap-vue/nuxt",
    "@nuxtjs/strapi",
    "nuxt-session",
    "@nuxtjs/axios",
    "@nuxtjs/proxy",
  ],
  io: {
    // module options
    sockets: [
      {
        name: "main",
        url: process.env.API_URL || "http://localhost:1338",
      },
    ],
  },
  bootstrapVue: {
    // Add the desired icon components to the `components` array
    components: [
      "BIconArrowLeft",
      "BIconChevronLeft",
      "BIconChevronRight",
      "BIconHouseDoorFill",
      "BIconInboxFill",
      "BIconTagFill",
      "BIconTagsFill",
      "BIconPersonFill",
      "BIconSearch",
      "BIconDot",
      "BIconJournalText",
      "BIconX",
      "BIconClipboard",
      "BIconStack",
      "BIconCheckCircle",
      "BAvatar",
      "BProgress",
      "BProgressBar",
      "BModal",
      "BDropdown",
      "BDropdownItem",
    ],
  },
  axios: {
    proxy: true,
    baseURL: process.env.API_URL || "http://localhost:1338",
    browserBaseURL: process.env.API_URL || "http://localhost:1338",
  },
  proxy: {
    "/payment-nmi/": {
      target: "https://secure.networkmerchants.com/api/transact.php",
      pathRewrite: { "^/payment-nmi/": "" },
      changeOrigin: true,
    },
    "/payment-square/": {
      target: "https://connect.squareupsandbox.com/v2/payments",
      pathRewrite: { "^/payment-square/": "" },
      changeOrigin: true,
    },
    "/payment-authorize-net/": {
      target: "https://apitest.authorize.net/xml/v1/request.api",
      pathRewrite: { "^/payment-authorize-net/": "" },
      changeOrigin: true,
    },
    "/payment-usa-epay/": {
      target: "https://sandbox.usaepay.com/api/XXZR8SWS/transactions",
      pathRewrite: { "^/payment-usa-epay/": "" },
      changeOrigin: true,
    },
    "/payment-stripe/": {
      target: "https://api.stripe.com/v1/payment_methods",
      pathRewrite: { "^/payment-stripe/": "" },
      changeOrigin: true,
    },
    "/payment-paypal/": {
      target: "https://api-m.sandbox.paypal.com/v1/payments/payment",
      pathRewrite: { "^/payment-paypal/": "" },
      changeOrigin: true,
    },
    "/payment-klarna/": {
      target:
        "https://api-na.klarna.com/payments/v1/authorizations/{authorizationToken}/order",
      pathRewrite: { "^/payment-klarna/": "" },
      changeOrigin: true,
    },
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
  build: {
    transpile: ["vue-upload-drop-images"],
    vendor: ["@johmun/vue-tags-input", "vue-apexchart"],
  },
  buildModules: ["vue-ssr-carousel/nuxt"],
};
