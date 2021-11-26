<template>
  <button @click="clickButton" class="bg-green-500 p-3 mt-8 text-black rounded-md">
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
