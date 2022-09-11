<template>
  <tapir-widget class="mt-20" :time="2" :successfulUpload="success" :failedUpload="failed"
    :afterRecording="afterRec" :backendEndpoint="backendEndpoint" buttonColor="rgb(16, 185, 129)"
    :customUpload="customUp" />
</template>

<script>
/* eslint-disable */
import TapirWidget from './components/TapirWidget.vue';

export default {
  name: 'App',
  components: {
    TapirWidget,
  },
  computed: {
    backendEndpoint() {
      return process.env.VUE_APP_BACKEND_ENDPOINT;
    }
  },
  methods: {
    success() {
      console.log("SUCCESS UPLOAD!!");
    },
    failed() {
      console.log("FAILED!");
    },
    afterRec() {
      console.log("Recorded successfully!");
    },
    async customUp(blob) {
      console.log("custom Upload code!");

      // add your upload code here, return true if success, false if failed
      try {
      const response = await fetch(this.backendEndpoint, {
        method: "POST",
        body: blob,
      });
      if (!response.ok) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  },
}
};
</script>
