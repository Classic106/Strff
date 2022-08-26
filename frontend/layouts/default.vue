<template>
  <div class="flex justify-center">
    <div class="flex flex-col">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");
@import "vue-custom-scrollbar/dist/vueScrollbar.css";

.h-100 {
  height: 100vh !important;
}

a:hover,
a:visited,
a:link,
a:active {
  text-decoration: none;
}

form {
  z-index: 0;
}

.gold {
  color: #9e7d24;
}

.gold-border {
  border: 2px solid #9e7d24;
}

.gold-background {
  background-color: #9e7d24;
}

.col-black {
  color: #000;
}

img {
  width: 100%;
}

li {
  list-style: none;
}

span {
  font-size: 1.25rem;
}

h1 {
  font-size: 7.3rem;
}

h3 {
  font-size: 2.6rem;
}

h4 {
  font-size: 3.8rem;
}

h5 {
  font-size: 2.2rem;
}

h6 {
  font-size: 1.25rem;
}

.loaded {
  width: auto;
}

.cursor-pointer {
  cursor: pointer;
}

.ssr-carousel-track {
  justify-content: left !important;
}

@media (min-width: 1200px) {
  .loaded {
    margin: 0 auto !important;
    widows: 100%;
  }
}

@media (max-width: 500px) {
  h1 {
    font-size: 6rem;
  }

  h3 {
    font-size: 2.4rem;
  }

  h4 {
    font-size: 2rem;
  }

  h5 {
    font-size: 1.8rem;
  }

  h6 {
    font-size: 1.5rem;
  }
}

@media (max-width: 400px) {
  h1 {
    font-size: 3.5rem;
  }

  h3 {
    font-size: 2rem;
  }

  h4 {
    font-size: 1.5rem;
  }

  h5 {
    font-size: 1.2rem;
  }

  h6 {
    font-size: 1rem;
  }
}
</style>

