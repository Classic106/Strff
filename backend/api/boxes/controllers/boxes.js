"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    const { body } = ctx.request;
    const { lengthy, width, height, dimension } = body;

    const box = await strapi.services.boxes.findOne({
      lengthy,
      width,
      height,
      dimension,
    });

    if (box) {
      return ctx.badRequest(null, "Box with this parametrs is exist");
    } else {
      const box = await strapi.services.boxes.create(body);
      return box;
    }
  },
};
