<template>
  <div class="flex justify-center bg-gray-200">
    <div class="max-w-screen-lg flex flex-col min-h-screen w-full">
      <NavBar />
      <Buttons />
      <Nuxt class="flex-grow" />
      <ProductsFooter />
    </div>
    <div
      hidden
      id="snipcart"
      data-api-key="ODhhNWUxOGEtNTk0OC00OTQwLWJkOWMtM2M1ZmNjODU1ZDJhNjM3MzMyNzM0NjM1OTMyNjcz"
    ></div>
  </div>
</template>

<script>
import NavBar from "@/components/Navbar";
import ProductsFooter from "@/components/ProductsFooter";
import Buttons from "@/components/Buttons";

export default {
  components: {
    NavBar,
    ProductsFooter,
    Buttons,
  },
};
</script>
