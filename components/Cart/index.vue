<template>
  <div>
    <FirstStep v-if="step === 1" v-on:nextStep="$emit('nextStep')" />
    <SecondStep
      v-if="step === 2"
      v-on:nextStep="$emit('nextStep')"
      v-on:backStep="$emit('backStep')"
    />
  </div>
</template>

<script>
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";

export default {
  components: { FirstStep, SecondStep },
  props: ["step"]
};
</script>

<style scoped>
</style>