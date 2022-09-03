const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  /**
   * Retrieve a record.
   *
   * @return {Object}
   */

  async find() {
    const entity = await strapi.services.category.find({}, [
      "products",
      "products.image",
      "products.categories",
    ]);
    return entity;
  },
  async findOne(ctx) {
    const { slug } = ctx.params;

    const entity = await strapi.services.category.findOne({ slug }, [
      "products",
      "products.product.image",
      "products.product.categories",
    ]);
    return sanitizeEntity(entity, { model: strapi.models.category });
  },
};
