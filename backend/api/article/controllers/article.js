"use strict";
const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    const entity = await strapi.services.article.find(ctx.query);
    return sanitizeEntity(entity, { model: strapi.models.article });
  },
  async update(ctx) {
    const { id } = ctx.params;
    const { body } = ctx.request;

    const article = await strapi.services.article.findOne({ id });

    if (body.image && article.image) {
      await strapi.plugins["upload"].services.upload.remove({
        id: article.image.id,
      });
    }

    const updatedArticle = await strapi.services.article.update({ id }, body);

    return updatedArticle;
  },
  async delete(ctx) {
    const { id } = ctx.params;

    const article = await strapi.services.article.findOne({ id });

    if (!image) {
      await strapi.plugins["upload"].services.upload.remove({
        id: article.image.id,
      });
    }

    const deletedArticle = await strapi.services.article.delete({ id });

    return deletedArticle;
  },
};
