export default class FakeExpressRequest {
  headers: Object;
  params: Object;

  constructor({ headers = {}, params = {} }) {
    this.params = params;
    this.headers = headers;
  }
}
