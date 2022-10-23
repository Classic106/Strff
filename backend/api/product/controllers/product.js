const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  /**
   * Retrieve a record.
   *
   * @return {Object}
   */

  async findOne(ctx) {
    const { slug } = ctx.params;

    const entity = await strapi.services.product.findOne({ id: slug });
    return sanitizeEntity(entity, { model: strapi.models.product });
  },
  async create(ctx) {
    const { body } = ctx.request;
    console.log(body);

    return ["a"];
  },
};
