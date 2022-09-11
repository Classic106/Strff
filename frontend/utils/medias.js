export function getStrapiMedia(url) {
  // Check if URL is a local path
  if (url.startsWith('/')) {
    // Prepend Strapi address
    console.log(this.$config.strapi.url)
    return this.$config.strapi.url + `${url}`
  }
  // Otherwise return full URL
  return url
}
