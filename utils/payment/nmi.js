export class DirectPost {
  constructor(securityKey, axios) {
    this.securityKey = securityKey;
    this.axios = axios
  }

  pay() {
      console.log('Here')
  }
}
