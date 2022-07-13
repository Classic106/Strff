<template>
  <div>
    <FirstStep v-if="step === 1" v-on:nextStep="$emit('nextStep')" />
    <SecondStep
      v-if="step === 2"
      v-on:nextStep="$emit('nextStep')"
      v-on:backStep="$emit('backStep')"
    />
    <ThirdStep
      v-if="step === 3"
      v-on:nextStep="$emit('nextStep')"
      v-on:backStep="$emit('backStep')"
    />
    <FouthStep v-if="step === 4"/>
  </div>
</template>

<script>
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep.vue";
import FouthStep from "./FouthStep.vue";

export default {
  components: { FirstStep, SecondStep, ThirdStep, FouthStep },
  props: ["step"],
};
</script>

<style scoped>
</style>