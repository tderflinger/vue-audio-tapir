<template>
  <div class="text-center font-sans w-96 mx-auto rounded-lg shadow-lg border-solid border-2 p-8">
    <h2 class="font-bold text-2xl">{{ title }}</h2>
    <div>
      <icon-button
        :style="{ 'border-color': buttonColor }"
        :class="buttonClass"
        v-if="recording"
        name="stop"
        @click="toggleRecording"
      />
      <icon-button
        :style="{ 'border-color': buttonColor }"
        :class="buttonClass"
        v-else
        name="mic"
        @click="toggleRecording"
      />
    </div>
    <div>{{ recordedTime }}</div>
    <div class="text-sm font-bold">{{ successMessage }}</div>
    <div class="text-sm">{{ instructionMessage }}</div>
    <div class="text-sm text-red-400">{{ errorMessage }}</div>
    <figure class="mt-8">
      <audio controls :src="recordedAudio" type="audio/mpeg" class="mx-auto">
        Your browser does not support the
        <code>audio</code> element.
      </audio>
      <figcaption class="text-sm mt-2">{{ listenInstructions }}</figcaption>
    </figure>
    <submit-button @submit="sendData" :color="buttonColor" :label="submitLabel" />
  </div>
</template>

<script>
import Service from "../api/Service";
import Recorder from "../lib/Recorder";
import convertTimeMMSS from "../lib/Utils";
import "../styles/app.css";
import IconButton from "./IconButton.vue";
import SubmitButton from "./SubmitButton.vue";

export default {
  name: "TapirWidget",
  props: {
    // in minutes
    time: { type: Number, default: 1 },
    bitRate: { type: Number, default: 128 },
    sampleRate: { type: Number, default: 44100 },
    backendEndpoint: { type: String },
    buttonColor: { type: String, default: "green" },

    // labels
    title: { type: String, default: "Record Audio Message" },
    instructionMessageStart: { type: String, default: "Click icon to start recording message." },
    instructionMessageStop: { type: String, default: "Click icon again to stop recording." },
    listenInstructions: { type: String, default: "Listen to your recording before submitting." },
    submitLabel: { type: String, default: "Submit" },
    errorMessageMicrophone: { type: String, default: "Failed to use microphone. Please refresh and try again and permit the use of a microphone." },
    successMessageRecorded: { type: String, default: "Successfully recorded message!" },
    successMessageSubmitted: { type: String, default: "Successfully submitted audio message! Thank you!" },
    errorMessageSubmitting: { type: String, default: "Error submitting audio message! Please try again later." },

    // callback functions
    afterRecording: { type: Function },
    successfulUpload: { type: Function },
    failedUpload: { type: Function },
    customUpload: { type: Function, default: null }
  },
  components: {
    IconButton,
    SubmitButton,
  },
  data() {
    return {
      recording: false,
      recordedAudio: null,
      recordedBlob: null,
      recorder: null,
      successMessage: null,
      errorMessage: null,
      instructionMessage: this.instructionMessageStart,
    };
  },
  computed: {
    buttonClass() {
      return "mx-auto h-14 w-14 fill-current text-black cursor-pointer rounded-50 border-2 m-4 p-2";
    },
    recordedTime() {
      if (this.time && this.recorder?.duration >= this.time * 60) {
        this.toggleRecording();
      }
      return convertTimeMMSS(this.recorder?.duration);
    },
  },
  beforeUnmount() {
    if (this.recording) {
      this.stopRecorder();
    }
  },
  methods: {
    toggleRecording() {
      this.recording = !this.recording;
      if (this.recording) {
        this.initRecorder();
      } else {
        this.stopRecording();
      }
    },
    initRecorder() {
      this.recorder = new Recorder({
        micFailed: this.micFailed,
        bitRate: this.bitRate,
        sampleRate: this.sampleRate,
      });
      this.recorder.start();
      this.successMessage = null;
      this.errorMessage = null;
      this.instructionMessage = this.instructionMessageStop;
      this.service = new Service(this.backendEndpoint);
    },
    stopRecording() {
      this.recorder.stop();
      const recordList = this.recorder.recordList();
      this.recordedAudio = recordList[0].url;
      this.recordedBlob = recordList[0].blob;
      if (this.recordedAudio) {
        this.successMessage = this.successMessageRecorded;
        this.instructionMessage = null;
      }
      if (this.afterRecording) {
        this.afterRecording();
      }
    },
    async sendData() {
      if (!this.recordedBlob) {
        return;
      }

      let result = null;
      if (this.customUpload) {
        result = await this.customUpload(this.recordedBlob);
      } else {
        result = await this.service.postBackend(this.recordedBlob);
      }

      if (result) {
        this.errorMessage = null;
        this.successMessage = this.successMessageSubmitted;
        if (this.successfulUpload) {
          this.successfulUpload();
        }
      } else {
        // error uploading
        this.successMessage = null;
        this.errorMessage = this.errorMessageSubmitting;
        if (this.failedUpload) {
          this.failedUpload();
        }
      }
    },
    micFailed() {
      this.recording = false;
      this.instructionMessage = this.instructionMessageStart;
      this.errorMessage = this.errorMessageMicrophone;
    },
  },
};
</script>
