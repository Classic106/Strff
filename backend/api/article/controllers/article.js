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

    const article = await strapi.services.article.findOne({
      id,
      _publicationState: "preview",
    });

    const isArticleImageId = article.image && article.image.id;
    const isDeleteImage =
      isArticleImageId !== body.image || (!body.image && isArticleImageId);

    if (isArticleImageId && isDeleteImage) {
      await strapi.plugins["upload"].services.upload.remove({
        id: article.image.id,
      });
    }

    const updatedArticle = await strapi.services.article.update({ id }, body);

    return updatedArticle;
  },
  async delete(ctx) {
    const { ids } = ctx.params;

    const deleteItems = ids.split(",");

    const result = await Promise.all(
      deleteItems.map(async (id) => {
        const article = await strapi.services.article.findOne({
          id,
          _publicationState: "preview",
        });

        const { image } = article;

        if (image) {
          const { id } = image;
          await strapi.plugins["upload"].services.upload.remove({ id });
        }
        await strapi.services.article.delete({ id });
      })
    );

    return result.length;
  },
};
