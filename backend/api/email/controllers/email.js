"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const fs = require("fs");
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

    if (body) {
      const emails = body.split("\n");

      for (const i in emails) {
        await addToBase(emails[i]);
      }
    }

    if (files) {
      const { path } = files.files;
      const array = fs.readFileSync(path).toString().split("\n");

      for (const i in array) {
        await addToBase(array[i]);
      }
    }
    return;

    async function addToBase(email) {
      try {
        const valid = await checkEmail(email);
        return await strapi.services.email.create({ email, valid });
      } catch (e) {
        console.log(e);
      }
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
