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

.h-100vh {
  height: 100vh !important;
}

.col-white {
  color: #fff;
}

.grey {
  color: #919191;
}

.bg-grey {
  background-color: #f6f6f6;
}

.text-ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
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
  color: #333;
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

h5,
h5 > span {
  font-size: 2.2rem;
}

h6 {
  font-size: 1.25rem;
}

img.loaded {
  height: 100% !important;
  width: auto !important;
  margin: 0 auto !important;
}

.cursor-pointer {
  cursor: pointer;
}

.ssr-carousel-track {
  justify-content: left !important;
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

  h5,
  h5 > span {
    font-size: 1.8rem;
  }

  h6 {
    font-size: 0.9rem;
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

  h5,
  h5 > span {
    font-size: 1.2rem;
  }

  h6 {
    font-size: 1rem;
  }
}
</style>

