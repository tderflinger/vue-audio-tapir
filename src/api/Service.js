
export default class Service {

  constructor(backendEndpoint) {
    this.backendEndpoint = backendEndpoint;
  }

  // returns true if successfull, false if failed
  async postBackend(recordedBlob) {
    try {
      const response = await fetch(this.backendEndpoint, {
        method: "POST",
        body: recordedBlob,
        mode: "cors",
        credentials: "same-origin",
        header: {
          "content-type": "audio/mpeg",  // audio/wav
        },
      });
      if (!response.ok) {
        throw new Error("Error sending data!");
      }

      return true;
    } catch (error) {
      return false;
    }
  }
}
