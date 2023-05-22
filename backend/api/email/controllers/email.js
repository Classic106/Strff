"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const fs = require("fs");

const { Vpn } = require("../../../utils/vpn");
const checkEmail = require("../../../utils/checkEmail");

module.exports = {
  async check(ctx) {
    const { body } = ctx.request;
    const { email, save } = body;

    const result = await strapi.services.email.findOne({ email });

    if (result) {
      const { valid } = result;
      return valid;
    }

    try {
      const valid = await checkEmail(email);

      if (!valid && save) {
        await strapi.services.email.create({ email });
      }
      return valid;
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  async upload(ctx) {
    const { body, files } = ctx.request;

    if (typeof body === "string") {
      const emails = body.split("\n");

      for (const i in emails) {
        // const valid = await checkEmail(email);
        // await strapi.services.email.create({ email, valid });
      }
    }

    try {
      if (files) {
        const { path } = files.files;
        const array = fs.readFileSync(path).toString().split("\n");
        const connected = await Vpn.connect();

        if (connected) {
          for (const i in array) {
            try {
              // const valid = await checkEmail(email);
              // await strapi.services.email.create({ email, valid });
            } catch (e) {
              if (Vpn.connected) {
                Vpn.nextConnect();
              }
            }
          }

          Vpn.disconnect();
        }
      }
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  async delete(ctx) {
    const { id } = ctx.params;

    if (isNaN(+id)) {
      return await strapi.services.email.delete({ email: id });
    } else {
      return await strapi.services.email.delete({ id });
    }
  },
};
