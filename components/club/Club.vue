<template>
  <main>
    <div
      class="
        main-header
        position-relative
        d-flex
        overflow-hidden
        justify-content-center justify-content-xl-start
      "
    >
      <div
        class="
          position-absolute
          p-0
          m-0
          p-md-3
          mx-md-5
          text-center
          content
          align-self-center
        "
      >
        <h1 class="dark-orange">Discover</h1>
        <h3 class="mb-5">our best Selling BEARD</h3>
        <h3 class="mt-5">hair and Skin CARE PRODUCTS</h3>
      </div>
      <div class="d-flex justify-content-center w-100">
        <img
          class="position-absolute header-image"
          src="@/assets/img/iStock-1018779998-min.jpg"
          alt="iStock"
        />
      </div>
    </div>
    <div class="p-1 p-md-5 m-0 mx-md-5">
      <BestSellers />
      <div class="position-relative text-center">
        <div
          class="
            position-absolute
            d-flex
            flex-column
            justify-content-center
            align-items-center
            container
          "
        >
          <h4 class="dark-orange">Traditional Shaving</h4>
          <p>Indulge in a moment of perfect nostalgia</p>
          <h4 class="grey">SHOP NOW</h4>
        </div>
        <img src="@/assets/img/iStock-1251674339-min.jpg" alt="istockphoto" />
      </div>
      <div class="d-flex flex-column align-items-center">
        <h6 class="text-center col-black p-3">FOLLOW US</h6>
        <div class="d-flex follow-icons justify-content-center p-3 rounded">
          <NuxtLink class="icon icon-twitter mx-2" to="/"></NuxtLink>
          <NuxtLink class="icon icon-facebook mx-2" to="/"></NuxtLink>
          <NuxtLink class="icon icon-pinterest mx-2" to="/"></NuxtLink>
          <NuxtLink class="icon icon-instagram mx-2" to="/"></NuxtLink>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import BestSellers from "./BestSellers";

export default {
  name: "Club",
  layout: "club",
  components: { BestSellers },
};
</script>

<style scoped>
@media (min-width: 1000px) {
  .main-header {
    height: 650px !important;
  }
}

@media (min-width: 1200px) {
  .main-header {
    height: 750px !important;
  }
}

@media (min-width: 1400px) {
  .main-header {
    height: 850px !important;
  }
}

@media (min-width: 1600px) {
  .main-header {
    height: 1000px !important;
  }
}

@media (min-width: 2000px) {
  .main-header {
    height: 1300px !important;
  }
}

@media (min-width: 1500px) {
  .header-image {
    width: 100% !important;
    height: auto !important;
  }
}

.grey {
  color: #cecece;
}

.header-image {
  width: auto;
  height: 117%;
  max-width: none;
}

main {
  color: #fff;
}

.main-header {
  height: 550px;
}

.content {
  z-index: 1;
}

h6,
.content > h1,
.content > h3 {
  font-weight: 400;
}

.card-info > span {
  font-weight: 400;
  font-family: "Roboto", sans-serif;
}

.container {
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}

.follow-icons {
  background: #fafafa;
  width: 294px;
}

.icon {
  display: inline-block;
  width: 42px;
  height: 42px;
  filter: invert(49%) sepia(40%) saturate(0%) hue-rotate(154deg) brightness(83%)
    contrast(110%);
  background-size: cover;
}

.icon-twitter {
  background-image: url("../../assets/icons/icons8-twitter.svg");
}

.icon-facebook {
  background-image: url("../../assets/icons/icons8-facebook.svg");
}

.icon-pinterest {
  background-image: url("../../assets/icons/icons8-pinterest.svg");
}

.icon-instagram {
  background-image: url("../../assets/icons/icons8-instagram.svg");
}
</style>