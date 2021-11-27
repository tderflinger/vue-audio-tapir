# vue-audio-tapir [![npm](https://img.shields.io/npm/v/vue-audio-tapir)](https://www.npmjs.com/package/vue-audio-tapir)

Audio recorder component for Vue.js 3. It enables to record, play and send audio messages to a server.

<img src="./doc/the-tapir-color.png" style="display: block; margin: 40px auto; width: 150px" />

## Use Case

The most popular use case of vue-audio-tapir is to deliver an
audio contact message directly from a website.

<img src="./doc/screenshot.png" style="display: block; margin: 40px auto; width: 300px" />

## Architecture Overview

<img src="./doc/architecture-overview.png" style="display: block; margin: 40px auto; width: 550px" />

The developer includes the vue-audio-tapir component in his Vue 3 website. When the user of the website
wants to leave a voice message, he records his message and submits it. Vue-audio-tapir contacts the
backend server, a Netlify serverless function and uploads the audio data. The serverless backend function
sends the audio data to an email address using the email service Sendgrid.
Finally the email with the voice message arrives at the destination, probably the email application of the
website owner.

## Installation

In a Vue 3 application install with:

```bash
npm i vue-audio-tapir --save
```

or
```bash
yarn add vue-audio-tapir --save
```

## Example Usage

```html
<template>
  <tapir-widget :time="2" backendEndpoint="https://your-endpoint.com/.netlify/functions/audio-message" />
</template>

<script>
import TapirWidget from 'vue-audio-tapir';
import 'vue-audio-tapir/dist/vue-audio-tapir.css';

export default {
  name: 'App',
  components: {
    TapirWidget,
  }
}
</script>
```

## Properties

| Name             |  Type    | Description                                       | 
|------------------|----------|---------------------------------------------------|
| time             | Number   | Maximum recording time in minutes                 |
| bitRate          | Number   | bit rate of recording                             |
| sampleRate       | Number   | sample rate of recording                          |
| backendEndpoint  | String   | URL of the service that receives the data as POST |
| afterRecording   | Function | callback function when recording is finished.     |
| successfulUpload | Function | callback function that is called when data is uploaded successfully |
| failedUpload     | Function | callback function that is called when upload failed. |

The data sent to the server is encoded in the MP3 format for efficient storage.
For MP3 encoding the [lamejs](https://github.com/zhuker/lamejs) library is used.

## Dependencies

- [Vue 3](https://v3.vuejs.org/)
- [Tailwindcss](https://tailwindcss.com/)
- [lamejs](https://github.com/zhuker/lamejs)

## References

This project has been inspired by [vue-audio-recorder](https://github.com/grishkovelli/vue-audio-recorder)
by Gennady Grishkovtsov.

## License

MIT License
