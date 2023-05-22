const path = require("path");
const fs = require("fs");
const { spawn, exec } = require("child_process");
const got = Promise.all([import("got")]).then(([module]) => module.default);

module.exports.VPNFetch = class VPNFetch {
  configFile;
  loginFile;
  loging;
  tableId;
  interface;
  ovpnProcess;
  pkillFind;
  develop;

  constructor(configFile, loginFile, loging = false) {
    this.configFile = configFile;
    this.loginFile = loginFile;
    this.loging = loging;
    this.develop = strapi.app.env === "development";
  }

  async getNewTableId() {
    return new Promise((resolve) => {
      const command = `ip route show table all | \\
      grep "table" | \\
      sed 's/.*\\(table.*\\)/\\1/g' | \\
      awk '{print $2}' | \\
      sort | \\
      uniq | \\
      grep -e "[0-9]"`;

      exec(command, (err, stdout) => {
        if (err) {
          this.log(`err ${err}`);
          resolve("10");
        }

        this.log(`stdout: ${stdout}`);

        const existingIds = stdout
          .toString()
          .trim()
          .split("\n")
          .sort((a, b) => Number(a) - Number(b));
        const nextId = Number(existingIds[existingIds.length - 1]) + 10;

        resolve(nextId.toString());
      });
    });
  }

  async connect() {
    fs.access(`${__dirname}/.auth`, fs.F_OK, (err) => {
      if (err) {
        this.log(err);
        return;
      }
    });

    return new Promise(async (resolve, reject) => {
      this.tableId = await this.getNewTableId();
      const ovpnClient = spawn(
        "sudo",
        [
          "openvpn",
          "--route-noexec",
          `--route-up`,
          `'${__dirname}/route_up.sh`,
          `${this.tableId}'`,
          `--config`,
          `${this.configFile}`,
          `--auth-user-pass`,
          `${__dirname}/.auth`,
        ],
        { env: { TABLE_ID: this.tableId.toString() }, shell: true }
      );

      ovpnClient.stdout.on("data", (chunk) => {
        chunk
          .toString()
          .split("\n")
          .forEach((line) => {
            const data = line.trim();
            if (data.toString().includes("[[network interface]]")) {
              this.interface = data.toString().split(":")[1]?.trim();
              this.log(
                `Sucessfully created VPN interface on ${this.interface}\n`
              );
              this.log(`data.toString(): ${data.toString()}\n`);
            }

            if (data.toString().includes("AUTH_FAILED")) {
              this.log(`Auth failed for ${this.configFile}\n`);
              reject(new Error(str));
            }

            if (data.toString().includes("Initialization Sequence Completed")) {
              this.log(`Initialization Sequence Completed \n`);
              resolve(this);
            }
          });
      });
      ovpnClient.stderr.on("data", (data) => {
        this.log(`stderr ${data} \n`, "err");
      });
      ovpnClient.on("error", (err) => {
        this.log(`Error spawning ovpn ${err} \n`, "err");
      });
      ovpnClient.on("close", (code) => {
        this.log(`openvpn exited with code ${code}\n`);
      });
    });
  }

  disconnect() {
    if (!this.pkillFind) return false;
    const command = `sudo pkill -SIGTERM -f '${this.pkillFind}'`;
    exec(command);
    this.ovpnProcess?.kill();
    this.pkillFind = undefined;
    this.log("disonnect");

    return true;
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

    if (!this.develop && this.loging) {
      fs.appendFileSync(`${__dirname}/log.txt`, `${date} ${text} \n`, (err) => {
        if (err) throw err;
      });
      return;
    }

    if (error) {
      console.error(`${text}\n`);
      return;
    }

    console.log(`${text}\n`);
  }
};
