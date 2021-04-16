export class Message {
  // public response: String;
  public responseCode!: Number;
  public message: String;
  public data: Object | undefined | any;

  constructor(response: String, message: String, data?: Object) {
    // this.response = response;
    this.message = message;
    this.data = data;
    this.setResponseCode(response);
  }

  setResponseCode(response: String) {
    if (response == "OK") {
      this.responseCode = 200;
    }
    if (response == "ERROR") {
      this.responseCode = 400;
    }
  }
}
