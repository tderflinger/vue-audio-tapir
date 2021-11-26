# vue-audio-tapir

Vue-audio-tapir is a library for Vue 3 that records
an audio message in the browser with the microphone. 
Then the audio data is submitted to a backend server for
further processing, for example sending the audio file 
to an email address.

This is a popular way to receive audio contact messages on
websites.

<img src="./doc/screenshot.png" style="display: block; margin: 40px auto; width: 300px" />

## Project Setup

```
npm install
```

### Development
```
npm run serve
```

### Production
```
npm run build
```

### Linting
```
npm run lint
```

## Dependencies

- [Vue 3](https://v3.vuejs.org/)
- [lamejs](https://github.com/zhuker/lamejs)
- [Tailwindcss](https://tailwindcss.com/)

## References

This project has been inspired by [vue-audio-recorder](https://github.com/grishkovelli/vue-audio-recorder)
by Gennady Grishkovtsov.

## License

MIT License
