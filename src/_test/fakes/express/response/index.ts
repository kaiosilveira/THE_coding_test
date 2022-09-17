export default class FakeExpressResponse {
  statusCode: number;

  constructor() {
    this.statusCode = 200;
  }

  status(code: number): FakeExpressResponse {
    this.statusCode = code;
    return this;
  }

  json(body) {
    return { status: this.statusCode, body };
  }
}
