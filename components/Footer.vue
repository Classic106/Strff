<template>
  <footer class="d-flex flex-column justify-content-center align-items-center">
    <p class="mb-3 text-center">
      Contact us | Shipping & Returns | Terms & Conditions | Privacy Policy |
      About Us
    </p>
    <p class="mt-3">© 2022 STRFF MAN'S CLUB</p>
    <RightSide />
  </footer>
</template>

<script>
import RightSide from "@/components/RightSide";

export default {
  name: "ClubFooter",
  components: { RightSide },
};
</script>

<style scoped>
footer {
  min-height: 248px;
  background: #000;
}

p {
  font-weight: 400;
  font-family: "Roboto", sans-serif;
  color: #8b8b8b;
}
</style>