const path = require("path");
const fs = require("fs");
const { spawn, exec } = require("child_process");
const got = Promise.all([import("got")]).then(([module]) => module.default);

module.exports.VPNFetch = class VPNFetch {
  configFile;
  loging;
  interface;
  ovpnProcess;
  pkillFind;

  constructor(configFile, loging = false) {
    this.configFile = configFile;
    this.loging = loging;
  }

  async connect() {
    try {
      fs.accessSync(`${__dirname}/.auth`, fs.F_OK);
    } catch (e) {
      this.log(e.message);
    }

    return new Promise(async (resolve, reject) => {
      const startCommand = [
        "openvpn",
        "--script-security",
        "2",
        "--route-noexec",
        `--route-up`,
        `${__dirname}/route_up.sh`,
        `--config`,
        `${this.configFile}`,
        `--auth-user-pass`,
        `${__dirname}/.auth`,
      ];

      this.pkillFind = startCommand.join(" ").replace(/\'/g, "");

      const ovpnClient = spawn("sudo", startCommand, {
        shell: true,
      });

      ovpnClient.stdout.on("data", (chunk) => {
        chunk
          .toString()
          .split("\n")
          .forEach((line) => {
            const data = line.trim();
            if (data.toString().includes("[[network interface]]")) {
              this.interface = data.toString().split(":")[1]?.trim();
              this.log(
                `Sucessfully created VPN interface on ${this.interface}`
              );
            }

            if (data.toString().includes("AUTH_FAILED")) {
              this.log(`Auth failed for ${this.configFile}`, "err");
              reject(new Error(`Auth failed for ${this.configFile}`));
            }

            if (data.toString().includes("Initialization Sequence Completed")) {
              this.log(`Initialization Sequence Completed`);
              this.ovpnProcess = ovpnClient;
              resolve(this);
            }
          });
      });
      ovpnClient.stderr.on("data", (data) => {
        this.log(`stderr ${data}`, "err");
        reject(new Error(`stderr ${data}`));
      });
      ovpnClient.on("error", (err) => {
        this.log(`Error spawning ovpn ${err}`, "err");
        reject(new Error(`Error spawning ovpn ${err}`));
      });
      ovpnClient.on("close", (code) => {
        this.log(`openvpn exited with code ${code}`, "err");
        reject(new Error(`openvpn exited with code ${code}`));
      });
    });
  }

  async disconnect() {
    try {
      if (!this.pkillFind) return false;
      const command = `sudo pkill -SIGTERM -f '${this.pkillFind}'`;
      exec(command);

      await this.ovpnProcess?.kill();
      this.pkillFind = undefined;

      if (this.interface) {
        this.log(`Sucessfully disonnected VPN interface: ${this.interface}`);
      } else {
        this.log(`disonnected`);
      }

      return true;
    } catch (e) {
      this.log(e);
    }
  }

  async get(url, opts) {
    if (!opts) {
      opts = {
        localAddress: this.interface,
      };
    } else {
      opts.localAddress = this.interface;
    }
    const g_o_t = await got;
    return await g_o_t.get(url, opts);
  }

  log(text, error) {
    const date = new Date().toString();

    if (this.loging) {
      fs.appendFileSync(`${__dirname}/.log`, `${date} ${text} \n`, (err) => {
        if (err) throw err;
      });
      return;
    }

    if (error) {
      console.error(`${text}\n`);
    }

    console.log(`${text}\n`);
  }
};
