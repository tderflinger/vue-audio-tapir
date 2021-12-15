<template>
  <button @click="clickButton" :style="{ 'background-color': color }"
          class="p-3 mt-8 text-black rounded-md">
    Submit
  </button>
</template>

<script>
export default {
  emits: ['submit'],
  props: {
    color: {
      type: String,
    },
  },
  methods: {
    clickButton() {
      this.$emit("submit");
    },
  },
};
</script>
