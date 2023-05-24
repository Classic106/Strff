"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const fs = require("fs");

const { Vpn } = require("../../../utils/vpn");
const checkEmail = require("../../../utils/checkEmail");
const { email_with_status_RegExp } = require("../../../patterns");

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

    try {
      await Vpn.connect();

      if (typeof body === "string") {
        saveEmails(body);
      }

      if (files) {
        const { path } = files.files;
        const emails = fs.readFileSync(path).toString();
        saveEmails(emails);
      }

      Vpn.disconnect();
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }

    function saveEmails(emails) {
      const data = splitData(emails);

      for (const i in data) {
        const [email, status] = data[i];

        if (status !== undefined || status !== null) {
          try {
            // const valid = await checkEmail(email);
            // await strapi.services.email.create({ email, valid });
          } catch (e) {
            //   if (Vpn.connected) {
            //     Vpn.nextConnect();
            //   }
          }
        } else {
          //const valid = status === "true";
          // await strapi.services.email.create({ email, valid });
        }
      }
    }

    function splitData(data) {
      const result = data
        .split("\n")
        .map((item) => {
          const result = item.match(email_with_status_RegExp);

          if (result) {
            return item.split(" ");
          }
        })
        .filter((item) => !!item);

      return result;
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
