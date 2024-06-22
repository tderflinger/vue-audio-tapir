<script>
import TapirWidget from "vue-audio-tapir";
import "vue-audio-tapir/dist/vue-audio-tapir.css";

export default {
  name: "App",
  components: {
    TapirWidget,
  },
};
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <tapir-widget
    :time="2"
    backendEndpoint="https://your-endpoint.com/.netlify/functions/audio-message"
    buttonColor="green"
    audioFormat="WAV"
  />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
