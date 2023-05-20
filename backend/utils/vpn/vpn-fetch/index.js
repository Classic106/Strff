const path = require("path");
const { spawn, exec } = require("child_process");
const got = Promise.all([import("got")]).then(([module]) => module.default);

module.exports.VPNFetch = class VPNFetch {
  configFile;
  loginFile;
  verbose;
  tableId;
  interface;
  ovpnProcess;
  pkillFind;

  constructor(configFile, loginFile, verbose = false) {
    this.configFile = configFile;
    this.loginFile = loginFile;
    this.verbose = verbose;
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
          if (this.verbose) {
            console.log("err", err);
          }
          resolve("10");
        }
        if (this.verbose) {
          console.log("stdout", stdout);
        }
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
    return new Promise(async (resolve, reject) => {
      this.tableId = await this.getNewTableId();
      const startCommand = [
        "openvpn",
        "--script-security",
        "2",
        "--route-noexec",
        `--route-up`,
        `'${__dirname}/route_up.sh`,
        `${this.tableId}'`,
        `--config`,
        `${this.configFile}`,
        `--auth-user-pass`,
        `${this.loginFile}`,
      ];

      this.pkillFind = startCommand.join(" ").replace(/\'/g, "");
      const ovpnClient = spawn("sudo", startCommand, {
        env: { TABLE_ID: this.tableId.toString() },
        shell: true,
      });
      ovpnClient.stdout.on("data", (chunk) => {
        chunk
          .toString()
          .split("\n")
          .forEach((line) => {
            const data = line.toString().trim();
            if (this.verbose) {
              console.log(data);
            }
            if (data.toString().includes("[[network interface]]")) {
              this.interface = data.toString().split(":")[1]?.trim();
              if (this.verbose) {
                console.log("Echo from route_up.sh:", data.toString());
              }
              console.log(
                `Sucessfully created VPN interface on ${this.interface}`
              );
            }
            if (data.toString().includes("AUTH_FAILED")) {
              reject(new Error(`Auth failed for ${this.configFile}`));
            }
            if (data.toString().includes("Initialization Sequence Completed")) {
              if (this.verbose) {
                console.log("Openvpn completed:", data.toString().trim());
              }
              this.ovpnProcess = ovpnClient;
              resolve(this);
            }
          });
      });
      ovpnClient.stderr.on("data", (data) => {
        reject(new Error(`stderr: ${data}`));
      });
      ovpnClient.on("error", (err) => {
        reject(new Error("Error spawning ovpn:", err));
      });
      ovpnClient.on("close", (code) => {
        console.log("openvpn exited with code", code);
      });
    });
  }

  disconnect() {
    if (!this.pkillFind) return false;
    const command = `sudo pkill -SIGTERM -f '${this.pkillFind}'`;
    exec(command);
    this.ovpnProcess?.kill();
    this.pkillFind = undefined;
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
};
