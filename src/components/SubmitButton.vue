<template>
  <button @click="clickButton" :style="{ 'background-color': color }"
          class="p-3 mt-8 text-black rounded-md">
    {{ label }}
  </button>
</template>

<script>
export default {
  emits: ['submit'],
  props: {
    color: {
      type: String,
    },
    label: {
      type: String,
      default: "Submit"
    }
  },
  methods: {
    clickButton() {
      this.$emit("submit");
    },
  },
};
</script>
