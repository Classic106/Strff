<template>
  <div class="form__group field w-100 d-flex justify-content-center">
    <input
      type="input"
      class="form__field w-75"
      id="search_text"
      placeholder="Enter a search term"
      v-model.trim="text"
      v-on:input="$emit('setText', text)"
    />
    <label for="search_text" class="form__label">Enter a search term</label>
  </div>
</template>

<script>
export default {
  name: "SearchInput",
  data: () => ({ text: "" }),
};
</script>

<style scoped  lang="scss">
$primary: #9e7d24;
$secondary: #f3c956;
$white: #fff;

.form__group {
  position: relative;
  width: 50%;
}

.form__field {
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid $white;
  outline: 0;
  font-size: 1.3rem;
  color: $white;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ .form__label {
    font-size: 1.3rem;
    cursor: text;
  }
}

.form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: $white;
}

.form__field:focus {
  ~ .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: $primary;
    font-weight: 700;
  }
  padding-bottom: 6px;
  font-weight: 700;
  border-width: 3px;
  border-image: linear-gradient(to right, $primary, $secondary);
  border-image-slice: 1;
}

.form__field {
  &:required,
  &:invalid {
    box-shadow: none;
  }
}
</style>