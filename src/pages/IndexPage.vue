<template>
  <q-page class="flex flex-center">
    <h4 class="text-center">Hello There 👋</h4>
    <p class="text-center text-subtitle1 q-px-lg">
      UniGuide offers expert guidance to help you navigate your educational
      journey with confidence and success.
    </p>
    <q-btn
      to="/course-selection"
      class="text-capitalize"
      push
      color="primary"
      size="1.5em"
      rounded
      label="Get Started"
    />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
});
</script>
