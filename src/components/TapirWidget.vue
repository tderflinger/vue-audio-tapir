<template>
  <div class="text-center font-sans w-96 mx-auto rounded-lg shadow-lg border-solid border-2 p-8">
    <h2 class="font-bold text-2xl">Record Audio Message</h2>
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
      <figcaption class="text-sm mt-2">Listen to your recording before submitting.</figcaption>
    </figure>
    <submit-button @submit="sendData" :color="buttonColor" />
  </div>
</template>

<script>
import Service from "../api/Service";
import Recorder from "../lib/Recorder";
import convertTimeMMSS from "../lib/Utils";
import "../styles/app.css";
import IconButton from "./IconButton.vue";
import SubmitButton from "./SubmitButton.vue";

const INSTRUCTION_MESSAGE = "Click icon to start recording message.";
const INSTRUCTION_MESSAGE_STOP = "Click icon again to stop recording.";
const ERROR_MESSAGE =
  "Failed to use microphone. Please refresh and try again and permit the use of a microphone.";
const SUCCESS_MESSAGE = "Successfully recorded message!";
const SUCCESS_MESSAGE_SUBMIT = "Successfully submitted audio message! Thank you!";
const ERROR_SUBMITTING_MESSAGE = "Error submitting audio message! Please try again later.";

export default {
  name: "TapirWidget",
  props: {
    // in minutes
    time: { type: Number, default: 1 },
    bitRate: { type: Number, default: 128 },
    sampleRate: { type: Number, default: 44100 },
    backendEndpoint: { type: String },
    buttonColor: { type: String, default: "green" },

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
      instructionMessage: INSTRUCTION_MESSAGE,
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
      this.instructionMessage = INSTRUCTION_MESSAGE_STOP;
      this.service = new Service(this.backendEndpoint);
    },
    stopRecording() {
      this.recorder.stop();
      const recordList = this.recorder.recordList();
      this.recordedAudio = recordList[0].url;
      this.recordedBlob = recordList[0].blob;
      if (this.recordedAudio) {
        this.successMessage = SUCCESS_MESSAGE;
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
        this.successMessage = SUCCESS_MESSAGE_SUBMIT;
        if (this.successfulUpload) {
          this.successfulUpload();
        }
      } else {
        // error uploading
        this.successMessage = null;
        this.errorMessage = ERROR_SUBMITTING_MESSAGE;
        if (this.failedUpload) {
          this.failedUpload();
        }
      }
    },
    micFailed() {
      this.recording = false;
      this.instructionMessage = INSTRUCTION_MESSAGE;
      this.errorMessage = ERROR_MESSAGE;
    },
  },
};
</script>
