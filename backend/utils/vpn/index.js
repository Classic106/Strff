const fs = require("fs");
const { VPNFetch } = require("./vpn-fetch");

class Vpn {
  configs = [];
  connected = false;
  all_used = false;
  vpnFetch = null;

  constructor() {
    this.refresh();
  }

  async connect() {
    if (!this.configs.length) {
      this.all_used = true;
      return;
    }

    if (this.configs.length > 0) {
      try {
        const config = this.configs.shift();
        this.vpnFetch = new VPNFetch(`${__dirname}/configs/${config}`);

        await this.vpnFetch.connect();
        this.connected = true;
        return true;
      } catch (e) {
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
      this.connected = false;
    }
  }

  refresh() {
    if (this.vpnFetch) {
      this.vpnFetch.disconnect();
    }

    this.all_used = false;
    this.connected = false;
    this.configs = fs.readdirSync(`${__dirname}/configs`);
  }
}

module.exports.Vpn = new Vpn();
