"use strict";

const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    const entity = await strapi.services.deliveries.find(ctx.query);
    return sanitizeEntity(entity, { model: strapi.models.deliveries });
  },
  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.services.deliveries.findOne({ id });
    return sanitizeEntity(entity, { model: strapi.models.deliveries });
  },
  async update(ctx) {
    const { id } = ctx.params;
    const { body } = ctx.request;
    const { logo } = body;

    if (!logo) {
      const delivery = await strapi.services.deliveries.findOne({ id });

      if (delivery && delivery.logo) {
        await strapi.plugins["upload"].services.upload.remove({
          id: delivery.logo.id,
        });
      }
    }

    const updatedDelivery = await strapi.services.deliveries.update(
      { id },
      body
    );

    return updatedDelivery;
  },
  async delete(ctx) {
    const { id } = ctx.params;

    const delivery = await strapi.services.deliveries.findOne({ id });

    if (delivery) {
      const { logo } = delivery;

      if (logo) {
        await strapi.plugins["upload"].services.upload.remove({ id: logo.id });
      }
    }
    await strapi.services.deliveries.delete({ id });

    return id;
  },
};
