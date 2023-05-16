const fs = require("fs");
const path = require("path");

const VPNFetch = import("@jolduca/vpn-fetch");

class Vpn {
  configFiles = [];
  vpnFetch = null;
  files_count = 0;
  status = "stop";

  get status() {
    return this.status;
  }

  constructor() {
    this.resetConnections();
  }

  async connect() {
    try {
      if (!this.files_count) {
        this.status = "all connections were used";
        return false;
      }

      const connectionFile = this.configFiles[0];
      this.vpnFetch = new VPNFetch(`./configs/${connectionFile}`, `/.auth`);
      await this.vpnFetch.connect();

      this.status = "connected";
      this.configFiles.shift();
      this.files_count = this.configFiles.length;
    } catch (err) {
      this.configFiles.shift();
      this.files_count = this.configFiles.length;

      if (this.files_count > 0) {
        await this.connect();
      } else {
        this.status = "stop";
      }
    }
  }

  resetConnections() {
    try {
      const dirPath = path.resolve(__dirname, "./configs");
      this.configFiles = fs.readdirSync(dirPath, (err, files) => files);
      this.files_count = this.configFiles.length;
    } catch (e) {
      this.status = "stop";
    }
  }

  async nextConnect() {
    if (this.files_count === 0) {
      this.resetConnections();
      await this.connect();
    }

    this.disconnect();
    await this.connect();
  }

  disconnect() {
    if (this.vpnFetch) {
      try {
        this.vpnFetch.disconnect();
      } catch (err) {
      } finally {
        this.status = "stop";
        this.Vpn = null;
      }
    }
  }
}

exports.Vpn = Vpn;
