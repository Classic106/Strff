const fs = require("fs");
const { VPNFetch } = require("./vpn-fetch");

class Vpn {
  configs = [];
  connected = false;
  vpnFetch = null;

  constructor() {
    this.refresh();
  }

  async connect() {
    if (this.configs.length > 0) {
      try {
        const config = this.configs.shift();
        this.vpnFetch = new VPNFetch(
          `${__dirname}/configs/${config}`,
          `${__dirname}/auth`
        );

        await this.vpnFetch.connect();
        const { body } = await this.vpnFetch.get("https://ifconfig.me/ip");
        this.loging(`connected ${body}`);
        this.connected = true;
        return true;
      } catch (e) {
        this.loging(e);
        this.connected = false;
        await this.nextConnect();
      }
    }

    this.connected = false;
    return false;
  }

  disconnect() {
    try {
      if (this.vpnFetch) {
        this.vpnFetch.disconnect();
      }
    } catch (e) {
      this.loging(e);
    } finally {
      this.loging("stop");
      this.connected = false;
      return true;
    }
  }

  async nextConnect() {
    try {
      if (this.vpnFetch) {
        this.vpnFetch.disconnect();
        await this.connect();
      }
    } catch (e) {
      this.loging(e);
      this.connected = false;
    }
  }

  refresh() {
    if (this.vpnFetch) {
      this.vpnFetch.disconnect();
    }

    this.connected = false;
    this.configs = fs.readdirSync(`${__dirname}/configs`);
  }

  loging(text) {
    const date = new Date().toString();
    fs.appendFileSync(`${__dirname}/log.txt`, `${date} ${text} \n`, (err) => {
      if (err) throw err;
      console.log("The data was appended to file!");
    });
  }
}

module.exports.Vpn = new Vpn();
